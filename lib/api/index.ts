/**
 * Public entry point for the API layer.
 *
 *   import { api } from "@/lib/api"
 *   const user = await api.auth.me()
 */
export * from "./client"
export * from "./errors"
export * as authApi from "./auth"
export * as usersApi from "./users"
export * as authSchema from "./schema/auth"
export * as usersSchema from "./schema/users"

import * as authApi from "./auth"
import * as usersApi from "./users"

export const api = {
  auth: authApi,
  users: usersApi,
}