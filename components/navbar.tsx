import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold">
          BookingApp
        </Link>

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/booking">
            <Button>Book</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
