"use client"

import { CheckCircle2, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { statusMeta, type VerificationUser } from "./verification-data"
import { Avatar } from "@/components/ui/avatar"

type VerificationPanelProps = {
  user: VerificationUser
  onVerify: (user: VerificationUser) => void
  onReject: (user: VerificationUser) => void
}

export function VerificationPanel({
  user,
  onVerify,
  onReject,
}: VerificationPanelProps) {
  const meta = statusMeta[user.status]

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Profile Photo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground">
                Profile Photo
              </span>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted"></div>
          </div>

          {/* Verification Selfie */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground">
                Verification Selfie
              </span>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              {/* Selfie frame indicator */}
              <div className="absolute inset-4 rounded-lg border-2 border-dashed border-white/30" />
            </div>
          </div>
        </div>
      </CardContent>

      <Separator />

      {/* User details */}
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <span className="text-xs text-muted-foreground">Joined</span>
            <p className="text-sm text-foreground">{user.joinedDate}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Submitted</span>
            <p className="text-sm text-foreground">{user.submittedDate}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">User ID</span>
            <p className="font-mono text-sm text-foreground">{user.id}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Status</span>
            <p className="text-sm text-foreground">{meta.label}</p>
          </div>
        </div>

        {user.reason && (
          <div className="mt-3 rounded-lg bg-destructive/5 p-3">
            <span className="text-xs font-medium text-destructive">
              Rejection reason
            </span>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {user.reason}
            </p>
          </div>
        )}
      </CardContent>

      <Separator />

      {/* Action buttons */}
      <CardContent className="p-5">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => onReject(user)}
          >
            <XCircle className="size-4 text-destructive" />
            Reject
          </Button>
          <Button className="flex-1 gap-2" onClick={() => onVerify(user)}>
            <CheckCircle2 className="size-4" />
            Verify Identity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
