"use client"

import { ChevronRight, Lock, Plus, Search, Users2 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import type { ChatRoom, RoomStatus } from "./chat-rooms-data"

const toneStyles: Record<RoomStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-700",
  archived: "bg-muted text-muted-foreground",
}

const memberTones: Record<
  NonNullable<ChatRoom["members"][number]>["tone"],
  string
> = {
  amber: "bg-amber-500 text-white",
  violet: "bg-violet-500 text-white",
  sky: "bg-sky-500 text-white",
  rose: "bg-rose-500 text-white",
  emerald: "bg-emerald-500 text-white",
  orange: "bg-orange-500 text-white",
}

interface RoomListPanelProps {
  rooms: ChatRoom[]
  selectedRoomId: string
  onSelectRoom: (roomId: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  onCreate: () => void
  stats: { label: string; value: string }[]
}

export function RoomListPanel({
  rooms,
  selectedRoomId,
  onSelectRoom,
  searchQuery,
  onSearchChange,
  onCreate,
  stats,
}: RoomListPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search rooms..."
            className="h-9 rounded-xl pl-9"
          />
        </div>
        <Button
          onClick={onCreate}
          className="h-9 gap-1.5 rounded-xl bg-emerald-700 px-3 text-white hover:bg-emerald-700/90"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border bg-card px-4 py-3 text-center"
          >
            <div className="text-2xl font-semibold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {rooms.map((room) => {
          const Icon = room.icon
          const isActive = room.id === selectedRoomId
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelectRoom(room.id)}
              className={cn(
                "group relative flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                isActive
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-border bg-card hover:bg-muted/40"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl",
                  room.iconBg
                )}
              >
                <Icon className={cn("size-4", room.iconColor)} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {room.name}
                  </span>
                  {room.type === "private" ? (
                    <Lock className="size-3 shrink-0 text-muted-foreground" />
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {room.description}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users2 className="size-3" />
                      {room.memberCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageIcon className="size-3" />
                      {room.messageCount}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "h-5 rounded-full border-transparent px-2 text-[10px] font-medium capitalize",
                      toneStyles[room.status]
                    )}
                  >
                    {room.status}
                  </Badge>
                </div>
              </div>
              <ChevronRight
                className={cn(
                  "mt-1 size-4 shrink-0 text-muted-foreground transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export { memberTones }

export function getMemberTone(tone: keyof typeof memberTones) {
  return memberTones[tone] ?? "bg-muted text-muted-foreground"
}

export function MemberAvatar({
  name,
  tone,
}: {
  name: string
  tone: keyof typeof memberTones
}) {
  return (
    <Avatar className={cn("size-9 rounded-full", getMemberTone(tone))}>
      <AvatarFallback
        className={cn(
          "rounded-full text-xs font-semibold",
          getMemberTone(tone),
          "bg-transparent"
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("")
}
