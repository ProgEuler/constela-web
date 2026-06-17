"use client"

import { MessageSquare, Plus, Search, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StatCard, { type Stat } from "@/components/shared/stat-card"
import { cn } from "@/lib/utils"

import type { ChatRoom } from "./chat-rooms-data"

interface RoomListPanelProps {
  rooms: ChatRoom[]
  selectedRoomId: string | null
  onSelectRoom: (id: string) => void
  onOpenCreate: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function RoomListPanel({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onOpenCreate,
  searchQuery,
  onSearchChange,
}: RoomListPanelProps) {
  const stats: Stat[] = [
    {
      label: "Active Rooms",
      value: String(rooms.length),
      icon: MessageSquare,
    },
    {
      label: "Total Members",
      value: String(rooms.reduce((sum, r) => sum + r.memberCount, 0)),
      icon: Users,
    },
  ]

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Search + Create */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button size="icon-sm" onClick={onOpenCreate} title="Create Room">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <StatCard stats={stats} className="grid grid-cols-2 gap-3" />

      {/* Room List */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        <h3 className="text-xs font-semibold text-muted-foreground">
          All Rooms ({filteredRooms.length})
        </h3>
        <div className="space-y-1.5">
          {filteredRooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelectRoom(room.id)}
              className={cn(
                "w-full rounded-xl border p-3 text-left transition-colors",
                selectedRoomId === room.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium">
                      {room.name}
                    </span>
                    {room.type === "private" && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 px-1.5 text-[10px]"
                      >
                        Private
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {room.description}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {room.memberCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {room.messageCount}
                </span>
              </div>
            </button>
          ))}
          {filteredRooms.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No rooms found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
