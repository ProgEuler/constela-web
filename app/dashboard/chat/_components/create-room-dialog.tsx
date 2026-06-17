"use client"

import { useState } from "react"
import { Globe, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type RoomType = "public" | "private"

interface CreateRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate?: (values: {
    name: string
    description: string
    type: RoomType
  }) => void
}

const typeOptions: Array<{
  value: RoomType
  title: string
  description: string
  icon: typeof Globe
}> = [
  {
    value: "public",
    title: "Public",
    description: "Anyone can join",
    icon: Globe,
  },
  {
    value: "private",
    title: "Private",
    description: "Invite only",
    icon: Lock,
  },
]

export function CreateRoomDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateRoomDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<RoomType>("public")

  const handleCreate = () => {
    if (!name.trim()) return
    onCreate?.({ name: name.trim(), description: description.trim(), type })
    setName("")
    setDescription("")
    setType("public")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setName("")
    setDescription("")
    setType("public")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-md rounded-3xl p-0 sm:max-w-md"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Create Chat Room
          </DialogTitle>
        </div>
        <div className="h-px bg-border" />

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-1.5">
            <label htmlFor="room-name" className="text-sm font-medium">
              Room Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="room-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Dating Advice for Autistics"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="room-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="room-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this room about?"
              className="min-h-24 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Room Type</span>
            <div className="grid grid-cols-2 gap-3">
              {typeOptions.map((option) => {
                const Icon = option.icon
                const active = type === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value)}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                      active
                        ? "border-emerald-600 bg-emerald-500/5"
                        : "border-border bg-input/30 hover:bg-input/50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                        active
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">
                        {option.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t bg-muted/20 px-6 py-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="rounded-xl bg-emerald-700 text-white hover:bg-emerald-700/90"
          >
            Create Room
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
