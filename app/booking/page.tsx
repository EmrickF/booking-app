import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { BookingClient } from "@/components/booking/booking-client"
import { UserBookings } from "@/components/booking/user-bookings"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function BookingPage() {
  const session = await auth.api.getSession({
    headers: { cookie: (await cookies()).toString() },
  })

  if (!session) redirect("/login")

  const rooms = await prisma.room.findMany({
    orderBy: { roomNumber: "asc" },
  })

  const userBookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      room: {
        select: {
          roomNumber: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Button>
        <Link href="/">Back to Frontpage</Link>
      </Button>
      <h1 className="text-2xl font-bold">Boka ett rum</h1>

      <BookingClient rooms={rooms} userId={session.user.id} />

      <UserBookings bookings={userBookings} />
    </div>
  )
}
