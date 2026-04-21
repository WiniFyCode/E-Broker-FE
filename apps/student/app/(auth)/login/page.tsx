import { LoginForm } from "@workspace/ui/components/auth"

export default function LoginPage() {
  return (
    <LoginForm
      appName="Student"
      brandName="E-Broker Student"
      redirectTo="/"
      title="Hey there, welcome back!"
      description="Ready to continue learning? Let's sign you in."
      heroTitle="Keep learning"
      heroDescription="Jump back into your courses and keep making progress on your learning journey."
    />
  )
}
