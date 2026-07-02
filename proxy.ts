import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"

import { isApiRole, apiRoleToSlug } from "@/lib/auth/api-role-map"
import {
  ROLE_TO_DEFAULT_ROUTE,
  isRouteAllowedForRole,
  matchRoutePrefix,
} from "@/lib/auth/route-map"

const ACCESS_COOKIE = "access_token"
const REFRESH_COOKIE = "refresh_token"
const ROLE_COOKIE = "user_role"

// We don't have the backend's secret to verify the signature, so we just decode the token
// to check expiration and then rely on the secure HttpOnly cookies for session state.

interface JwtPayload {
  role?: string
  exp?: number
  [key: string]: unknown
}

/**
 * Returns the decoded JWT payload, or null if the token is missing,
 * malformed, expired, or fails signature verification.
 */
async function verifyAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    const payload = decodeJwt(token)
    // Manually check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload as JwtPayload
  } catch {
    return null
  }
}

/**
 * Build a NextResponse that forwards the (potentially updated) cookies
 * from a refresh response back to the client.
 */
function applyRefreshedCookies(
  request: NextRequest,
  refreshResponse: Response
): NextResponse {
  const setCookie = refreshResponse.headers.get("set-cookie")
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  if (setCookie) {
    // The /api/auth/refresh handler may set multiple Set-Cookie headers;
    // Node fetch usually concatenates them. Pass them through verbatim.
    response.headers.set("set-cookie", setCookie)
  }
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value

  // 1. No access token at all → redirect to login with ?next=…
  if (!accessToken) {
    // eslint-disable-next-line no-console
    console.log("[proxy] no access token, redirecting to /login", { pathname })
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Verify signature & decode.
  let payload = await verifyAccessToken(accessToken)
  const roleCookie = request.cookies.get(ROLE_COOKIE)?.value
  if (payload && roleCookie) {
    payload.role = roleCookie
  }

  // 3. If verification failed (expired or bad signature), try a refresh.
  if (!payload) {
    // eslint-disable-next-line no-console
    console.log("[proxy] access token invalid, attempting refresh", {
      pathname,
    })
    const refreshResponse = await fetch(
      new URL("/api/auth/refresh", request.url),
      {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        // We need the raw response to copy Set-Cookie headers.
      }
    )
    if (!refreshResponse.ok) {
      // eslint-disable-next-line no-console
      console.warn("[proxy] refresh failed", {
        pathname,
        status: refreshResponse.status,
      })
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", pathname + search)
      const redirect = NextResponse.redirect(loginUrl)
      // Clear the bad cookies.
      redirect.cookies.delete(ACCESS_COOKIE)
      redirect.cookies.delete(REFRESH_COOKIE)
      redirect.cookies.delete(ROLE_COOKIE)
      return redirect
    }

    // Try to use the new access token from the refresh response body.
    // The route handler returns {access, refresh, role} as JSON.
    try {
      const body = (await refreshResponse.json()) as {
        access?: string
        role?: string
      }
      if (body.access) {
        payload = (await verifyAccessToken(body.access)) ?? null
      }
      if (payload) {
        // Use the refreshed role if provided, otherwise fallback to existing cookie
        if (body.role) {
          payload.role = body.role
        } else if (roleCookie) {
          payload.role = roleCookie
        }
        
        const response = applyRefreshedCookies(request, refreshResponse)
        // Continue to authorization checks below.
        return runAuthorization(request, payload, response)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[proxy] failed to parse refresh response", {
        pathname,
        error: err instanceof Error ? err.message : String(err),
      })
      // fall through to login redirect
    }

    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // 4. Token are valid — enforce role vs route.
  return runAuthorization(request, payload, NextResponse.next())
}

/**
 * Once we have a valid payload, check that the role is allowed to view
 * the requested route. Mismatch → redirect to the role's default dashboard.
 */
function runAuthorization(
  request: NextRequest,
  payload: JwtPayload,
  baseResponse: NextResponse
): NextResponse {
  const role = typeof payload.role === "string" ? payload.role : null
  if (!role || !isApiRole(role)) {
    // eslint-disable-next-line no-console
    console.warn("[proxy] token valid but role missing/unknown", {
      pathname: request.nextUrl.pathname,
      role,
    })
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  const slug = apiRoleToSlug(role)
  const { pathname } = request.nextUrl

  // If the route is recognised, check membership.
  if (matchRoutePrefix(pathname) !== null) {
    if (!isRouteAllowedForRole(pathname, slug)) {
      // eslint-disable-next-line no-console
      console.log("[proxy] role not allowed for route, bouncing", {
        pathname,
        slug,
        fallback: ROLE_TO_DEFAULT_ROUTE[slug],
      })
      return NextResponse.redirect(
        new URL(ROLE_TO_DEFAULT_ROUTE[slug], request.url)
      )
    }
  }

  return baseResponse
}

/**
 * Apply proxy to the dashboard area and any leftover /roles hits.
 * Auth pages and Next.js internals are excluded so the login form can
 * render without a session.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/roles",
  ],
}