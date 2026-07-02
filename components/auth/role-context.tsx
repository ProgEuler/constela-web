"use client";

import { createContext, useContext, useMemo } from "react";

import type { RoleSlug } from "@/navigation/roles";

interface RoleContextValue {
  role: RoleSlug | null;
}

const RoleContext = createContext<RoleContextValue>({ role: null });

export function RoleContextProvider({
  role,
  children,
}: {
  role: RoleSlug | null;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ role }), [role]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleSlug | null {
  return useContext(RoleContext).role;
}