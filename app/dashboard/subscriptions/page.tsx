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
    </div>
  )
}
