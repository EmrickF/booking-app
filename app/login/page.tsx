"use client"
import { LoginButton } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-sm items-center justify-center hover:scale-140 transition-transform duration-200">
        <LoginButton />
      </div>
    </div>
  )
}
