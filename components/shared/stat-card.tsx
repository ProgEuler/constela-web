import { Card } from "@/components/ui/card"
import IconWrap from "../common/icon-wrapper"

interface stat {
  label: string
  value: string
  change: string
  icon?: React.ComponentType<{ className?: string }>
}

export default function StatCard(stat: stat) {
  const IconComponent = stat.icon
  return (
    <Card key={stat.label} className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{stat.label}</span>
        <IconWrap>
          {IconComponent ? <IconComponent /> : null}
        </IconWrap>
      </div>
      <p className="mt-2 text-2xl font-bold">{stat.value}</p>
      <p className="text-xs text-emerald-600 dark:text-emerald-400">
        {stat.change} from last month
      </p>
    </Card>
  )
}
