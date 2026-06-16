import { AgTable } from "@/components/shared/AgTable"
import StatCard, { type Stat } from "@/components/shared/stat-card"
import { CircleAlert, DollarSign, RefreshCcw } from "lucide-react"

const data: Stat[] = [
  { label: "Total Payments", value: "123", change: "12", icon: DollarSign },
  {
    label: "Monthly Revenue",
    value: "1542",
    change: "23",
    icon: DollarSign,
    iconColor: "success",
  },
  {
    label: "Pending Disputes",
    value: "1542",
    change: "23",
    icon: CircleAlert,
    iconColor: "warning",
  },
  {
    label: "Refunds issued",
    value: "1542",
    change: "23",
    icon: RefreshCcw,
    iconColor: "destructive",
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <StatCard stats={data} />

      <AgTable
        columnDefs={[
          {
            field: "user",
            headerName: "User",
            cellRenderer: "tableUserCell",
          },
          { field: "transactionId", headerName: "Transaction ID" },
          { field: "amount", headerName: "Amount" },
          { field: "plan", headerName: "Plan" },
          { field: "date", headerName: "Date" },
          { field: "status", headerName: "Status" },
          { field: "paymentMethod", headerName: "Payment Method" },
        ]}
        rowData={[
          {
            user: "John Doe",
            transactionId: "TXN001",
            amount: "$19.99",
            plan: "Premium",
            date: "2023-10-01",
            status: "Active",
            paymentMethod: "Credit Card",
          },
        ]}
      />
    </div>
  )
}
