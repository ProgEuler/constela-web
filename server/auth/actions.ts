"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { api } from "@/lib/api"
import { LoginRequestSchema } from "@/lib/api/schema/auth"
import { AuthError, NetworkError } from "@/lib/api/errors"
import { apiRoleToSlug } from "@/lib/auth/api-role-map"
import { ROLE_TO_DEFAULT_ROUTE } from "@/lib/auth/route-map"

const ACCESS_COOKIE = "access_token"
const REFRESH_COOKIE = "refresh_token"
const ROLE_COOKIE = "user_role"

const ONE_HOUR = 60 * 60
const ONE_DAY = 60 * 60 * 24
const SEVEN_DAYS = ONE_DAY * 7
const THIRTY_DAYS = ONE_DAY * 30

/**
 * Result type for `loginAction` so the client form can show errors
 * without re-throwing across the network boundary.
 */
export type LoginActionResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string }

export async function loginAction(
  input: { email: string; password: string; remember?: boolean }
): Promise<LoginActionResult> {
  // eslint-disable-next-line no-console
  console.log("[auth/login] payload received:", {
    email: input.email,
    passwordLength: input.password?.length ?? 0,
    remember: Boolean(input.remember),
  })

  const parsed = LoginRequestSchema.safeParse({
    email: input.email,
    password: input.password,
  })
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.warn("[auth/login] validation failed:", parsed.error.flatten())
    const firstIssue = parsed.error.issues[0]
    const field = firstIssue?.path?.[0]
    const message =
      field === "email"
        ? "Please enter a valid email address."
        : field === "password"
          ? "Please enter your password."
          : "Please enter a valid email and password."
    return { ok: false, error: message }
  }

  try {
    // eslint-disable-next-line no-console
    console.log("[auth/login] sending request to backend…")
    const result = await api.auth.login(parsed.data)
    // eslint-disable-next-line no-console
    console.log("[auth/login] success, role:", result.role)
    const slug = apiRoleToSlug(result.role)
    const redirectTo = ROLE_TO_DEFAULT_ROUTE[slug]
    if (!redirectTo) {
      // Defensive: an unknown role (Zod drift, backend change, casing,
      // etc.) would otherwise yield { ok: true, redirectTo: undefined }
      // and the client would call router.replace(undefined) — silently
      // doing nothing. Surface it instead.
      // eslint-disable-next-line no-console
      console.error("[auth/login] unknown role from backend:", {
        role: result.role,
        slug,
      })
      return {
        ok: false,
        error: "Unexpected role from server. Please contact support.",
      }
    }
    await setAuthCookies(result.access, result.refresh, result.role, Boolean(input.remember))
    return { ok: true, redirectTo }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[auth/login] error:", err)
    if (err instanceof AuthError) {
      if (err.status === 401) {
        return { ok: false, error: "Invalid email or password." }
      }
      return { ok: false, error: "Access denied." }
    }
    if (err instanceof NetworkError) {
      return {
        ok: false,
        error: "Cannot reach the server. Check your connection and try again.",
      }
    }
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookies()
  redirect("/login")
}

/**
 * Cookie helpers — used internally and by the /api/auth/refresh route
 * handler. Setting `httpOnly: true` means JS cannot read the tokens
 * (XSS-safe). `sameSite: "lax"` lets top-level navigation carry cookies
 * while blocking most CSRF vectors.
 */
export async function setAuthCookies(
  access: string,
  refresh: string,
  role: string,
  remember: boolean
): Promise<void> {
  const cookieStore = await cookies()
  const accessMaxAge = remember ? ONE_HOUR * 24 : ONE_HOUR
  const refreshMaxAge = remember ? THIRTY_DAYS : SEVEN_DAYS

  cookieStore.set(ACCESS_COOKIE, access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
  })
  cookieStore.set(REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge,
  })
  cookieStore.set(ROLE_COOKIE, role, {
    httpOnly: false, // Accessible by client and proxy if needed, though proxy can read httpOnly too
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge, // Keep role as long as the refresh token
  })
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ACCESS_COOKIE)
  cookieStore.delete(REFRESH_COOKIE)
  cookieStore.delete(ROLE_COOKIE)
}

/**
 * Reads the current refresh token from cookies. Used by the
 * /api/auth/refresh route handler.
 */
export async function readRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(REFRESH_COOKIE)?.value ?? null
}

/**
 * Reads the current access token from cookies. Used by the
 * /api/auth/refresh route handler to forward credentials upstream.
 */
export async function readAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(ACCESS_COOKIE)?.value ?? null
}