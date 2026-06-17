"use client"

import * as React from "react"
import { Check, Save, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getInitials } from "@/lib/utils"

type ProfileFormProps = {
  initialName?: string
  initialEmail?: string
  role?: string
  onSave?: (data: {
    name: string
    currentPassword: string
    newPassword: string
  }) => void
}

export function ProfileForm({
  initialName = "",
  initialEmail = "",
  role = "Admin",
  onSave,
}: ProfileFormProps) {
  const [name, setName] = React.useState(initialName)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "saving" | "saved">(
    "idle"
  )

  React.useEffect(() => {
    if (status !== "saved") return
    const timer = setTimeout(() => setStatus("idle"), 2200)
    return () => clearTimeout(timer)
  }, [status])

  const previewName = name.trim() || initialName || "Admin User"
  const previewEmail = initialEmail || "admin@example.com"

  const newPasswordValid = newPassword.length === 0 || newPassword.length >= 8
  const passwordsMatch = newPassword === confirmPassword
  const canSave =
    name.trim().length > 0 &&
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    passwordsMatch

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSave) return
    setStatus("saving")
    onSave?.({ name: name.trim(), currentPassword, newPassword })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setStatus("saved")
  }

  return (
    <div className="mx-auto w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar
              size="lg"
              className="bg-emerald-700 text-white [&_[data-slot=avatar-fallback]]:bg-emerald-700 [&_[data-slot=avatar-fallback]]:text-white"
            >
              <AvatarFallback className="font-medium">
                {getInitials(previewName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg">Profile Settings</CardTitle>
              <CardDescription>
                Update your admin profile and password
              </CardDescription>
              <Badge variant="secondary" className="mt-1 w-fit">
                {role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Signed in as</span>
              <span className="truncate font-medium">{previewEmail}</span>
            </div>

            <Field>
              <FieldLabel htmlFor="profile-name">
                Full Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="profile-name"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="profile-current-password">
                Current Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="profile-current-password"
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
              />
              <FieldDescription>
                Required to confirm any changes to your account.
              </FieldDescription>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="profile-new-password">
                  New Password <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="profile-new-password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  aria-invalid={!newPasswordValid}
                />
                {!newPasswordValid ? (
                  <FieldDescription>
                    Password must be at least 8 characters.
                  </FieldDescription>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="profile-confirm-password">
                  Confirm New Password{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="profile-confirm-password"
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  aria-invalid={confirmPassword.length > 0 && !passwordsMatch}
                />
                {confirmPassword.length > 0 && !passwordsMatch ? (
                  <FieldDescription>Passwords do not match.</FieldDescription>
                ) : null}
              </Field>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" />
                Your changes are protected with your current password.
              </div>
              <Button type="submit" disabled={!canSave || status === "saving"}>
                {status === "saved" ? (
                  <>
                    <Check />
                    Saved
                  </>
                ) : (
                  <>
                    <Save />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
