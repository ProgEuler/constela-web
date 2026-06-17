"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { statusMeta, type VerificationUser } from "./verification-data"
import { Avatar } from "@/components/ui/avatar"

type UserReviewCardProps = {
  user: VerificationUser
  selected: boolean
  onSelect: (user: VerificationUser) => void
}

export function UserReviewCard({
  user,
  selected,
  onSelect,
}: UserReviewCardProps) {
  const meta = statusMeta[user.status]

  return (
    <Card
      onClick={() => onSelect(user)}
      className={cn(
        "cursor-pointer p-3 transition-all duration-150",
        selected ? "ring-2 ring-primary/50" : "hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar placeholder with gradient */}
        <Avatar className="bg-gradient-to-br from-primary/20 to-primary/50">
          {user.initials}
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {user.email}
          </div>
          <div className="text-[11px] text-muted-foreground/70">
            Submitted {user.submittedDate}
          </div>
        </div>
      </div>
    </Card>
  )
}
