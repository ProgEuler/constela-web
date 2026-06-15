"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Mail } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const allTickets = [
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

const myTickets = [
  {
    id: "0001",
    user: { name: "Sophie Martin", email: "sophie.m@email.com", initials: "SM", avatarBg: "bg-[#1e4640]" },
    subject: { title: "Cannot access premium features after payment", snippet: "Hi, I just paid for Premium Plus but my account still shows as free." },
    received: "2 mins ago",
    priority: { label: "High", color: "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-500/20 dark:text-red-500 border-transparent" },
    status: "In Progress",
    statusColor: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 border-transparent",
  }
]

export default function SupportDashboard() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  if (selectedTicketId) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedTicketId(null)} className="text-[#1e4640] hover:text-[#1e4640]/80 pl-0 gap-2 mb-2 hover:bg-transparent">
          <ArrowLeft className="h-4 w-4" /> Back to My Tickets <span className="text-muted-foreground font-normal ml-2">#0001</span>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-full flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold">Sophie Martin</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">sophie.m@email.com</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> 2 mins ago
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">SUBJECT</span>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-transparent shadow-none font-medium">High priority</Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-transparent shadow-none font-medium">In Progress</Badge>
            </div>

            <h2 className="text-lg font-bold">Cannot access premium features after payment</h2>

            <div className="bg-[#f8f6f3] dark:bg-muted/40 rounded-2xl p-5">
              <p className="text-[15px] text-foreground/90 leading-relaxed">
                Hi, I just paid for Premium Plus but my account still shows as free. The payment went through on my bank statement. Please help!
              </p>
            </div>
            <p className="text-xs text-muted-foreground px-2">Sophie Martin - 09:12</p>

            <Card className="p-4 shadow-sm border mt-8 rounded-xl">
              <Textarea 
                placeholder="Type your reply...&#10;It will be sent to user's email" 
                className="min-h-[120px] resize-none border-none shadow-none focus-visible:ring-0 px-2 py-1 text-[15px]" 
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Mail className="h-3.5 w-3.5" /> Reply will be sent to sophie.m@email.com
                </span>
                <div className="flex gap-3">
                  <Button variant="outline" className="text-emerald-700 cursor-pointer border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 rounded-full h-9 px-4 text-xs font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Mark as Resolved ✓
                  </Button>
                  <Button className="bg-[#85a39a] hover:bg-[#729288] cursor-pointer text-white rounded-full h-9 px-4 text-xs font-medium shadow-none">
                    Send Reply <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-8 text-center shadow-sm border rounded-xl flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-4">
                <AvatarFallback className="bg-[#1e4640] text-white text-xl font-medium">SM</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg leading-tight mb-1">Sophie Martin</h3>
              <p className="text-sm text-muted-foreground mb-6">sophie.m@email.com</p>
              
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-transparent shadow-none font-medium mb-4 rounded-full px-4">Active</Badge>
              <p className="text-[13px] text-muted-foreground mb-4">Joined March 2025</p>
              
              <Badge variant="outline" className="bg-[#fff1e7] text-[#e86f34] border-transparent shadow-none font-medium rounded-full px-4">Premium Plus</Badge>
            </Card>

            <Card className="p-6 shadow-sm border rounded-xl">
              <h3 className="font-bold text-sm mb-5">Ticket info</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ticket ID</span>
                  <span className="font-semibold text-foreground/90">#0001</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Received</span>
                  <span className="font-semibold text-foreground/90">2026-06-08 09:12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Priority</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-transparent shadow-none font-medium px-2 h-5 text-[10px]">High</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Messages</span>
                  <span className="font-semibold text-foreground/90">1</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const activeTabClasses = "data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#1e4640] data-[state=active]:text-[#1e4640] data-[state=active]:font-bold data-[state=active]:shadow-none"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Support Tickets</h1>
        <p className="text-muted-foreground text-sm">Assign tickets to yourself to start replying</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start rounded-none p-0 h-auto gap-8 border-b border-border/50 bg-transparent">
          <TabsTrigger value="all" className={`relative cursor-pointer pb-3 pt-2 rounded-none bg-transparent gap-2 px-0 font-medium text-[15px] text-muted-foreground hover:text-foreground ${activeTabClasses}`}>
            All Tickets <Badge variant="secondary" className="bg-[#e86f34] hover:bg-[#e86f34] text-white rounded-full px-1.5 h-5 text-[10px] min-w-[20px] flex items-center justify-center border-transparent shadow-none font-bold">4</Badge>
          </TabsTrigger>
          <TabsTrigger value="my" className={`relative cursor-pointer pb-3 pt-2 rounded-none bg-transparent gap-2 px-0 font-medium text-[15px] text-muted-foreground hover:text-foreground ${activeTabClasses}`}>
            My Tickets <Badge variant="secondary" className="bg-[#1e4640] hover:bg-[#1e4640] text-white rounded-full px-1.5 h-5 text-[10px] min-w-[20px] flex items-center justify-center border-transparent shadow-none font-bold">1</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className={`relative cursor-pointer pb-3 pt-2 rounded-none bg-transparent gap-2 px-0 font-medium text-[15px] text-muted-foreground hover:text-foreground ${activeTabClasses}`}>
            Resolved <Badge variant="secondary" className="bg-[#a1a1aa] hover:bg-[#a1a1aa] text-white rounded-full px-1.5 h-5 text-[10px] min-w-[20px] flex items-center justify-center border-transparent shadow-none font-bold">1</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm overflow-hidden rounded-xl bg-white">
            <Table>
              <TableHeader className="bg-transparent hover:bg-transparent">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">USER</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground tracking-wider h-11">SUBJECT</TableHead>
                  <TableHead className="w-[140px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">RECEIVED</TableHead>
                  <TableHead className="w-[100px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">PRIORITY</TableHead>
                  <TableHead className="w-[120px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">STATUS</TableHead>
                  <TableHead className="w-[140px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-muted/20">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-muted/50">
                          <AvatarFallback className={`text-white text-xs font-medium ${ticket.user.avatarBg}`}>
                            {ticket.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px]">{ticket.user.name}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5">{ticket.user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col max-w-[400px]">
                        <span className="font-semibold text-[13px] truncate text-foreground/90">{ticket.subject.title}</span>
                        <span className="text-[12px] text-muted-foreground truncate mt-0.5">{ticket.subject.snippet}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-[12px] text-muted-foreground gap-1.5 font-medium">
                        <Clock className="h-3 w-3" />
                        {ticket.received}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`${ticket.priority.color} shadow-none font-medium h-5 px-2 text-[10px]`}>
                        {ticket.priority.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className="bg-muted/50 text-muted-foreground hover:bg-muted/60 border-transparent font-medium shadow-none h-5 px-2 text-[10px]">
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button className="bg-[#1e4640] hover:bg-[#15342f] cursor-pointer text-white rounded-full h-8 px-4 text-xs font-medium shadow-none">
                        Assign to me
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm overflow-hidden rounded-xl bg-white">
            <Table>
              <TableHeader className="bg-transparent hover:bg-transparent">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">USER</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground tracking-wider h-11">SUBJECT</TableHead>
                  <TableHead className="w-[140px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">RECEIVED</TableHead>
                  <TableHead className="w-[100px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">PRIORITY</TableHead>
                  <TableHead className="w-[120px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">STATUS</TableHead>
                  <TableHead className="w-[140px] text-[11px] font-semibold text-muted-foreground tracking-wider h-11">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-muted/20">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-muted/50">
                          <AvatarFallback className={`text-white text-xs font-medium ${ticket.user.avatarBg}`}>
                            {ticket.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px]">{ticket.user.name}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5">{ticket.user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col max-w-[400px]">
                        <span className="font-semibold text-[13px] truncate text-foreground/90">{ticket.subject.title}</span>
                        <span className="text-[12px] text-muted-foreground truncate mt-0.5">{ticket.subject.snippet}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-[12px] text-muted-foreground gap-1.5 font-medium">
                        <Clock className="h-3 w-3" />
                        {ticket.received}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`${ticket.priority.color} shadow-none font-medium h-5 px-2 text-[10px]`}>
                        {ticket.priority.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`${ticket.statusColor} shadow-none font-medium h-5 px-2 text-[10px]`}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button 
                        variant="outline" 
                        className="rounded-full cursor-pointer h-8 px-4 text-xs font-medium shadow-none border-border text-[#1e4640] hover:text-[#1e4640]/80 hover:bg-muted/50"
                        onClick={() => setSelectedTicketId(ticket.id)}
                      >
                        Open <ArrowRight className="h-3 w-3 ml-1.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm p-8 text-center text-muted-foreground rounded-xl bg-white">
            No resolved tickets.
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
