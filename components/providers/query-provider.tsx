"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { getQueryClient } from "@/lib/query/client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Use state to ensure the QueryClient is created once per component
  // instance — survives re-renders but is fresh on full page load.
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}