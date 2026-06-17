"use client"

import { useState } from "react"
import { CircleCheck, Clock, OctagonX } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import StatCard from "@/components/shared/stat-card"

import { UserReviewCard } from "./_components/user-review-card"
import { VerificationPanel } from "./_components/verification-panel"
import {
  pendingUsers,
  verifiedUsers,
  rejectedUsers,
  type VerificationUser,
} from "./_components/verification-data"

export default function PhotoVerificationPage() {
  const [selectedUser, setSelectedUser] = useState<VerificationUser | undefined>(
    pendingUsers[0]
  )

  // Simulate review actions by moving users between lists
  const handleVerify = (user: VerificationUser) => {
    // In a real app, this would call an API
    setSelectedUser(pendingUsers[0] ?? verifiedUsers[0])
  }

  const handleReject = (user: VerificationUser) => {
    setSelectedUser(pendingUsers[0] ?? verifiedUsers[0])
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <StatCard
        stats={[
          {
            label: "Pending",
            value: String(pendingUsers.length),
            change: "+2",
            icon: Clock,
            iconColor: "warning",
          },
          {
            label: "Verified",
            value: String(verifiedUsers.length),
            change: "+12",
            icon: CircleCheck,
            iconColor: "success",
          },
          {
            label: "Rejected",
            value: String(rejectedUsers.length),
            change: "-1",
            icon: OctagonX,
            iconColor: "destructive",
          },
        ]}
      />

      {/* Tabs */}
      <Tabs
        defaultValue="pending"
        onValueChange={(value) => {
          if (value === "pending") setSelectedUser(pendingUsers[0] ?? undefined)
          else setSelectedUser(verifiedUsers[0] ?? undefined)
        }}
      >
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            Pending
          </TabsTrigger>
          <TabsTrigger value="verified" className="gap-2">
            Verified
          </TabsTrigger>
        </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
            {/* Left: User list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {pendingUsers.length} users to review
                </span>
              </div>
              <div className="flex flex-col gap-2 max-h-[600px]">
                {pendingUsers.map((user) => (
                  <UserReviewCard
                    key={user.id}
                    user={user}
                    selected={selectedUser?.id === user.id}
                    onSelect={setSelectedUser}
                  />
                ))}
              </div>
            </div>

            {/* Right: Verification panel */}
            <div className="min-w-0">
              {selectedUser?.status === "pending" ? (
                <VerificationPanel
                  user={selectedUser}
                  onVerify={handleVerify}
                  onReject={handleReject}
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">
                    Select a pending user to review
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Verified Tab */}
        <TabsContent value="verified">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
            {/* Left: User list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {verifiedUsers.length} verified users
                </span>
              </div>
              <div className="flex flex-col gap-2 max-h-[600px]">
                {verifiedUsers.map((user) => (
                  <UserReviewCard
                    key={user.id}
                    user={user}
                    selected={selectedUser?.id === user.id}
                    onSelect={setSelectedUser}
                  />
                ))}
              </div>
            </div>

            {/* Right: Verification panel (read-only for verified) */}
            <div className="min-w-0">
              {selectedUser?.status === "verified" ? (
                <VerificationPanel
                  user={selectedUser}
                  onVerify={handleVerify}
                  onReject={handleReject}
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">
                    Select a verified user to view
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
