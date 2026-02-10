"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = authClient.useSession()

  return (
    <nav className="flex justify-between p-4 border-b">
      <span className="font-bold text-lg">Booking app</span>

      {session ? (
        <div className="flex items-center gap-4">
          <span>{session.user.name}</span>
          <Button
            variant="outline"
            onClick={() => authClient.signOut()}
          >
            Log out
          </Button>
        </div>
      ) : (
        <Button asChild>
          <a href="/login">Sign in</a>
        </Button>
      )}
    </nav>
  )
}
