import { AgTable } from "@/components/shared/AgTable"
import StatCard, { type Stat } from "@/components/shared/stat-card"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { CheckCircle, Eye, Flag, UserMinus } from "lucide-react"

const data: Stat[] = [
  { label: "Reports Received", value: "123", change: "12", icon: Flag },
  {
    label: "Reports in Review",
    value: "1542",
    change: "23",
    icon: Eye,
    iconColor: "warning",
  },
  {
    label: "Actions Taken",
    value: "1542",
    change: "23",
    icon: CheckCircle,
    iconColor: "success",
  },
  {
    label: "Suspended Users",
    value: "1542",
    change: "23",
    icon: UserMinus,
    iconColor: "destructive",
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <StatCard stats={data} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">24</div>
          <div>Waiting in queue</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">24</div>
          <div>Assigned to moderators</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">24</div>
          <div>Closed today</div>
        </Card>
      </div>

      {/* Moderator activity */}
      <AgTable
        title="Moderator Activity"
        columnDefs={[
          { field: "id", headerName: "ID" },
          {
            field: "moderator",
            headerName: "Moderator",
            cellRenderer: "tableUserCell",
          },
          { field: "assignment", headerName: "Assignment" },
          { field: "resolvedReports", headerName: "Resolved Reports" },
          { field: "pendingReports", headerName: "Pending Reports" },
        ]}
        rowData={[
          {
            id: 1,
            moderator: "John Doe",
            assignment: "Content Review",
            resolvedReports: 42,
            pendingReports: 5,
          },
        ]}
      />

      <AgTable
        title="Reports Assignment"
        columnDefs={[
          { field: "reportId", headerName: "Report ID" },
          {
            field: "reportedUser",
            headerName: "Reported User",
            cellRenderer: "tableUserCell",
          },
          { field: "reason", headerName: "Reason" },
          { field: "priority", headerName: "Priority" },
          {
            field: "assignTo",
            headerName: "Assign To",
            cellRenderer: "tableUserCell",
          },
          { field: "status", headerName: "Status" },
        ]}
        rowData={[
          {
            reportId: 1,
            reportedUser: "John Doe",
            reason: "Spam",
            priority: "High",
            assignTo: "Jane Smith",
            startDate: "2023-10-01",
            endDate: "2024-10-01",
            amount: "$19.99",
            status: "Active",
          },
        ]}
      />
    </div>
  )
}
