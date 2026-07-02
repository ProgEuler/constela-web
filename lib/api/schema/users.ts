import { z } from "zod"

import { UserSchema } from "./auth"

/**
 * Response shape of `GET /api/users/` — paginated list of users.
 * Adjust to match real backend.
 */
export const UserListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(UserSchema),
})
export type UserListResponse = z.infer<typeof UserListResponseSchema>