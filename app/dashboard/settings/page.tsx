"use client"
import { AgTable } from "@/components/shared/AgTable"
import { Button } from "@/components/ui/button"
import { AddAdminDialog } from "./_components/add-admin"
import { EditAdminDialog, type AdminUser } from "./_components/edit-admin"

type AdminRow = {
  id: string
  user: string
  email: string
  role: AdminUser["role"]
  status: string
  lastLogin: string,
   actions: string
}

const adminRows: AdminRow[] = [
  {
    id: "1",
    user: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    lastLogin: "2023-10-01 10:30:00",
    status: "Active",
    actions: "",
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Admin Accounts Management</h2>
        <AddAdminDialog />
      </div>
      <AgTable<AdminRow>
        columnDefs={[
          {
            field: "user",
            headerName: "User",
            cellRenderer: "tableUserCell",
          },
          { field: "email", headerName: "Email" },
          { field: "role", headerName: "Role" },
          { field: "status", headerName: "Status" },
          { field: "lastLogin", headerName: "Last Login" },
          {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filter: false,
            cellRenderer: (params: { data?: AdminRow }) => {
              const row = params.data
              if (!row) return null
              return (
                <div className="flex items-center gap-2">
                  <EditAdminDialog
                    admin={{
                      id: row.id,
                      name: row.user,
                      email: row.email,
                      role: row.role,
                    }}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>
              )
            },
          },
        ]}
        rowData={adminRows}
      />
    </div>
  )
}
