import { LoginForm } from "@workspace/ui/components/auth"

export default function LoginPage() {
  return (
    <LoginForm
      appName="Admin"
      brandName="E-Broker Admin"
      redirectTo="/dashboard"
    />
  )
}
