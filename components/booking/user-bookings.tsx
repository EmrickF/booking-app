"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { deleteBooking } from "./actions"
import { Trash2 } from "lucide-react"

interface Booking {
  id: string
  date: Date
  roomId: string
  room: {
    roomNumber: number
  }
}

interface UserBookingsProps {
  bookings: Booking[]
}

export function UserBookings({ bookings }: UserBookingsProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (bookingId: string) => {
    try {
      setIsDeleting(bookingId)
      setError(null)
      await deleteBooking(bookingId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete booking")
      setIsDeleting(null)
    }
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No bookings yet</p>
      </Card>
    )
  }

  // Group bookings by date for cleaner display
  const groupedBookings = bookings.reduce(
    (acc, booking) => {
      const dateKey = new Date(booking.date).toLocaleDateString()
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(booking)
      return acc
    },
    {} as Record<string, Booking[]>
  )

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Mina bokningar</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(groupedBookings).map(([date, dateBookings]) => (
          <div key={date} className="border-l-2 border-blue-500 pl-4 pb-4">
            <p className="font-medium text-sm">{date}</p>
            <div className="space-y-2 mt-2">
              {dateBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <span className="text-sm">
                    Rum {booking.room.roomNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(booking.id)}
                    disabled={isDeleting === booking.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
