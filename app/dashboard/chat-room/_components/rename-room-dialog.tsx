"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface RenameRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName: string
  initialDescription: string
  onSave: (name: string, description: string) => void
}

// `key` is provided by the caller (page.tsx) so the component remounts
// with fresh state every time `initialName` / `initialDescription` change.
// This avoids needing a setState-in-effect to re-seed the inputs.
export default function RenameRoomDialog({
  open,
  onOpenChange,
  initialName,
  initialDescription,
  onSave,
}: RenameRoomDialogProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  const handleSave = () => {
    const trimmedName = name.trim()
    if (!trimmedName) return
    onSave(trimmedName, description.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Chat Room</DialogTitle>
          <DialogDescription>
            Update the name and description for this room.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="rename-room-name">Room Name</Label>
            <Input
              id="rename-room-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter room name..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rename-description">Description</Label>
            <Textarea
              id="rename-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this room about?"
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}