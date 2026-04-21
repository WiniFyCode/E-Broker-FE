import { RegisterForm } from "@workspace/ui/components/auth"

export default function RegisterPage() {
  return (
    <RegisterForm
      appName="Teacher"
      brandName="E-Broker Teacher"
      redirectTo="/"
      title="Ready to inspire students?"
      description="Create your teacher account and start sharing your knowledge"
      heroTitle="Share your expertise"
      heroDescription="Join our community of educators. Create courses, track student progress, and make a real impact."
    />
  )
}
