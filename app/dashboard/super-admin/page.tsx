import { Users, Heart, CreditCard, DollarSign, UserCheck, AreaChart } from "lucide-react"

import { Card, CardTitle } from "@/components/ui/card"
import StatCard from "@/components/shared/stat-card"
import { LineChartComp } from "@/components/charts/line-chart"
import { PieChartComp } from "@/components/charts/pie-chart"
import IconWrap from "@/components/common/icon-wrapper"
import { AreaChartComp } from "@/components/charts/area-chart"
import { BarChartComp } from "@/components/charts/bar-chart"

export default function SuperAdminDashboard() {
  const stats = [
    { label: "Total Users", value: "24,582", change: "+12.5%", icon: Users },
    { label: "Active Matches", value: "8,341", change: "+8.2%", icon: Heart },
    { label: "Revenue", value: "$128,490", change: "+23.1%", icon: DollarSign },
    {
      label: "Subscriptions",
      value: "12,047",
      change: "+5.4%",
      icon: CreditCard,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          return <StatCard key={stat.label} {...stat} />
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Registrations graph */}
        <LineChartComp />
        {/* User pie chart */}
        <PieChartComp />
        {/* activity list */}
        <Card className="p-4">
          <CardTitle>Real-time Activity</CardTitle>
          <div className="space-y-4">
            <div className="flex gap-4">
              <IconWrap>
                <UserCheck />
              </IconWrap>
              <div className="flex items-center gap-2">
                <span className="text-sm">New user registered</span>
                <span className="text-xs text-muted-foreground">
                  2 minutes ago
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <IconWrap>
                <UserCheck />
              </IconWrap>
              <div className="flex items-center gap-2">
                <span className="text-sm">New user registered</span>
                <span className="text-xs text-muted-foreground">
                  2 minutes ago
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <IconWrap>
                <UserCheck />
              </IconWrap>
              <div className="flex items-center gap-2">
                <span className="text-sm">New user registered</span>
                <span className="text-xs text-muted-foreground">
                  2 minutes ago
                </span>
              </div>
            </div>
          </div>
        </Card>
        {/* top countries */}
        <Card className="p-4">
            <CardTitle>Top Countries</CardTitle>
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <span className="text-sm">United States</span>
                  <span className="text-xs text-muted-foreground">35% of users</span>
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-sm">India</span>
                  <span className="text-xs text-muted-foreground">25% of users</span>
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-sm">United Kingdom</span>
                  <span className="text-xs text-muted-foreground">15% of users</span>
               </div>
            </div>
         </Card>
        {/* revenue graph */}
        <AreaChartComp />
        {/* reports bar chart */}
        <BarChartComp />
      </div>
    </div>
  )
}
