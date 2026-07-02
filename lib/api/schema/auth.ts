import { z } from "zod"

/**
 * Roles as returned by the backend (no hyphen for super-admin).
 * The UI uses "super-admin" with a hyphen — see `lib/auth/api-role-map.ts`.
 */
export const ApiRoleSchema = z.enum([
  "superadmin",
  "admin",
  "moderator",
  "support",
])
export type ApiRole = z.infer<typeof ApiRoleSchema>

/**
 * Response shape of `POST /api/auth/login/`.
 */
export const LoginResponseSchema = z.object({
  refresh: z.string().min(1),
  access: z.string().min(1),
  role: ApiRoleSchema,
})
export type LoginResponse = z.infer<typeof LoginResponseSchema>

/**
 * Response shape of `POST /api/auth/refresh/`.
 * Same shape as login (new tokens + same role).
 */
export const RefreshResponseSchema = LoginResponseSchema
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>

/**
 * Response shape of `GET /api/auth/me/`.
 * Adjust fields to match the real backend response.
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  role: ApiRoleSchema,
  created_at: z.string().optional(),
})
export type User = z.infer<typeof UserSchema>

/**
 * Login request payload (client-side schema for forms).
 *
 * Note: only the email is validated here — the password is forwarded
 * verbatim to the backend so the server can apply its own password
 * policy and return the appropriate error.
 */
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginRequest = z.infer<typeof LoginRequestSchema>