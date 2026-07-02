import { createStore } from "zustand/vanilla";

import type { RoleSlug } from "@/navigation/roles";

/**
 * Auth store — UI flags only.
 *
 * Tokens live in httpOnly cookies and are never read by JS. The user
 * profile is owned by TanStack Query (`useMe()`); this store only tracks
 * transient UI state that doesn't belong on the server.
 */
export interface AuthState {
  isHydrated: boolean;
  loginPending: boolean;
  lastError: string | null;
  setHydrated: (value: boolean) => void;
  setLoginPending: (value: boolean) => void;
  setLastError: (value: string | null) => void;
  reset: () => void;
}

export const createAuthStore = (init?: Partial<AuthState>) =>
  createStore<AuthState>()((set) => ({
    isHydrated: init?.isHydrated ?? false,
    loginPending: init?.loginPending ?? false,
    lastError: init?.lastError ?? null,
    setHydrated: (value) => set({ isHydrated: value }),
    setLoginPending: (value) => set({ loginPending: value }),
    setLastError: (value) => set({ lastError: value }),
    reset: () =>
      set({
        isHydrated: false,
        loginPending: false,
        lastError: null,
      }),
  }));

/**
 * Re-export for consumers that import `RoleSlug` indirectly.
 */
export type { RoleSlug };