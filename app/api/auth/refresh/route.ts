import { NextResponse } from "next/server"

import { api } from "@/lib/api"
import { AuthError } from "@/lib/api/errors"
import { clearAuthCookies, readRefreshToken, setAuthCookies } from "@/server/auth/actions"

/**
 * POST /api/auth/refresh
 *
 * Reads the httpOnly refresh token cookie, exchanges it for a new
 * access + refresh pair via the backend, and updates the cookies.
 *
 * Returns the new tokens in the JSON body so the API client can
 * confirm success. The actual tokens stay in httpOnly cookies.
 */
export async function POST() {
  const refresh = await readRefreshToken()
  if (!refresh) {
    // eslint-disable-next-line no-console
    console.warn("[api/auth/refresh] no refresh token cookie present")
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 })
  }

  try {
    // eslint-disable-next-line no-console
    console.log("[api/auth/refresh] exchanging refresh token…")
    const result = await api.auth.refreshToken()
    // eslint-disable-next-line no-console
    console.log("[api/auth/refresh] success, role:", result.role)
    // Re-issue cookies. We can't read the user's "remember me" preference
    // here, so default to the longer 30-day window — the refresh cookie
    // maxAge is just an upper bound on cookie lifetime.
    await setAuthCookies(result.access, result.refresh, result.role, true)
    return NextResponse.json({
      access: result.access,
      refresh: result.refresh,
      role: result.role,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/auth/refresh] failed", err)
    if (err instanceof AuthError) {
      await clearAuthCookies()
      return NextResponse.json({ detail: "Refresh failed" }, { status: 401 })
    }
    // Pass through the real upstream status (e.g. 404 if the backend
    // doesn't expose a refresh endpoint at this path) so the proxy can
    // make a clean decision instead of seeing a fake 500.
    const upstreamStatus =
      typeof err === "object" && err !== null && "status" in err
        ? Number((err as { status?: unknown }).status) || 500
        : 500
    return NextResponse.json(
      { detail: "Refresh failed" },
      { status: upstreamStatus }
    )
  }
}