import { Users, Heart, MessageSquare, Shield } from "lucide-react"

import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "24,582", change: "+12.5%", icon: Users },
    { label: "Active Matches", value: "8,341", change: "+8.2%", icon: Heart },
    { label: "Messages Today", value: "1,204", change: "+3.7%", icon: MessageSquare },
    { label: "Flagged Content", value: "47", change: "-5.2%", icon: Shield },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, matches, and platform content.</p>
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
          <h2 className="mb-2 font-semibold">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">342 new user registrations today</p>
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Pending Reviews</h2>
          <p className="text-sm text-muted-foreground">23 moderation actions needed</p>
        </Card>
      </div>
    </div>
  )
}
