"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type StoreApi, useStore } from "zustand";

import { createAuthStore, type AuthState } from "./auth-store";

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

export interface AuthStoreProviderProps {
  children: React.ReactNode;
  isHydrated?: boolean;
}

export const AuthStoreProvider = ({
  children,
  isHydrated = false,
}: AuthStoreProviderProps) => {
  // SSR-safe per-mount instantiation (mirrors preferences provider).
  const [store] = useState<StoreApi<AuthState>>(() =>
    createAuthStore({ isHydrated }),
  );

  // Mark the store as hydrated on the client so we can safely
  // differentiate "auth unknown" from "auth definitely present".
  useEffect(() => {
    store.setState((prev) => ({ ...prev, isHydrated: true }));
  }, [store]);

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (state: AuthState) => T): T => {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("Missing AuthStoreProvider");
  return useStore(store, selector);
};