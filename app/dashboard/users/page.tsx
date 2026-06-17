"use client"
import { AgTable } from "@/components/shared/AgTable"
import { users } from "./_components/data"
import { UserActionsCell } from "./_components/user-actions-cell"

export default function Page() {
  return (
    <div className="space-y-4">
      <AgTable
        height={800}
        components={{ userActionsCell: UserActionsCell }}
        columnDefs={[
          { field: "name", headerName: "User", cellRenderer: "tableUserCell", minWidth: 160 },
          { field: "id", headerName: "ID", maxWidth: 80 },
          { field: "email", headerName: "Email", minWidth: 220 },
          { field: "location", headerName: "Location", minWidth: 220 },
          { field: "subscription", headerName: "Subscription" },
          { field: "status", headerName: "Status" },
          { field: "joinedDate", headerName: "Joined Date" },
          { field: "lastActive", headerName: "Last Active" },
          {
            field: "actions",
            headerName: "Actions",
            maxWidth: 90,
            sortable: false,
            filter: false,
            cellRenderer: "userActionsCell",
            cellClass: "flex items-center justify-center",
          },
        ]}
        rowData={users}
      />
    </div>
  )
}
