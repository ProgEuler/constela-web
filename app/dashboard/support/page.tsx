import { ClipboardList, TicketCheck } from "lucide-react"

import { Card } from "@/components/ui/card"

export default function SupportDashboard() {
  const stats = [
    { label: "Open Tickets", value: "47", change: "+8 from yesterday", icon: TicketCheck },
    { label: "Resolved Today", value: "23", change: "92% satisfaction", icon: ClipboardList },
    { label: "Avg Response Time", value: "4.2m", change: "12% faster", icon: TicketCheck },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support Dashboard</h1>
        <p className="text-muted-foreground">View and respond to support tickets and user inquiries.</p>
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
          <h2 className="mb-2 font-semibold">Priority Tickets</h2>
          <p className="text-sm text-muted-foreground">8 high-priority tickets requiring immediate attention</p>
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">Latest responses and ticket updates</p>
        </Card>
      </div>
    </div>
  )
}
