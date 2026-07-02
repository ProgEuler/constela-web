"use client";

import { useRole } from "@/components/auth/role-context";
import { hasPermission } from "@/lib/auth/permissions";
import type { Permission } from "@/lib/auth/permissions";

/**
 * Fine-grained UI gate. Render `children` only when the current role
 * has the required permission.
 *
 *   <Can permission="users.delete" fallback={<ReadOnlyBadge />}>
 *     <DeleteUserButton />
 *   </Can>
 *
 * Reads role from `RoleContextProvider`, which is mounted in the
 * dashboard layout. Returns the fallback (or null) when no role is
 * available — fail closed.
 */
export interface CanProps {
  permission: Permission | string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const role = useRole();
  if (!role) return <>{fallback}</>;
  return hasPermission(role, permission) ? <>{children}</> : <>{fallback}</>;
}