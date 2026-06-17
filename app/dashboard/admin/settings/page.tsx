import { ProfileForm } from "./_components/profile-form"

export default function Page() {
  return (
    <div className="space-y-6">
      <ProfileForm
        initialName="John Doe"
        initialEmail="john.doe@example.com"
        role="Admin"
      />
    </div>
  )
}
