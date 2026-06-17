"use client"

import * as React from "react"
import type { ICellRendererParams } from "ag-grid-community"
import { Ban, EllipsisVertical, Gift, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { UserRow } from "./data"
import { GiftSubscriptionDialog } from "./gift-dialog"
import { UserProfileDialog } from "./user-profile-dialog"

type UserActionsCellProps = ICellRendererParams<UserRow>

export function UserActionsCell({ data }: UserActionsCellProps) {
  const [viewOpen, setViewOpen] = React.useState(false)
  const [giftOpen, setGiftOpen] = React.useState(false)

  if (!data) return null

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      data-cell-click-ignore
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={`Open actions for ${data.name}`}
            className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
            size="icon-sm"
            variant="ghost"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onSelect={() => setViewOpen(true)}>
            <UserRound className="size-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setGiftOpen(true)}>
            <Gift className="size-4" />
            Gift
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => event.preventDefault()}
          >
            <Ban className="size-4" />
            Block user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog user={data} open={viewOpen} onOpenChange={setViewOpen} />
      <GiftSubscriptionDialog user={data} open={giftOpen} onOpenChange={setGiftOpen} />
    </div>
  )
}
