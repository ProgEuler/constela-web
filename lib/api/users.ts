import { apiFetchSchema } from "./client"
import { UserListResponseSchema, type UserListResponse } from "./schema/users"

/**
 * List users — paginated. Adjust query params to match real backend.
 */
export async function listUsers(params?: {
  page?: number
  search?: string
}): Promise<UserListResponse> {
  return apiFetchSchema<typeof UserListResponseSchema>(
    "/api/users/",
    UserListResponseSchema,
    { method: "GET", query: params }
  )
}