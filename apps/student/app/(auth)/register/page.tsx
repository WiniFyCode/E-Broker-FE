import { RegisterForm } from "@workspace/ui/components/auth"

export default function RegisterPage() {
  return (
    <RegisterForm
      appName="Student"
      brandName="E-Broker Student"
      redirectTo="/"
      title="Ready to start learning?"
      description="Create your account and dive into amazing courses"
      heroTitle="Your learning journey begins here"
      heroDescription="Join thousands of students already learning and growing with us. Let's get started!"
    />
  )
}
