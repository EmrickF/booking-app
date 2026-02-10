import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: "asc" },
    })

    return NextResponse.json(rooms)
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const roomData = [
      { roomNumber: 1 },
      { roomNumber: 2 },
      { roomNumber: 3 },
    ]

    for (const room of roomData) {
      const existing = await prisma.room.findUnique({
        where: { roomNumber: room.roomNumber },
      })

      if (!existing) {
        await prisma.room.create({
          data: room,
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error initializing rooms:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
