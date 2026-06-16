import {
  Users,
  Heart,
  CreditCard,
  DollarSign,
  UserCheck,
  AreaChart,
  CircleAlert,
  MessageCircle,
} from "lucide-react"

import { Card, CardTitle } from "@/components/ui/card"
import StatCard, { type Stat } from "@/components/shared/stat-card"
import { LineChartComp } from "@/components/charts/line-chart"
import { PieChartComp } from "@/components/charts/pie-chart"
import IconWrap from "@/components/common/icon-wrapper"
import { AreaChartComp } from "@/components/charts/area-chart"
import { BarChartComp } from "@/components/charts/bar-chart"
import { AgTable } from "@/components/shared/AgTable"
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart"
import { LegendAreaChart } from "@/components/charts/legend-area-chart"

export default function SuperAdminDashboard() {
  const stats: Stat[] = [
    { label: "Total Users", value: "24,582", change: "+12.5%", icon: Users },
    { label: "Active Matches", value: "8,341", change: "+8.2%", icon: Heart },
    {
      label: "Messages Today",
      value: "$128,490",
      change: "+23.1%",
      icon: MessageCircle,
    },
    {
      label: "Pending Reports",
      value: "12,047",
      change: "+5.4%",
      icon: CircleAlert,
      iconColor: "warning",
    },
  ]

  return (
    <div className="space-y-6">
      <StatCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* user vs matches graph */}
        <LegendAreaChart />
        
        {/* reports */}
        <HorizontalBarChart />

      </div>
        {/* recent users */}
        <AgTable
          title="Recent Users"
          columnDefs={[
            { field: "name", headerName: "Name", cellRenderer: "tableUserCell" },
            { field: "email", headerName: "Email" },
            { field: "joined", headerName: "Joined Date" },
            { field: "status", headerName: "Status" },
          ]}
          rowData={[
            {
              name: "John Doe",
              email: "john.doe@example.com",
              joined: "2023-10-01",
              status: "Active",
            },
          ]}
        />
    </div>
  )
}
