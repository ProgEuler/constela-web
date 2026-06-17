"use client"

import * as React from "react"
import {
  Calendar,
  Check,
  Image as ImageIcon,
  Mail,
  MapPin,
  ShieldCheck,
  Ticket,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn, getInitials } from "@/lib/utils"

import { type UserRow } from "./data"

function InfoCard({
  icon: Icon,
  label,
  value,
  valueClassName,
  trailing,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
  valueClassName?: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className={cn("text-sm font-semibold", valueClassName)}>
          {value}
        </span>
        {trailing}
      </div>
    </div>
  )
}

function PhotoPlaceholder({
  index,
  active,
  initials,
}: {
  index: number
  active?: boolean
  initials: string
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center text-xs transition-colors",
        active
          ? "border-emerald-500/60 bg-emerald-500/5"
          : "border-muted-foreground/20 bg-muted/20 text-muted-foreground"
      )}
    >
      {active ? (
        <>
          <Avatar
            size="default"
            className="bg-emerald-700 text-white [&_[data-slot=avatar-fallback]]:bg-emerald-700 [&_[data-slot=avatar-fallback]]:text-white"
          >
            <AvatarFallback className="text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-foreground">
            Main Photo
          </span>
          <span className="absolute right-1.5 bottom-1.5 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="size-3" />
          </span>
        </>
      ) : (
        <>
          <ImageIcon className="size-6" />
          <span>Photo {index}</span>
        </>
      )}
    </div>
  )
}

type UserProfileDialogProps = {
  user: UserRow
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function UserProfileDialog({
  user,
  open,
  onOpenChange,
}: UserProfileDialogProps) {
  const initials = getInitials(user.name)
  const numericId = (parseInt(user.id.replace(/\D/g, ""), 10) || 0) % 999
  const age = 20 + (numericId % 30)
  const joined = formatJoined(user.joinedDate)
  const lastActive = formatLastActive(user.lastActive)
  const completeness = 92

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-md">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-lg">User Profile</DialogTitle>
          <DialogDescription>View detailed user information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-5 pb-5">
          {/* Hero section */}
          <div className="rounded-xl bg-emerald-500/10 p-4">
            <div className="flex items-start gap-4">
              <Avatar
                size="lg"
                className="bg-emerald-700 text-white [&_[data-slot=avatar-fallback]]:bg-emerald-700 [&_[data-slot=avatar-fallback]]:text-white"
              >
                <AvatarFallback className="text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-lg font-semibold">
                    {user.name}
                  </span>
                  <Badge
                    className="border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300"
                    variant="outline"
                  >
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Passionate about art and neurodivergent advocacy. Looking for
                  genuine connections.
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{age} yrs</span>
                  <span>·</span>
                  <span>Female</span>
                  <span>·</span>
                  <span>USA-{String(numericId).padStart(3, "0")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={Mail} label="Email" value={user.email} />
            <InfoCard
              icon={MapPin}
              label="Location"
              value={
                <span className="flex flex-col">
                  {user.location?.split(",")[0] ?? "—"}
                  {user.location?.includes(",") ? (
                    <span className="text-xs font-normal text-muted-foreground">
                      {user.location.split(",").slice(1).join(",").trim()}
                    </span>
                  ) : null}
                </span>
              }
            />
            <InfoCard
              icon={Ticket}
              label="Subscription"
              value={
                user.subscription ? (
                  <Badge
                    className="border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-amber-600 dark:text-amber-400"
                    variant="outline"
                  >
                    {user.subscription}
                  </Badge>
                ) : (
                  "—"
                )
              }
            />
            <InfoCard
              icon={Calendar}
              label="Activity"
              value={
                <span className="flex flex-col">
                  <span className="text-foreground">Joined {joined}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Active {lastActive}
                  </span>
                </span>
              }
            />
          </div>

          {/* Image verification */}
          <div className="space-y-3 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon className="size-4 text-muted-foreground" />
                Image Verification
              </div>
              <Badge
                className="gap-1 border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-emerald-600 dark:text-emerald-400"
                variant="outline"
              >
                <Check className="size-3" />
                Verified
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <PhotoPlaceholder index={2} active initials={initials} />
              <PhotoPlaceholder index={3} initials={initials} />
              <PhotoPlaceholder index={4} initials={initials} />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Profile completeness</span>
                <span className="font-medium text-foreground">
                  {completeness}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${completeness}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            type="button"
          >
            <ShieldCheck />
            Already Verified
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function formatJoined(value: string) {
  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return value
  }
}

function formatLastActive(minutesAgo: number) {
  if (minutesAgo <= 0) return "just now"
  if (minutesAgo < 60) return `${minutesAgo} min ago`
  const hours = Math.floor(minutesAgo / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`
  const months = Math.floor(days / 30)
  return `${months} month${months > 1 ? "s" : ""} ago`
}
