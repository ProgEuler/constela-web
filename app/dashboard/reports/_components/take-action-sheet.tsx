"use client"

import { AlertTriangle, Ban, ShieldCheck, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { priorityMeta, type ReportRow } from "./report-data"

type TakeActionSheetProps = {
  report: ReportRow
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground text-sm shrink-0">{label}</span>
      <span className="text-foreground text-sm text-right font-medium">
        {value}
      </span>
    </div>
  )
}

export function TakeActionSheet({
  report,
  open,
  onOpenChange,
}: TakeActionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <SheetTitle>Report {report.reportId}</SheetTitle>
            <Badge
              className={priorityMeta[report.priority].className}
              variant="outline"
            >
              {report.priority}
            </Badge>
          </div>
          <SheetDescription>
            Reported by {report.reportedBy} &middot; {report.time}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-6 pt-0 overflow-y-auto flex-1">
          {/* Report Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Report Summary
            </h3>
            <div className="space-y-2 rounded-lg bg-muted/50 p-3">
              <DetailRow label="Reported User" value={report.reportedUser} />
              <DetailRow label="Reason" value={report.reason} />
              <DetailRow label="Priority" value={report.priority} />
              <DetailRow label="Status" value={report.status} />
              <DetailRow label="Reported By" value={report.reportedBy} />
              <DetailRow label="History" value={report.history} />
              <DetailRow label="Time" value={report.time} />
              {report.evidenceCount ? (
                <DetailRow
                  label="Evidence"
                  value={`${report.evidenceCount} attachments`}
                />
              ) : null}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {report.details}
            </p>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Take Action
            </h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => onOpenChange(false)}
              >
                <AlertTriangle className="size-4 text-amber-500" />
                Warning
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => onOpenChange(false)}
              >
                <Ban className="size-4 text-destructive" />
                Suspend
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => onOpenChange(false)}
              >
                <ShieldCheck className="size-4 text-emerald-500" />
                Request verification
              </Button>
              <Separator />
              <Button
                variant="ghost"
                className="justify-start gap-2 text-muted-foreground"
                onClick={() => onOpenChange(false)}
              >
                <XCircle className="size-4" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
