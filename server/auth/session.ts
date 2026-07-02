import "server-only"

import { cookies } from "next/headers"

import { isApiRole, apiRoleToSlug } from "@/lib/auth/api-role-map"
import type { RoleSlug } from "@/navigation/roles"

/**
 * Lightweight session shape derived from the httpOnly `access_token` JWT.
 * The middleware does signature verification; here we just decode the
 * payload so RSCs can read the user id and role without a round-trip.
 */
export interface ServerSession {
  userId: string
  role: RoleSlug
  exp: number
}

/**
 * Decode a JWT payload without verifying the signature.
 * Used only on the server, after the middleware has already verified it.
 */
function decodeJwtPayload(token: string): {
  user_id?: string
  role?: string
  exp?: number
  [key: string]: unknown
} | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = parts[1]
    // base64url → base64
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const padded = b64 + "===".slice((b64.length + 3) % 4)
    const json =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("binary")
    return JSON.parse(json)
  } catch {
    return null
  }
}

/**
 * Read the current session from cookies. Returns null when:
 * - the access token cookie is missing,
 * - the token is malformed,
 * - the token is expired,
 * - the role is unknown.
 */
export async function getSession(): Promise<ServerSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value
  if (!token) return null

  const payload = decodeJwtPayload(token)
  if (!payload) return null

  if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
    return null
  }

  const roleCookie = cookieStore.get("user_role")?.value
  const role = typeof payload.role === "string" ? payload.role : roleCookie
  if (!role || !isApiRole(role)) return null

  const userId =
    typeof payload.user_id === "string"
      ? payload.user_id
      : typeof payload.userId === "string"
        ? payload.userId
        : typeof payload.sub === "string"
          ? payload.sub
          : null
  if (!userId) return null

  return {
    userId,
    role: apiRoleToSlug(role),
    exp: payload.exp ?? 0,
  }
}

/**
 * Strict variant — throws redirect to /login if no session.
 * Use in protected RSCs and layouts.
 */
export async function requireSession(): Promise<ServerSession> {
  const session = await getSession()
  if (!session) {
    // Caller is responsible for redirecting; we just throw a clear error
    // so the build/runtime can detect misuse.
    throw new Error(
      "requireSession() called but no session is present. " +
        "Wrap the page in middleware or check getSession() first."
    )
  }
  return session
}