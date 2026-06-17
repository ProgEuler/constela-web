import Link from "next/link"

import { RegisterForm } from "../_components/register-form"
import { GoogleButton } from "../_components/social-auth/google-button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import logo from "@/assets/svg/logo.svg"

export default function RegisterV1() {
  return (
    <div className="flex h-dvh">
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">Register</div>
            <div className="mx-auto max-w-xl text-muted-foreground">
              Fill in your details below. We promise not to quiz you about your
              first pet&apos;s name (this time).
            </div>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            {/* <GoogleButton className="w-full" variant="outline" /> */}
            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link prefetch={false} href="login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Image
              src={logo}
              alt="Constela Logo"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
