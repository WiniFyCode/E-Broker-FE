import { RegisterForm } from "@workspace/ui/components/auth"

export default function RegisterPage() {
  return (
    <RegisterForm
      appName="Admin"
      brandName="E-Broker Admin"
      redirectTo="/dashboard"
      title="Set up your admin account"
      description="Let's get you access to the control center"
      heroTitle="Take control"
      heroDescription="Create your admin account to manage the platform, oversee users, and keep everything running smoothly."
    />
  )
}
