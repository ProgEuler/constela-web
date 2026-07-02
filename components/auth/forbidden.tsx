import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Generic 403 page used when a user lacks permission for a route.
 * The dashboard layout can render this if `getSession()` is present
 * but the role cannot access the requested path.
 */
export function Forbidden({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Access denied
        </h1>
        <p className="text-muted-foreground">
          {message ??
            "You don't have permission to view this page. Contact a super-admin if you believe this is a mistake."}
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}