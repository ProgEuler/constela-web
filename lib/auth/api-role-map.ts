import type { ApiRole } from "@/lib/api/schema/auth"
import type { RoleSlug } from "@/navigation/roles"

/**
 * Map between API role strings (no hyphen) and UI slugs (hyphenated).
 *
 *   API: "superadmin"  <->  UI: "super-admin"
 *   API: "admin"       <->  UI: "admin"
 *   API: "moderator"   <->  UI: "moderator"
 *   API: "support"     <->  UI: "support"
 */
export const API_ROLE_TO_SLUG: Record<ApiRole, RoleSlug> = {
  superadmin: "super-admin",
  admin: "admin",
  moderator: "moderator",
  support: "support",
}

export const SLUG_TO_API_ROLE: Record<RoleSlug, ApiRole> = {
  "super-admin": "superadmin",
  admin: "admin",
  moderator: "moderator",
  support: "support",
}

export function apiRoleToSlug(role: ApiRole): RoleSlug {
  return API_ROLE_TO_SLUG[role]
}

export function slugToApiRole(slug: RoleSlug): ApiRole {
  return SLUG_TO_API_ROLE[slug]
}

/**
 * Type guard for unknown role strings.
 */
export function isApiRole(value: unknown): value is ApiRole {
  return (
    typeof value === "string" &&
    (value === "superadmin" ||
      value === "admin" ||
      value === "moderator" ||
      value === "support")
  )
}

export function isRoleSlug(value: unknown): value is RoleSlug {
  return (
    typeof value === "string" &&
    (value === "super-admin" ||
      value === "admin" ||
      value === "moderator" ||
      value === "support")
  )
}