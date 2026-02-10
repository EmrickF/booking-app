"use client"

import { useState, useEffect } from "react"
import { createBooking } from "@/components/booking/actions"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function BookingClient({ rooms, userId }: any) {
  const [mounted, setMounted] = useState(false)
  const [roomId, setRoomId] = useState<string>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [bookedDates, setBookedDates] = useState<Date[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (roomId && mounted) {
      // Fetch booked dates for the selected room
      fetch(`/api/rooms/bookings?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => {
          const dates = data.map((booking: any) => new Date(booking.date))
          setBookedDates(dates)
        })
        .catch(() => setBookedDates([]))
    } else {
      setBookedDates([])
    }
  }, [roomId, mounted])

  const isValidBooking = roomId && startDate && endDate && endDate > startDate

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Room</label>
          <select
            className="border p-2 rounded w-full"
            disabled
          >
            <option>Loading rooms...</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Room</label>
        <select
          className="border p-2 rounded w-full"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId || ""}
        >
          <option value="">Choose room</option>
          {rooms.map((room: any) => (
            <option key={room.id} value={room.id}>
              Rum {room.roomNumber}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select Check-in Date</label>
        <Calendar 
          mode="single" 
          selected={startDate} 
          onSelect={setStartDate}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || bookedDates.some(d => d.toDateString() === date.toDateString())}
          bookedDates={bookedDates}
          suppressHydrationWarning
        />
      </div>

      {startDate && (
        <div>
          <label className="block text-sm font-medium mb-2">Select Check-out Date (must be at least 1 day after check-in)</label>
          <Calendar 
            mode="single" 
            selected={endDate} 
            onSelect={setEndDate}
            disabled={(date) => date <= startDate || bookedDates.some(d => d.toDateString() === date.toDateString())}
            bookedDates={bookedDates}
            suppressHydrationWarning
          />
        </div>
      )}

      {startDate && endDate && endDate > startDate && (
        <div className="p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm">
            <strong>Booking:</strong> {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
            {' '}({Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} nights)
          </p>
        </div>
      )}

      <Button
        disabled={!isValidBooking}
        onClick={async () => {
          try {
            await createBooking({ roomId: roomId!, startDate: startDate!, endDate: endDate! })
            alert("Booking confirmed!")
            setRoomId(undefined)
            setStartDate(undefined)
            setEndDate(undefined)
          } catch (error) {
            alert(`Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`)
          }
        }}
        className="w-full"
      >
        Book
      </Button>
    </div>
  )
}
