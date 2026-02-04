"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { cookies } from "next/headers"

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

  // Normalize dates to start of day for comparison
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  // Validate minimum 1-night booking
  if (end <= start) {
    throw new Error("Check-out date must be at least 1 day after check-in date")
  }

  // Check for conflicts with existing bookings
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

  // Create bookings for each day in the range
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
