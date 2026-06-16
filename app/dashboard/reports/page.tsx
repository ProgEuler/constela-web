import { BarChartComp } from "@/components/charts/bar-chart"
import { AgTable } from "@/components/shared/AgTable"
import StatCard, { type Stat } from "@/components/shared/stat-card"
import { CircleAlert, FileCheckCorner, ClipboardClock } from "lucide-react"

const data: Stat[] = [
  {
    label: "Total Reports",
    value: "123",
    change: "12",
    icon: CircleAlert,
    iconColor: "destructive",
  },
  {
    label: "Pending",
    value: "1542",
    change: "23",
    icon: ClipboardClock,
    iconColor: "warning",
  },
  {
    label: "Resolved this week",
    value: "1542",
    change: "23",
    icon: FileCheckCorner,
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <StatCard stats={data} />

      {/* report graph */}
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-2/3">
          <BarChartComp />
        </div>

        <AgTable
          columnDefs={[
            {
              field: "reporter",
              headerName: "Reporter",
              cellRenderer: "tableUserCell",
            },
            {
              field: "reportee",
              headerName: "Reportee",
              cellRenderer: "tableUserCell",
            },
            { field: "reason", headerName: "Reason" },
            { field: "date", headerName: "Date" },
            { field: "status", headerName: "Status" },
          ]}
          rowData={[
            {
              id: 1,
              reporter: "John Doe",
              reportee: "Jane Smith",
              reason: "Spam",
              date: "2023-10-01",
              status: "Active",
            },
          ]}
        />
      </div>
    </div>
  )
}
