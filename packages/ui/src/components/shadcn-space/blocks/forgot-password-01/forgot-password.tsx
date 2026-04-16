import { Button } from "@workspace/ui/components/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <section className="h-screen flex overflow-hidden">
      {/* Left side - Image 60% */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-muted">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop"
          alt="Forgot password background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Forgot Password Form 40% */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center bg-background p-8 overflow-auto">
        <div className="w-full max-w-md space-y-6">
          <CardHeader className="space-y-6 p-0">
            <div>
              <a href="">
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
                  alt="shadcnspace"
                  className="dark:hidden h-10 w-10"
                />
                <img
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
                  alt="shadcnspace"
                  className="hidden dark:block h-10 w-10"
                />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                Forgot your password?
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                Please enter the email address associated with your account and
                we will email you a link to reset your password.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form>
              <FieldGroup className="gap-6">
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
                      placeholder="example@shadcnspace.com"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>
                <Field className="gap-4">
                  <Button type="submit" size={"lg"} className="rounded-xl h-10 cursor-pointer hover:bg-primary/80">
                    Forgot password
                  </Button>
                  <Link href="/login">
                    <Button
                      type="button"
                      size={"lg"}
                      variant={"ghost"}
                      className="rounded-xl cursor-pointer w-full"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
