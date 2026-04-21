"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { apiClient } from "@workspace/sdk/client"
import type { AuthResponse, LoginDto } from "@workspace/sdk/types/auth"
import { saveAuthSession } from "@workspace/sdk/auth/session"

type LoginFormProps = {
  appName?: string
  title?: string
  description?: string
  redirectTo?: string
  brandName?: string
  heroTitle?: string
  heroDescription?: string
}

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

function getErrorMessage(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return "Unable to sign in right now."
  }

  if ("message" in error) {
    const message = (error as { message?: string | string[] }).message

    if (Array.isArray(message)) {
      return message.join(", ")
    }

    if (typeof message === "string") {
      return message
    }
  }

  return "Unable to sign in right now."
}

const LoginForm = ({
  appName = "E-Broker",
  title = "Welcome back!",
  description = "Good to see you again. Let's get you signed in.",
  redirectTo = "/",
  brandName = "E-Broker",
  heroTitle = "Welcome back",
  heroDescription = "Pick up right where you left off and keep making progress.",
}: LoginFormProps = {}) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [formValues, setFormValues] = React.useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: true,
  })

  const mutation = useMutation<AuthResponse, unknown, LoginDto>({
    mutationFn: (credentials) => apiClient.auth.login(credentials),
    onSuccess: (response) => {
      saveAuthSession(response)
      if (formValues.rememberMe) {
        localStorage.setItem("auth_session", JSON.stringify(response))
      }
      router.replace(redirectTo)
    },
    onError: (error) => {
      setErrorMessage(getErrorMessage(error))
    },
  })

  function updateField<K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K]
  ) {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    mutation.mutate({
      email: formValues.email,
      password: formValues.password,
    })
  }

  return (
    <section className="min-h-screen flex overflow-hidden">
      {/* Left side - Image 60% */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-muted">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-900/25 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-10">
          <div className="max-w-lg space-y-4">
            <p className="text-sm font-medium tracking-[0.3em] text-sky-300 uppercase">
              {appName}
            </p>
            <h1 className="text-4xl leading-tight font-semibold text-white">
              {heroTitle}
            </h1>
            <p className="text-base leading-7 text-slate-200/90">
              {heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form 40% */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center bg-background p-8 overflow-auto">
        <div className="w-full max-w-md space-y-6">
          <CardHeader className="space-y-6 p-0">
            <div>
              <Link href="/">
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
                  alt={brandName}
                  className="dark:hidden h-10 w-10"
                />
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
                  alt={brandName}
                  className="hidden dark:block h-10 w-10"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-6">
                <Field className="grid md:grid-cols-2 md:gap-6 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </Field>
                <FieldSeparator className="text-sm text-muted-foreground">
                  <span className="px-4">or sign in with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Email*
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={formValues.email}
                      placeholder="example@ebroker.com"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Password*
                    </FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      value={formValues.password}
                      placeholder="Enter your password"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                    />
                  </Field>
                </div>

                <Field orientation="horizontal" className="justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      checked={formValues.rememberMe}
                      className="cursor-pointer"
                      onCheckedChange={(checked) =>
                        updateField("rememberMe", checked === true)
                      }
                    />
                    <FieldLabel
                      htmlFor="terms"
                      className="text-sm text-primary font-normal cursor-pointer"
                    >
                      Remember this device
                    </FieldLabel>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-card-foreground font-medium text-end"
                  >
                    Forgot password?
                  </Link>
                </Field>

                {errorMessage ? (
                  <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errorMessage}
                  </p>
                ) : null}

                <Field className="gap-4">
                  <Button
                    type="submit"
                    size={"lg"}
                    className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Signing in..." : "Sign in"}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-card-foreground no-underline!"
                    >
                      Create an account
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
