"use client"

import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomName: string
  onConfirm: () => void
}

export default function DeleteRoomDialog({
  open,
  onOpenChange,
  roomName,
  onConfirm,
}: DeleteRoomDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <DialogTitle>Delete Chat Room</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{roomName}&rdquo;
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}