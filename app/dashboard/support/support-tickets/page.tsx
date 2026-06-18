"use client"

import { ArrowRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AgTable } from "@/components/shared/AgTable"
import { useRouter } from "next/navigation"

const allTickets = [
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

const myTickets = [
  {
    id: "0001",
    user: {
      name: "Sophie Martin",
      email: "sophie.m@email.com",
      initials: "SM",
      avatarBg: "bg-[#1e4640]",
    },
    subject: {
      title: "Cannot access premium features after payment",
      snippet:
        "Hi, I just paid for Premium Plus but my account still shows as free.",
    },
    received: "2 mins ago",
    priority: {
      label: "High",
      color:
        "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-500/20 dark:text-red-500 border-transparent",
    },
    status: "In Progress",
    statusColor:
      "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 border-transparent",
  },
]

export default function SupportDashboard() {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Tickets <Badge variant="secondary">4</Badge>
          </TabsTrigger>
          <TabsTrigger value="my">
            My Tickets <Badge variant="secondary">1</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved <Badge variant="secondary">0</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="m-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <AgTable
            gridOptions={{ rowHeight: 56 }}
            columnDefs={[
              {
                headerName: "User",
                field: "user",
                cellRenderer: "tableUserCell",
                maxWidth: 200,
              },
              {
                headerName: "Subject",
                field: "subject",
                flex: 1,
                minWidth: 700,
                cellRenderer: (params: {
                  value: { title: string; snippet: string }
                }) => (
                  <div className="flex flex-col">
                    <span className="truncate text-sm">
                      {params.value.title}
                    </span>
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
              {
                headerName: "Action",
                field: "action",
                cellRenderer: (params: { value: string }) => (
                  <Button>Assign to me</Button>
                ),
              },
            ]}
            rowData={allTickets.map((ticket) => ({
              user: ticket.user.name,
              subject: {
                title: ticket.subject.title,
                snippet: ticket.subject.snippet,
              },
              received: ticket.received,
              priority: ticket.priority,
              status: ticket.status,
              action: ticket.id,
            }))}
          />
        </TabsContent>

        <TabsContent
          value="my"
          className="m-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <AgTable
            gridOptions={{ rowHeight: 56 }}
            columnDefs={[
              {
                headerName: "User",
                field: "user",
                cellRenderer: "tableUserCell",
                maxWidth: 200,
              },
              {
                headerName: "Subject",
                field: "subject",
                flex: 1,
                minWidth: 700,
                cellRenderer: (params: {
                  value: { title: string; snippet: string }
                }) => (
                  <div className="flex flex-col">
                    <span className="truncate text-sm">
                      {params.value.title}
                    </span>
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
              {
                headerName: "Action",
                field: "action",
                cellRenderer: (params: { value: string }) => (
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/support/support-tickets/${params.value}`)
                    }
                  >
                    Open
                    <ArrowRight />
                  </Button>
                ),
              },
            ]}
            rowData={myTickets.map((ticket) => ({
              user: ticket.user.name,
              subject: {
                title: ticket.subject.title,
                snippet: ticket.subject.snippet,
              },
              received: ticket.received,
              priority: ticket.priority,
              status: ticket.status,
              action: ticket.id,
            }))}
          />
        </TabsContent>

        {/* Resolved */}
        <TabsContent
          value="resolved"
          className="m-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <AgTable
            gridOptions={{ rowHeight: 56 }}
            columnDefs={
              [
                //   {
                //     headerName: "User",
                //     field: "user",
                //     cellRenderer: "tableUserCell",
                //     maxWidth: 200,
                //   },
                //   {
                //     headerName: "Subject",
                //     field: "subject",
                //     flex: 1,
                //     minWidth: 700,
                //     cellRenderer: (params: {
                //       value: { title: string; snippet: string }
                //     }) => (
                //       <div className="flex flex-col">
                //         <span className="truncate text-sm">
                //           {params.value.title}
                //         </span>
                //         <span className="truncate text-xs text-muted-foreground">
                //           {params.value.snippet}
                //         </span>
                //       </div>
                //     ),
                //   },
                //   {
                //     headerName: "Received",
                //     field: "received",
                //     cellRenderer: (params: { value: string }) => (
                //       <div className="flex items-center gap-1.5 pt-3 text-xs font-medium text-muted-foreground">
                //         <Clock className="h-3.5 w-3.5" />
                //         {params.value}
                //       </div>
                //     ),
                //   },
                //   {
                //     headerName: "Priority",
                //     field: "priority",
                //     cellRenderer: (params: {
                //       value: { color: string; label: string }
                //     }) => (
                //       <Badge variant="outline" className={params.value.color}>
                //         {params.value.label}
                //       </Badge>
                //     ),
                //   },
                //   {
                //     headerName: "Status",
                //     field: "status",
                //     cellRenderer: (params: { value: string }) => (
                //       <Badge
                //         variant="secondary"
                //         className="border-transparent bg-muted/50 font-medium text-muted-foreground hover:bg-muted/60"
                //       >
                //         {params.value}
                //       </Badge>
                //     ),
                //   },
                //   {
                //     headerName: "Action",
                //     field: "action",
                //     cellRenderer: (params: { value: string }) => (
                //       <Button>
                //         Open
                //         <ArrowRight />
                //       </Button>
                //     ),
                //   },
              ]
            }
            rowData={[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
