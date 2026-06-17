"use client"
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
import StatCard, { Stat } from "@/components/shared/stat-card"
import { AgTable } from "@/components/shared/AgTable"

export default function OverviewDashboard() {
  const stats: Stat[] = [
    {
      label: "Unread",
      value: "2",
      icon: Inbox,
      iconColor: "warning",
    },
    {
      label: "Replied",
      value: "2",
      icon: MessageSquare,
    },
    {
      label: "Resolved",
      value: "2",
      icon: CheckCircle2,
    },
    {
      label: "Total",
      value: "8",
      icon: Clock,
    },
  ]

  const tickets = [
    {
      id: "1",
      user: {
        name: "John Davis",
        email: "john.davis@email.com",
        initials: "JD",
        avatarBg: "bg-orange-500",
      },
      subject: {
        title: "App crashes every time I try to log in on iOS",
        snippet:
          "The app crashes immediately on launch since the last update on ii...",
      },
      received: "28 mins ago",
      priority: {
        label: "Medium",
        color:
          "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-500/20 dark:text-amber-500 border-transparent",
      },
      status: "Unassigned",
    },
    {
      id: "2",
      user: {
        name: "Emma Wilson",
        email: "emma.w@email.com",
        initials: "EW",
        avatarBg: "bg-purple-500",
      },
      subject: {
        title: "My match from yesterday has disappeared",
        snippet:
          "I had a match with someone yesterday and we were chatting, but...",
      },
      received: "16 hrs ago",
      priority: {
        label: "Low",
        color:
          "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-500/20 dark:text-emerald-500 border-transparent",
      },
      status: "Unassigned",
    },
    {
      id: "3",
      user: {
        name: "Marie Curie",
        email: "marie.c@email.com",
        initials: "MC",
        avatarBg: "bg-amber-500",
      },
      subject: {
        title: "Profile photos not loading on other users' feeds",
        snippet:
          "My profile photos seem to not be showing up. Friends told me the...",
      },
      received: "22 hrs ago",
      priority: {
        label: "Low",
        color:
          "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-500/20 dark:text-emerald-500 border-transparent",
      },
      status: "Unassigned",
    },
    {
      id: "4",
      user: {
        name: "Pierre Vidal",
        email: "pierre.v@email.com",
        initials: "PV",
        avatarBg: "bg-red-500",
      },
      subject: {
        title: "Account incorrectly suspended — please review",
        snippet:
          "My account was suspended but I have not violated any rules. This...",
      },
      received: "1 day ago",
      priority: {
        label: "High",
        color:
          "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-500/20 dark:text-red-500 border-transparent",
      },
      status: "Unassigned",
    },
  ]

  return (
    <div className="space-y-6">
      <StatCard stats={stats} />

      <AgTable
        title="Recent tickets"
        gridOptions={{rowHeight: 56}}
        columnDefs={[
          { headerName: "User", field: "user", cellRenderer: "tableUserCell", maxWidth: 200 },
          {
            headerName: "Subject",
            field: "subject",
            flex: 1,
            minWidth: 800,
            cellRenderer: (params: {
              value: { title: string; snippet: string }
            }) => (
              <div className="flex flex-col">
                <span className="truncate text-sm">{params.value.title}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {params.value.snippet}
                </span>
              </div>
            ),
          },
          {
            headerName: "Received",
            field: "received",
            cellRenderer: (params: { value: string }) => (
              <div className="flex items-center gap-1.5 pt-3 text-xs font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {params.value}
              </div>
            ),
          },
          {
            headerName: "Priority",
            field: "priority",
            cellRenderer: (params: {
              value: { color: string; label: string }
            }) => (
              <Badge variant="outline" className={params.value.color}>
                {params.value.label}
              </Badge>
            ),
          },
          {
            headerName: "Status",
            field: "status",
            cellRenderer: (params: { value: string }) => (
              <Badge
                variant="secondary"
                className="border-transparent bg-muted/50 font-medium text-muted-foreground hover:bg-muted/60"
              >
                {params.value}
              </Badge>
            ),
          },
        ]}
        rowData={tickets.map((ticket) => ({
          user: ticket.user.name,
          subject: {
            title: ticket.subject.title,
            snippet: ticket.subject.snippet,
          },
          received: ticket.received,
          priority: ticket.priority,
          status: ticket.status,
        }))}
      />
    </div>
  )
}
