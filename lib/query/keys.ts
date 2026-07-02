/**
 * Central registry for TanStack Query keys. Use these helpers
 * everywhere so we can refactor the underlying key shape without
 * breaking cache invalidation across the app.
 */

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
}

export const usersKeys = {
  all: ["users"] as const,
  list: (params?: Record<string, unknown>) =>
    [...usersKeys.all, "list", params ?? {}] as const,
  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
}