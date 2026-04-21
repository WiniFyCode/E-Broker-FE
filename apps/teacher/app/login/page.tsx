import { LoginForm } from "@workspace/ui/components/auth"

export default function LoginPage() {
  return (
    <LoginForm
      appName="Teacher"
      brandName="E-Broker Teacher"
      redirectTo="/"
      title="Welcome back, Teacher!"
      description="Ready to inspire? Let's get you signed in."
      heroTitle="Continue teaching"
      heroDescription="Access your courses, check on your students, and keep sharing your knowledge."
    />
  )
}
