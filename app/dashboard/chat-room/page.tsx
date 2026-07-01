"use client"

import { useState } from "react"

import {
  chatRooms,
  roomDetails,
  type ChatRoom,
  type ChatRoomDetail,
} from "./_components/chat-rooms-data"
import CreateRoomDialog from "./_components/create-room-dialog"
import DeleteRoomDialog from "./_components/delete-room-dialog"
import RenameRoomDialog from "./_components/rename-room-dialog"
import RoomDetailPanel from "./_components/room-detail-panel"
import RoomListPanel from "./_components/room-list-panel"

export default function ChatDashboard() {
  const [rooms, setRooms] = useState<ChatRoom[]>(chatRooms)
  const [roomDetailsMap, setRoomDetailsMap] =
    useState<Record<string, ChatRoomDetail>>(roomDetails)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    chatRooms[0]?.id ?? null
  )
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const selectedRoom = selectedRoomId
    ? roomDetailsMap[selectedRoomId] ?? null
    : null

  const handleRename = (id: string, name: string, description: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name, description } : r))
    )
    setRoomDetailsMap((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, name, description } }
    })
  }

  const handleDelete = (id: string) => {
    setRooms((prev) => {
      const next = prev.filter((r) => r.id !== id)
      if (selectedRoomId === id) {
        setSelectedRoomId(next[0]?.id ?? null)
      }
      return next
    })
    setRoomDetailsMap((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-0 overflow-hidden rounded-2xl border bg-card">
      {/* Left Panel */}
      <div className="flex w-full max-w-sm shrink-0 flex-col border-r p-4">
        <RoomListPanel
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          onOpenCreate={() => setCreateDialogOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col overflow-y-auto p-5">
        <RoomDetailPanel
          room={selectedRoom}
          onRename={() => setRenameDialogOpen(true)}
          onDelete={() => setDeleteDialogOpen(true)}
        />
      </div>

      {/* Create Room Dialog */}
      <CreateRoomDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {/* Rename Room Dialog */}
      {selectedRoom && (
        <RenameRoomDialog
          key={selectedRoom.id}
          open={renameDialogOpen}
          onOpenChange={setRenameDialogOpen}
          initialName={selectedRoom.name}
          initialDescription={selectedRoom.description}
          onSave={(name, description) =>
            handleRename(selectedRoom.id, name, description)
          }
        />
      )}

      {/* Delete Room Dialog */}
      {selectedRoom && (
        <DeleteRoomDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          roomName={selectedRoom.name}
          onConfirm={() => handleDelete(selectedRoom.id)}
        />
      )}
    </div>
  )
}