import type { RoleSlug } from "@/navigation/roles"

/**
 * Permissions are dot-notation strings: "users.read", "matches.write", "*".
 * Use `*` for "all permissions".
 *
 * Components gate UI with `<Can permission="users.write">`.
 */
export type Permission =
  | "*"
  | "users.read"
  | "users.write"
  | "users.delete"
  | "matches.read"
  | "matches.write"
  | "reports.read"
  | "reports.write"
  | "moderation.read"
  | "moderation.write"
  | "payments.read"
  | "subscriptions.read"
  | "settings.read"
  | "settings.write"
  | "tickets.read"
  | "tickets.write"
  | "photo_verification.read"
  | "photo_verification.write"
  | "chat.read"

export const ROLE_PERMISSIONS: Record<RoleSlug, Permission[]> = {
  "super-admin": ["*"],
  admin: [
    "users.read",
    "users.write",
    "matches.read",
    "matches.write",
    "moderation.read",
    "moderation.write",
    "reports.read",
    "reports.write",
    "chat.read",
    "settings.read",
    "settings.write",
  ],
  moderator: [
    "users.read",
    "matches.read",
    "matches.write",
    "moderation.read",
    "moderation.write",
    "reports.read",
    "reports.write",
    "photo_verification.read",
    "photo_verification.write",
  ],
  support: ["users.read", "tickets.read", "tickets.write"],
}

/**
 * Check whether a role has a given permission.
 * Supports `*` wildcard and `domain.*` patterns.
 */
export function hasPermission(role: RoleSlug, perm: Permission | string): boolean {
  const perms = ROLE_PERMISSIONS[role] ?? []
  if (perms.includes("*")) return true
  if (perms.includes(perm as Permission)) return true

  // Domain wildcard match: "users.*" matches "users.read".
  const [domain] = String(perm).split(".")
  if (domain && perms.includes(`${domain}.*` as Permission)) return true

  return false
}