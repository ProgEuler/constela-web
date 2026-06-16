import { AgTable } from "@/components/shared/AgTable"
import StatCard from "@/components/shared/stat-card"
import { Crown, DollarSign } from "lucide-react"

const data = [
  { label: "Active Subscriptions", value: "123", change: "12", icon: Crown },
  { label: "Premuim Plan", value: "1542", change: "23", icon: Crown },
  { label: "Basic Plan", value: "1542", change: "23", icon: Crown },
  { label: "Monthly Revenue", value: "1542", change: "23", icon: DollarSign },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <StatCard stats={data} />

      <AgTable
        columnDefs={[
          { field: "id", headerName: "ID" },
          {
            field: "name",
            headerName: "Name",
            cellRenderer: "tableUserCellWithEmail",
          },
          { field: "email", headerName: "Email" },
          { field: "plan", headerName: "Plan" },
          { field: "startDate", headerName: "Start Date" },
          { field: "endDate", headerName: "End Date" },
          { field: "amount", headerName: "Amount" },
          { field: "status", headerName: "Status" },
        ]}
        rowData={[
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            plan: "Premium",
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
