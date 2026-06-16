import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

export default function IconWrap({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-primary p-2 text-primary-foreground [&_svg]:h-4 [&_svg]:w-4",
        className
      )}
    >
      {children}
    </div>
  )
}
