"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { roles } from "@/navigation/roles"
import { setClientCookie } from "@/lib/cookie.client"

export default function RoleSelectionPage() {
  const router = useRouter()

  const handleRoleSelect = (slug: string) => {
    setClientCookie("selected_role", slug)
    router.push(`/dashboard/${slug}`)
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10 mx-auto w-full max-w-lg">
        {/* Role Cards */}
        <div className="grid gap-6 sm:grid-cols-1">
          {roles.map((role) => {
            return (
              <Button
                key={role.slug}
                onClick={() => handleRoleSelect(role.slug)}
              >
                {role.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
