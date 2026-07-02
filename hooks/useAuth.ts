"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { AuthError } from "@/lib/api/errors";
import { authKeys } from "@/lib/query/keys";
import {
  loginAction,
  logoutAction,
} from "@/server/auth/actions";

/**
 * Hooks for the auth flow.
 *
 * - `useMe()` — TanStack Query for the current user.
 * - `useLogin()` — calls `loginAction` server action; navigates on success.
 * - `useLogout()` — calls `logoutAction` server action.
 *
 * Tokens themselves never touch JS — they're set as httpOnly cookies by
 * the server action.
 */

/**
 * Fetch the authenticated user's profile. Returns `null` when no
 * session is present (e.g. on /login page) so callers can render
 * unauthenticated UI without try/catching.
 */
export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      // eslint-disable-next-line no-console
      console.log("[useMe] fetching current user…");
      try {
        const user = await api.auth.me();
        // eslint-disable-next-line no-console
        console.log("[useMe] success", user);
        return user;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[useMe] error", err);
        // 401 means no session — that's not an error to surface.
        if (err instanceof AuthError) return null;
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Mutation that calls the `loginAction` server action. On success it
 * navigates to the user's role-specific dashboard and prefetches `/me`.
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      // eslint-disable-next-line no-console
      console.log("[useLogin] mutate", {
        email: input.email,
        passwordLength: input.password?.length ?? 0,
        remember: Boolean(input.remember),
      });
      try {
        const result = await loginAction(input);
        // eslint-disable-next-line no-console
        console.log("[useLogin] result", result);
        return result;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[useLogin] threw", err);
        throw err;
      }
    },
    onSuccess: (result) => {
      if (result.ok && result.redirectTo) {
        // eslint-disable-next-line no-console
        console.log("[useLogin] success → navigating to", result.redirectTo);
        // Warm the cache so the dashboard layout doesn't show a loading
        // state on first paint after login.
        queryClient.invalidateQueries({ queryKey: authKeys.all });
        router.replace(result.redirectTo);
        router.refresh();
      } else if (result.ok && !result.redirectTo) {
        // Defensive: server said ok=true but gave us nowhere to go.
        // Treat as a hard error instead of calling router.replace(undefined).
        // eslint-disable-next-line no-console
        console.error(
          "[useLogin] success but redirectTo is empty — bailing out",
          result
        );
      } else {
        // eslint-disable-next-line no-console
        console.warn("[useLogin] failed", result.error);
      }
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error("[useLogin] onError", err);
    },
  });
}

/**
 * Mutation that calls the `logoutAction` server action. Clears the
 * `/me` cache so subsequent renders reflect the logged-out state.
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // eslint-disable-next-line no-console
      console.log("[useLogout] calling logoutAction…");
      try {
        await logoutAction();
        // eslint-disable-next-line no-console
        console.log("[useLogout] logoutAction finished");
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[useLogout] error", err);
        throw err;
      }
    },
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log("[useLogout] clearing cache and redirecting to /login");
      queryClient.setQueryData(authKeys.me(), null);
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
  });
}