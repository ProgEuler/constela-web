"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function SupportBox() {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-2 gap-2 pl-0"
      >
        <ArrowLeft className="h-4 w-4" /> Back to My Tickets{" "}
        <span className="ml-2 font-normal text-muted-foreground">#0001</span>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Sophie Martin</h1>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  sophie.m@email.com
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> 2 mins ago
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-4">
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              SUBJECT
            </span>
            <Badge
              variant="outline"
              className="border-transparent bg-red-50 font-medium text-red-700 shadow-none"
            >
              High priority
            </Badge>
            <Badge
              variant="outline"
              className="border-transparent bg-emerald-50 font-medium text-emerald-700 shadow-none"
            >
              In Progress
            </Badge>
          </div>

          <h2 className="text-lg font-bold">
            Cannot access premium features after payment
          </h2>

          <div className="rounded-2xl bg-[#f8f6f3] p-5 dark:bg-muted/40">
            <p className="text-[15px] leading-relaxed text-foreground/90">
              Hi, I just paid for Premium Plus but my account still shows as
              free. The payment went through on my bank statement. Please help!
            </p>
          </div>
          <p className="px-2 text-xs text-muted-foreground">
            Sophie Martin - 09:12
          </p>

          <Card className="mt-8 rounded-xl border p-4 shadow-sm">
            <Textarea
              placeholder="Type your reply...&#10;It will be sent to user's email"
              className="min-h-[120px] resize-none border-none px-2 py-1 text-[15px] shadow-none focus-visible:ring-0"
            />
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> Reply will be sent to
                sophie.m@email.com
              </span>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="h-9 cursor-pointer rounded-full border-emerald-200 px-4 text-xs font-medium text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Mark as
                  Resolved ✓
                </Button>
                <Button className="h-9 cursor-pointer rounded-full bg-[#85a39a] px-4 text-xs font-medium text-white shadow-none hover:bg-[#729288]">
                  Send Reply <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="flex flex-col items-center rounded-xl border p-8 text-center shadow-sm">
            <Avatar className="mb-4 h-16 w-16">
              <AvatarFallback className="bg-[#1e4640] text-xl font-medium text-white">
                SM
              </AvatarFallback>
            </Avatar>
            <h3 className="mb-1 text-lg leading-tight font-bold">
              Sophie Martin
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              sophie.m@email.com
            </p>

            <Badge
              variant="outline"
              className="mb-4 rounded-full border-transparent bg-emerald-50 px-4 font-medium text-emerald-700 shadow-none"
            >
              Active
            </Badge>
            <p className="mb-4 text-[13px] text-muted-foreground">
              Joined March 2025
            </p>

            <Badge
              variant="outline"
              className="rounded-full border-transparent bg-[#fff1e7] px-4 font-medium text-[#e86f34] shadow-none"
            >
              Premium Plus
            </Badge>
          </Card>

          <Card className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-5 text-sm font-bold">Ticket info</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ticket ID</span>
                <span className="font-semibold text-foreground/90">#0001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Received</span>
                <span className="font-semibold text-foreground/90">
                  2026-06-08 09:12
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Priority</span>
                <Badge
                  variant="outline"
                  className="h-5 border-transparent bg-red-50 px-2 text-[10px] font-medium text-red-700 shadow-none"
                >
                  High
                </Badge>
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
