import { Card } from "@/components/ui/card"
import IconWrap from "../common/icon-wrapper"

interface Stat {
  label: string
  value: string
  change: string
  icon?: React.ComponentType<{ className?: string }>
}

interface StatCardProps {
  stats: Stat[]
  className?: string
}

export type { Stat }

export default function StatCard({ stats, className }: StatCardProps) {
  return (
    <div
      className={className ?? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}
    >
      {stats.map((stat) => {
        const IconComponent = stat.icon
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
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
      })}
    </div>
  )
}
