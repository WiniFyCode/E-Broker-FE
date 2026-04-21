import { LoginForm } from "@workspace/ui/components/auth"

export default function LoginPage() {
  return (
    <LoginForm
      appName="Admin"
      brandName="E-Broker Admin"
      redirectTo="/dashboard"
      title="Welcome back, Admin"
      description="Let's get you into the control center"
      heroTitle="Manage with ease"
      heroDescription="Access your dashboard to oversee users, courses, and keep everything running smoothly."
    />
  )
}
