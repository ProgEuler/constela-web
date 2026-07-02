import type { RoleSlug } from "@/navigation/roles"

/**
 * Where each role lands by default after login.
 */
export const ROLE_TO_DEFAULT_ROUTE: Record<RoleSlug, string> = {
  "super-admin": "/dashboard/super-admin",
  admin: "/dashboard/admin",
  moderator: "/dashboard/moderator",
  support: "/dashboard/support",
}

/**
 * Routes by longest-prefix match → which roles can access them.
 *
 * The middleware looks up the longest matching prefix and verifies the
 * user's role is in the allowed list. Mismatch → redirect to the user's
 * default dashboard.
 *
 * Order does not matter; we always pick the longest match.
 */
export const ROUTE_PREFIX_TO_ROLES: Record<string, RoleSlug[]> = {
  // Role-specific dashboards
  "/dashboard/super-admin": ["super-admin"],
  "/dashboard/admin": ["super-admin", "admin"],
  "/dashboard/moderator": ["super-admin", "admin", "moderator"],
  "/dashboard/support": ["super-admin", "admin", "support"],

  // Shared pages
  "/dashboard/users": [
    "super-admin",
    "admin",
    "moderator",
    "support",
  ],
  "/dashboard/matches": ["super-admin", "admin", "moderator"],
  "/dashboard/chat-room": ["super-admin", "admin", "moderator"],
  "/dashboard/moderation": ["super-admin", "admin", "moderator"],
  "/dashboard/reports": ["super-admin", "admin", "moderator"],
  "/dashboard/photo-verification": ["super-admin", "moderator"],
  "/dashboard/payments": ["super-admin"],
  "/dashboard/subscriptions": ["super-admin"],
  "/dashboard/settings": ["super-admin", "admin"],
}

/**
 * Pick the longest matching prefix from `ROUTE_PREFIX_TO_ROLES` for a
 * given pathname. Returns null if no route is recognised.
 */
export function matchRoutePrefix(pathname: string): string | null {
  let best: string | null = null
  for (const prefix of Object.keys(ROUTE_PREFIX_TO_ROLES)) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      if (best === null || prefix.length > best.length) {
        best = prefix
      }
    }
  }
  return best
}

/**
 * Check whether a role is allowed to access a given route.
 */
export function isRouteAllowedForRole(
  pathname: string,
  role: RoleSlug
): boolean {
  const prefix = matchRoutePrefix(pathname)
  if (prefix === null) {
    // Unknown route under /dashboard — deny by default.
    return false
  }
  return ROUTE_PREFIX_TO_ROLES[prefix].includes(role)
}