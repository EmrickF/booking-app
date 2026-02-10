import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get("roomId")

  if (!roomId) {
    return NextResponse.json(
      { error: "roomId is required" },
      { status: 400 }
    )
  }

  if (typeof roomId !== "string" || roomId.length === 0) {
    return NextResponse.json(
      { error: "Invalid roomId" },
      { status: 400 }
    )
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    })

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        roomId,
      },
      select: {
        date: true,
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
