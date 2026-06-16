import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

type TableUserCellProps = {
  name: string
  description?: string
}

type TableUserCellRendererParams = {
  value?: unknown
  data?: {
    email?: unknown
  } | null
}

export function TableUserCell({ name, description }: TableUserCellProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="bg-muted text-muted-foreground">
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-foreground">
          {name}
        </div>
        {description ? (
          <div className="truncate text-sm text-muted-foreground">
            {description}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function renderTableUserCell(params: TableUserCellRendererParams) {
  return <TableUserCell name={String(params.value ?? "")} />
}

export function renderTableUserCellWithEmail(
  params: TableUserCellRendererParams
) {
  return (
    <TableUserCell
      name={String(params.value ?? "")}
      description={String(params.data?.email ?? "")}
    />
  )
}
