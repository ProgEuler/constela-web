import { Shield, Users, Heart, CreditCard, DollarSign, Signal, MessageSquare, Settings } from "lucide-react"

import { Card } from "@/components/ui/card"

export default function SuperAdminDashboard() {
  const stats = [
    { label: "Total Users", value: "24,582", change: "+12.5%", icon: Users },
    { label: "Active Matches", value: "8,341", change: "+8.2%", icon: Heart },
    { label: "Revenue", value: "$128,490", change: "+23.1%", icon: DollarSign },
    { label: "Subscriptions", value: "12,047", change: "+5.4%", icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Full platform oversight and system management.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{stat.change} from last month</p>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Recent Reports</h2>
          <p className="text-sm text-muted-foreground">12 new reports flagged in the last 24 hours</p>
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Pending Moderation</h2>
          <p className="text-sm text-muted-foreground">47 items awaiting review</p>
        </Card>
      </div>
    </div>
  )
}
