import { apiFetch, apiFetchSchema } from "./client"
import {
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshResponseSchema,
  UserSchema,
  type LoginRequest,
  type LoginResponse,
  type User,
} from "./schema/auth"

/**
 * Login API. Called server-side from `loginAction` (so the tokens can be
 * set as httpOnly cookies). Could also be called client-side, but going
 * through the server action is preferred for security.
 */
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const body = LoginRequestSchema.parse(payload)
  return apiFetchSchema<typeof LoginResponseSchema>("/api/auth/login/", LoginResponseSchema, {
    method: "POST",
    body,
    skipRefresh: true,
  })
}

/**
 * Refresh — handled by `/api/auth/refresh` route handler internally so
 * the refresh token never leaves the httpOnly cookie. See `client.ts`.
 */
export async function refreshToken(): Promise<LoginResponse> {
  return apiFetchSchema<typeof RefreshResponseSchema>(
    "/api/auth/refresh/",
    RefreshResponseSchema,
    { method: "POST", skipRefresh: true }
  )
}

/**
 * Logout — clears server-side cookies via `/api/auth/logout` route handler.
 */
export async function logout(): Promise<void> {
  await apiFetch<void>("/api/auth/logout", {
    method: "POST",
    skipRefresh: true,
  })
}

/**
 * Fetch the current authenticated user. Used by `useMe()`.
 */
export async function me(): Promise<User> {
  return apiFetchSchema<typeof UserSchema>("/api/auth/me/", UserSchema, {
    method: "GET",
  })
}