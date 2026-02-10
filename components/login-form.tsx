"use client"
import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"

export function LoginButton() {
  return (
    <Button
      onClick={() => authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      })}
    >
      Sign in with GitHub
    </Button>
  )
}
