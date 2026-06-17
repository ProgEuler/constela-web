"use client"

import { useState } from "react"
import type { ColDef } from "ag-grid-community"
import { ArrowRight, CircleCheck, UserPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AgTable } from "@/components/shared/AgTable"

import { TakeActionSheet } from "./_components/take-action-sheet"
import {
  allReports,
  myCases,
  resolvedReports,
  priorityMeta,
  type ReportRow,
  type ReportPriority,
} from "./_components/report-data"

function PriorityBadge({ priority }: { priority: ReportPriority }) {
  const meta = priorityMeta[priority]
  return (
    <Badge className={cn("gap-1.5 border px-2 py-0.5 font-medium", meta.className)} variant="outline">
      {meta.label}
    </Badge>
  )
}

export default function ReportsPage() {
  const [actionReport, setActionReport] = useState<ReportRow | null>(null)
  const [actionSheetOpen, setActionSheetOpen] = useState(false)

  const openActionSheet = (report: ReportRow) => {
    setActionReport(report)
    setActionSheetOpen(true)
  }

  // Shared columns for all tabs
  const reportIdCol: ColDef<ReportRow> = {
    field: "reportId",
    headerName: "Report ID",
    minWidth: 110,
    maxWidth: 130,
    cellClass: "font-mono text-xs",
  }

  const reportedUserCol: ColDef<ReportRow> = {
    field: "reportedUser",
    headerName: "Reported user",
    cellRenderer: "tableUserCell",
    minWidth: 180,
  }

  const reasonCol: ColDef<ReportRow> = {
    field: "reason",
    headerName: "Reason",
    minWidth: 160,
  }

  const priorityCol: ColDef<ReportRow> = {
    field: "priority",
    headerName: "Priority",
    minWidth: 110,
    maxWidth: 130,
    cellRenderer: (params: { value: ReportPriority }) => (
      <PriorityBadge priority={params.value} />
    ),
  }

  const reportedByCol: ColDef<ReportRow> = {
    field: "reportedBy",
    headerName: "Reported by",
    cellRenderer: "tableUserCell",
    minWidth: 180,
  }

  const historyCol: ColDef<ReportRow> = {
    field: "history",
    headerName: "History",
    minWidth: 150,
  }

  const timeCol: ColDef<ReportRow> = {
    field: "time",
    headerName: "Time",
    minWidth: 120,
    maxWidth: 140,
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All reports</TabsTrigger>
          <TabsTrigger value="my-cases">My cases</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        {/* All Reports Tab */}
        <TabsContent value="all">
          <AgTable
            title={`${allReports.length} reports`}
            rowData={allReports}
            showRowNumberColumn={false}
            pagination
            pageSize={10}
            height="auto"
            minHeight={400}
            columnDefs={[
              reportIdCol,
              reportedUserCol,
              reasonCol,
              priorityCol,
              reportedByCol,
              historyCol,
              timeCol,
              {
                headerName: "Action",
                minWidth: 140,
                maxWidth: 160,
                sortable: false,
                filter: false,
                cellRenderer: () => (
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <UserPlus className="size-3.5" />
                    Assign to me
                  </Button>
                ),
              },
            ]}
          />
        </TabsContent>

        {/* My Cases Tab */}
        <TabsContent value="my-cases">
          {actionReport && (
            <TakeActionSheet
              report={actionReport}
              open={actionSheetOpen}
              onOpenChange={setActionSheetOpen}
            />
          )}
          <AgTable
            title={`${myCases.length} open cases`}
            rowData={myCases}
            showRowNumberColumn={false}
            pagination
            pageSize={10}
            height="auto"
            minHeight={400}
            columnDefs={[
              reportIdCol,
              reportedUserCol,
              reasonCol,
              priorityCol,
              reportedByCol,
              historyCol,
              timeCol,
              {
                headerName: "Action",
                minWidth: 140,
                maxWidth: 160,
                sortable: false,
                filter: false,
                cellRenderer: (params: { data: ReportRow }) => (
                  <Button
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => openActionSheet(params.data)}
                  >
                    <ArrowRight className="size-3.5" />
                    Take action
                  </Button>
                ),
              },
            ]}
          />
        </TabsContent>

        {/* Resolved Tab */}
        <TabsContent value="resolved">
          <AgTable
            title={`${resolvedReports.length} resolved reports`}
            rowData={resolvedReports}
            showRowNumberColumn={false}
            pagination
            pageSize={10}
            height="auto"
            minHeight={400}
            columnDefs={[
              reportIdCol,
              reportedUserCol,
              reasonCol,
              priorityCol,
              reportedByCol,
              historyCol,
              timeCol,
              {
                headerName: "Action",
                minWidth: 100,
                maxWidth: 120,
                sortable: false,
                filter: false,
                cellRenderer: () => (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <CircleCheck className="size-3.5" />
                    Resolved
                  </span>
                ),
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
