import StatCard from "@/components/shared/stat-card"
import { Heart, TrendingUp } from "lucide-react"

const data = [
  { label: "Total Matches", value: "1,234", change: "+5.6%", icon: Heart },
  { label: "Active Matches", value: "567", change: "+3.2%", icon: Heart },
  { label: "Matches Today", value: "890", change: "+8.1%", icon: Heart },
  {
    label: "Avg Message/Match",
    value: "123",
    change: "-2.4%",
    icon: TrendingUp,
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <StatCard stats={data} />
    </div>
  )
}
