import {
  Users,
  Heart,
  CreditCard,
  DollarSign,
  CircleAlert,
  ClipboardMinus,
  StickyNoteCheck,
  UserRoundX,
} from "lucide-react"
import StatCard, { Stat } from "@/components/shared/stat-card"
import { BarChartComp } from "@/components/charts/bar-chart"
import { AgTable } from "@/components/shared/AgTable"

export default function SuperAdminDashboard() {
  const stats: Stat[] = [
    {
      label: "Pending Reports",
      value: "24,582",
      change: "+12.5%",
      icon: CircleAlert,
      iconColor: "warning",
    },
    {
      label: "Under Review",
      value: "8,341",
      change: "+8.2%",
      icon: ClipboardMinus,
    },
    {
      label: "Resolved Today",
      value: "$128,490",
      change: "+23.1%",
      icon: StickyNoteCheck,
    },
    {
      label: "Accounts Suspended",
      value: "1,234",
      change: "+5.4%",
      icon: UserRoundX,
      iconColor: "destructive",
    },
  ]

  return (
    <div className="space-y-6">
      <StatCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* reports bar chart */}
        <BarChartComp />

        <AgTable
          columnDefs={[
            {
              field: "reporter",
              headerName: "Reporter",
              cellRenderer: "tableUserCell",
            },
            {
              field: "reportedUser",
              headerName: "Reported User",
              cellRenderer: "tableUserCell",
            },
            { field: "reason", headerName: "Reason" },
            { field: "date", headerName: "Date" },
            {
              field: "action",
              headerName: "Action",
              maxWidth: 100,
              cellRenderer: "reportActionCell",
            },
          ]}
          rowData={[
            {
              reporter: "Alice",
              reportedUser: "Bob",
              reason: "Inappropriate Content",
              date: "2024-06-01",
              action: "Pending",
            },
            {
              reporter: "Charlie",
              reportedUser: "Dave",
              reason: "Harassment",
              date: "2024-06-02",
              action: "Under Review",
            },
            {
              reporter: "Eve",
              reportedUser: "Frank",
              reason: "Spam",
              date: "2024-06-03",
              action: "Resolved",
            },
            {
              reporter: "Grace",
              reportedUser: "Heidi",
              reason: "Fake Profile",
              date: "2024-06-04",
              action: "Pending",
            },
          ]}
        />
      </div>
    </div>
  )
}
