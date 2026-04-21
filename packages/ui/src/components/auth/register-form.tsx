"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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
import type { AuthResponse, RegisterDto } from "@workspace/sdk/types/auth"
import { saveAuthSession } from "@workspace/sdk/auth/session"

type RegisterFormProps = {
  appName?: string
  title?: string
  description?: string
  redirectTo?: string
  brandName?: string
  heroTitle?: string
  heroDescription?: string
}

type RegisterFormValues = {
  fullName: string
  email: string
  password: string
  rememberMe: boolean
}

const DEFAULT_TITLE = "Create your account"
const DEFAULT_DESCRIPTION = "Fill in the details below to get started."
const DEFAULT_HERO_TITLE = "Start learning today"
const DEFAULT_HERO_DESCRIPTION =
  "Create an account to access your dashboard, track progress, and continue where you left off."

function getErrorMessage(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return "Unable to sign up right now."
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

  return "Unable to sign up right now."
}

export default function RegisterForm({
  appName = "E-Broker",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  redirectTo = "/login",
  brandName = "E-Broker",
  heroTitle = DEFAULT_HERO_TITLE,
  heroDescription = DEFAULT_HERO_DESCRIPTION,
}: RegisterFormProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [formValues, setFormValues] = React.useState<RegisterFormValues>({
    fullName: "",
    email: "",
    password: "",
    rememberMe: true,
  })

  const mutation = useMutation<AuthResponse, unknown, RegisterDto>({
    mutationFn: (payload) => apiClient.auth.register(payload),
    onSuccess: (response) => {
      apiClient.setToken(response.tokens.accessToken)
      saveAuthSession(response, formValues.rememberMe)
      router.replace(redirectTo)
    },
    onError: (error) => {
      setErrorMessage(getErrorMessage(error))
    },
  })

  function updateField<K extends keyof RegisterFormValues>(
    key: K,
    value: RegisterFormValues[K]
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
      fullName: formValues.fullName,
      email: formValues.email,
      password: formValues.password,
    })
  }

  return (
    <section className="flex min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="relative hidden lg:flex lg:w-[58%]">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop"
          alt="Register background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-950/60 via-slate-900/25 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-10">
          <div className="max-w-lg space-y-4">
            <p className="text-sm font-medium tracking-[0.3em] text-sky-300 uppercase">
              {appName}
            </p>
            <h1 className="text-4xl leading-tight font-semibold">
              {heroTitle}
            </h1>
            <p className="text-base leading-7 text-slate-200/90">
              {heroDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center bg-background px-6 py-10 text-foreground lg:w-[42%] lg:px-10">
        <div className="w-full max-w-md space-y-6">
          <CardHeader className="space-y-6 p-0">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
                  alt={brandName}
                  className="h-10 w-10 dark:hidden"
                />
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
                  alt={brandName}
                  className="hidden h-10 w-10 dark:block"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup className="gap-6">
                <Field className="grid gap-3 md:grid-cols-2 md:gap-6">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-xs dark:bg-background"
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-xs dark:bg-background"
                  >
                    Facebook
                  </Button>
                </Field>
                <FieldSeparator className="text-sm text-muted-foreground">
                  <span className="px-4">or sign up with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="fullName"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      Name*
                    </FieldLabel>
                    <Input
                      id="fullName"
                      type="text"
                      value={formValues.fullName}
                      placeholder="enter your name"
                      required
                      className="h-9 shadow-xs dark:bg-background"
                      onChange={(event) =>
                        updateField("fullName", event.target.value)
                      }
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      Email*
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={formValues.email}
                      placeholder="example@ebroker.com"
                      required
                      className="h-9 shadow-xs dark:bg-background"
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      Password*
                    </FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      value={formValues.password}
                      placeholder="Enter your password"
                      required
                      className="h-9 shadow-xs dark:bg-background"
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                    />
                  </Field>
                </div>

                <Field orientation="horizontal" className="justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="rememberMe"
                      checked={formValues.rememberMe}
                      className="cursor-pointer"
                      onCheckedChange={(checked) =>
                        updateField("rememberMe", checked === true)
                      }
                    />
                    <FieldLabel
                      htmlFor="rememberMe"
                      className="cursor-pointer text-sm font-normal text-primary"
                    >
                      Remember this device
                    </FieldLabel>
                  </div>
                  <Link
                    href="/login"
                    className="text-end text-sm font-medium text-card-foreground"
                  >
                    Already have an account?
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
                    size="lg"
                    className="h-10 cursor-pointer rounded-lg hover:bg-primary/80"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Signing up..." : "Sign up"}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-card-foreground no-underline!"
                    >
                      Sign in
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
