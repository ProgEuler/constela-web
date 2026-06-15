import { type ReactNode } from "react"

export default function IconWrap({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-primary p-2 *:h-4 *:w-4 *:text-white">
      {children}
    </div>
  )
}
