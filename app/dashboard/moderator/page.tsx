import { Camera, Eye, Signal } from "lucide-react"

import { Card } from "@/components/ui/card"

export default function ModeratorDashboard() {
  const stats = [
    { label: "Open Reports", value: "156", change: "+12 today", icon: Signal },
    { label: "Pending Verification", value: "89", change: "34 reviewed today", icon: Camera },
    { label: "Resolved Today", value: "43", change: "+15% efficiency", icon: Eye },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Moderator Dashboard</h1>
        <p className="text-muted-foreground">Review reports, verify photos, and monitor platform activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{stat.change}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Recent Reports</h2>
          <p className="text-sm text-muted-foreground">12 new content reports requiring review</p>
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Photo Queue</h2>
          <p className="text-sm text-muted-foreground">89 profile photos awaiting verification</p>
        </Card>
      </div>
    </div>
  )
}
