import { QueryClient, isServer } from "@tanstack/react-query"

/**
 * Build a fresh QueryClient. Defaults are tuned for a small admin
 * dashboard — adjust as the app grows.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Sessions are short. Refetch on focus keeps sidebar data fresh.
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

/**
 * Returns a QueryClient that is:
 *   - On the server: a fresh client per call (no cross-request leakage).
 *   - On the client: a singleton created once per browser tab.
 *
 * This is the recommended App Router pattern from TanStack docs.
 */
export function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}