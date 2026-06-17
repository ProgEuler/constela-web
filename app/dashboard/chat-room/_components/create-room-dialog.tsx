"use client"

import { useState } from "react"
import { Lock, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface CreateRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateRoomDialog({
  open,
  onOpenChange,
}: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("")
  const [description, setDescription] = useState("")
  const [roomType, setRoomType] = useState<"public" | "private">("public")

  const handleCreate = () => {
    if (!roomName.trim()) return
    // Handle room creation
    onOpenChange(false)
    setRoomName("")
    setDescription("")
    setRoomType("public")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Chat Room</DialogTitle>
          <DialogDescription>
            Create a new room for your community to connect and chat.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="room-name">Room Name</Label>
            <Input
              id="room-name"
              placeholder="Enter room name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What's this room about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label>Room Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoomType("public")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors",
                  roomType === "public"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <Globe
                  className={cn(
                    "h-5 w-5",
                    roomType === "public"
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                />
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      roomType === "public" && "text-primary"
                    )}
                  >
                    Public
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    Anyone can join
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRoomType("private")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors",
                  roomType === "private"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <Lock
                  className={cn(
                    "h-5 w-5",
                    roomType === "private"
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                />
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      roomType === "private" && "text-primary"
                    )}
                  >
                    Private
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    Invite only
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!roomName.trim()}>
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
