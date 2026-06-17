import { CheckCircle2, Clock, Inbox, MessageSquare } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function OverviewDashboard() {
  const stats = [
    {
      label: "Unread",
      value: "2",
      icon: Inbox,
      iconBg: "bg-orange-50 dark:bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      label: "Replied",
      value: "2",
      icon: MessageSquare,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      label: "Resolved",
      value: "2",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      label: "Total",
      value: "8",
      icon: Clock,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-500 dark:text-gray-400",
    },
  ]

  const tickets = [
    {
      id: "1",
      user: { name: "John Davis", email: "john.davis@email.com", initials: "JD", avatarBg: "bg-orange-500" },
      subject: { title: "App crashes every time I try to log in on iOS", snippet: "The app crashes immediately on launch since the last update on ii..." },
      received: "28 mins ago",
      priority: { label: "Medium", color: "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-500/20 dark:text-amber-500 border-transparent" },
      status: "Unassigned",
    },
    {
      id: "2",
      user: { name: "Emma Wilson", email: "emma.w@email.com", initials: "EW", avatarBg: "bg-purple-500" },
      subject: { title: "My match from yesterday has disappeared", snippet: "I had a match with someone yesterday and we were chatting, but..." },
      received: "16 hrs ago",
      priority: { label: "Low", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-500/20 dark:text-emerald-500 border-transparent" },
      status: "Unassigned",
    },
    {
      id: "3",
      user: { name: "Marie Curie", email: "marie.c@email.com", initials: "MC", avatarBg: "bg-amber-500" },
      subject: { title: "Profile photos not loading on other users' feeds", snippet: "My profile photos seem to not be showing up. Friends told me the..." },
      received: "22 hrs ago",
      priority: { label: "Low", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-500/20 dark:text-emerald-500 border-transparent" },
      status: "Unassigned",
    },
    {
      id: "4",
      user: { name: "Pierre Vidal", email: "pierre.v@email.com", initials: "PV", avatarBg: "bg-red-500" },
      subject: { title: "Account incorrectly suspended — please review", snippet: "My account was suspended but I have not violated any rules. This..." },
      received: "1 day ago",
      priority: { label: "High", color: "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-500/20 dark:text-red-500 border-transparent" },
      status: "Unassigned",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Support Inbox</h1>
        <p className="text-muted-foreground text-sm">All messages sent by users through the app's Contact & Support section</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="flex items-center gap-4 p-6 border shadow-sm">
              <div className={`flex items-center justify-center rounded-full w-12 h-12 ${stat.iconBg} ${stat.iconColor}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold leading-none mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">Recent Tickts</h2>
        <Card className="border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[250px] text-xs font-semibold text-muted-foreground">USER</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">SUBJECT</TableHead>
                <TableHead className="w-[150px] text-xs font-semibold text-muted-foreground">RECEIVED</TableHead>
                <TableHead className="w-[100px] text-xs font-semibold text-muted-foreground">PRIORITY</TableHead>
                <TableHead className="w-[120px] text-xs font-semibold text-muted-foreground">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-muted">
                        <AvatarFallback className={`text-white text-xs font-medium ${ticket.user.avatarBg}`}>
                          {ticket.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{ticket.user.name}</span>
                        <span className="text-xs text-muted-foreground">{ticket.user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col max-w-[500px]">
                      <span className="font-semibold text-sm truncate text-foreground/90">{ticket.subject.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{ticket.subject.snippet}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {ticket.received}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={ticket.priority.color}>
                      {ticket.priority.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-muted/50 text-muted-foreground hover:bg-muted/60 border-transparent font-medium">
                      {ticket.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
