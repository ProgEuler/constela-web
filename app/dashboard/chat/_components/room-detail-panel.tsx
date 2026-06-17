"use client"

import { MoreVertical, Search, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { MemberAvatar, memberTones, getMemberTone } from "./room-list-panel"
import type { ChatRoom, RoomMember } from "./chat-rooms-data"

interface RoomDetailPanelProps {
  room: ChatRoom
  onClose?: () => void
  memberQuery: string
  onMemberQueryChange: (value: string) => void
}

const statusStyles: Record<RoomMember["status"], string> = {
  member: "bg-emerald-500/10 text-emerald-700",
  blocked: "bg-rose-500/10 text-rose-600",
}

const roleStyles: Record<RoomMember["status"], string> = {
  member: "bg-muted text-muted-foreground",
  blocked: "bg-rose-500/10 text-rose-600",
}

export function RoomDetailPanel({
  room,
  onClose,
  memberQuery,
  onMemberQueryChange,
}: RoomDetailPanelProps) {
  const Icon = room.icon
  const filteredMembers = room.members.filter((member) => {
    if (!memberQuery.trim()) return true
    const query = memberQuery.toLowerCase()
    return (
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query)
    )
  })

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border bg-card">
      <div className="flex items-start gap-3 border-b p-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            room.iconBg
          )}
        >
          <Icon className={cn("size-5", room.iconColor)} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold text-foreground">
              {room.name}
            </h2>
            <Badge
              variant="secondary"
              className="h-5 gap-1 rounded-full border-transparent bg-emerald-500/10 px-2 text-[10px] font-medium text-emerald-700"
            >
              <GlobeIcon />
              {room.type === "public" ? "Public" : "Private"}
            </Badge>
            <Badge
              variant="secondary"
              className="h-5 rounded-full border-transparent bg-emerald-500/10 px-2 text-[10px] font-medium text-emerald-700"
            >
              {room.status === "active" ? "Active" : "Archived"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {room.description}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Created by{" "}
            <span className="font-medium text-foreground">
              {room.createdBy}
            </span>
            <span className="mx-1.5">·</span>
            {room.createdAt}
            <span className="mx-1.5">·</span>
            {room.messageCount.toLocaleString()} messages
          </p>
        </div>
        <div className="flex items-center gap-1">
          {onClose ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="rounded-full"
              aria-label="Close room details"
            >
              <X className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Users2Icon />
          <h3 className="text-sm font-semibold text-foreground">
            Contributors &amp; Members
          </h3>
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
            {room.members.length}
          </span>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={memberQuery}
            onChange={(event) => onMemberQueryChange(event.target.value)}
            placeholder="Search members..."
            className="h-8 rounded-full pl-8 text-xs"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4">
        {filteredMembers.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground">
            No members to show.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3",
                member.status === "blocked"
                  ? "border-rose-200/70 bg-rose-50/40"
                  : "border-border bg-card"
              )}
            >
              <MemberAvatar name={member.name} tone={member.tone} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {member.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "h-5 rounded-full border-transparent px-2 text-[10px] font-medium",
                      roleStyles[member.status]
                    )}
                  >
                    {member.status === "member" ? "Member" : "Member"}
                  </Badge>
                  {member.status === "blocked" ? (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 rounded-full border-transparent px-2 text-[10px] font-medium",
                        statusStyles.blocked
                      )}
                    >
                      Blocked
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {member.email}
                  <span className="mx-1.5">·</span>
                  Joined {member.joinedDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full text-muted-foreground"
                aria-label={`More options for ${member.name}`}
              >
                <MoreVertical className="size-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function Users2Icon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-muted-foreground"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z" />
    </svg>
  )
}
