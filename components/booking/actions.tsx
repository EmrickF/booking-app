"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createBooking({
  roomId,
  startDate,
  endDate,
}: {
  roomId: string
  startDate: Date
  endDate: Date
}) {
  const session = await auth.api.getSession({
    headers: { cookie: (await cookies()).toString() },
  })

  if (!session) {
    throw new Error("Not authenticated")
  }

  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  if (end <= start) {
    throw new Error("Check-out date must be at least 1 day after check-in date")
  }

  const conflicts = await prisma.booking.findMany({
    where: {
      roomId,
      date: {
        gte: start,
        lte: end,
      },
    },
  })

  if (conflicts.length > 0) {
    const conflictDates = conflicts
      .map((b) => b.date.toLocaleDateString())
      .join(", ")
    throw new Error(`Room is booked on: ${conflictDates}`)
  }

  const bookings = []
  let currentDate = new Date(start)
  
  while (currentDate <= end) {
    bookings.push({
      roomId,
      userId: session.user.id,
      date: new Date(currentDate),
    })
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  await prisma.booking.createMany({
    data: bookings,
  })
}

export async function deleteBooking(bookingId: string) {
  const session = await auth.api.getSession({
    headers: { cookie: (await cookies()).toString() },
  })

  if (!session) {
    throw new Error("Not authenticated")
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  })

  if (!booking) {
    throw new Error("Booking not found")
  }

  if (booking.userId !== session.user.id) {
    throw new Error("Not authorized to delete this booking")
  }

  await prisma.booking.delete({
    where: { id: bookingId },
  })

  revalidatePath("/booking")
}