import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { BookingClient } from "@/components/booking/booking-client"
import prisma from "@/lib/prisma"

export default async function BookingPage() {
  const session = await auth.api.getSession({
    headers: { cookie: (await cookies()).toString() },
  })

  if (!session) redirect("/login")

  const rooms = await prisma.room.findMany({
    orderBy: { roomNumber: "asc" },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Boka ett rum</h1>

      <BookingClient rooms={rooms} userId={session.user.id} />
    </div>
  )
}
