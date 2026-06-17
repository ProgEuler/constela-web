"use client"

import { useState } from "react"

import { chatRooms, roomDetails } from "./_components/chat-rooms-data"
import CreateRoomDialog from "./_components/create-room-dialog"
import RoomDetailPanel from "./_components/room-detail-panel"
import RoomListPanel from "./_components/room-list-panel"

export default function ChatDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    chatRooms[0]?.id ?? null
  )
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const selectedRoom = selectedRoomId ? roomDetails[selectedRoomId] ?? null : null

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-0 overflow-hidden rounded-2xl border bg-card">
      {/* Left Panel */}
      <div className="flex w-full max-w-sm shrink-0 flex-col border-r p-4">
        <RoomListPanel
          rooms={chatRooms}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          onOpenCreate={() => setCreateDialogOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col overflow-y-auto p-5">
        <RoomDetailPanel room={selectedRoom} />
      </div>

      {/* Create Room Dialog */}
      <CreateRoomDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  )
}
