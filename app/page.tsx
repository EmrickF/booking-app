"use client"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import dynamic from "next/dynamic"
import { authClient } from "@/lib/auth-client"
import { useState, useEffect } from "react"

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then(m => m.Calendar),
  { ssr: false }
)

export default function HomePage() {
  const { data: session } = authClient.useSession()
  const [rooms, setRooms] = useState<any[]>([])
  const [selectedRoomId, setSelectedRoomId] = useState<string>("")
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms/init")
      const data = await response.json()
      setRooms(data)
      if (data.length > 0) {
        setSelectedRoomId(data[0].id)
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error)
    }
  }

  useEffect(() => {
    if (selectedRoomId && mounted) {
      fetch(`/api/rooms/bookings?roomId=${selectedRoomId}`)
        .then((res) => res.json())
        .then((data) => {
          const dates = data.map((booking: any) => new Date(booking.date))
          setBookedDates(dates)
        })
        .catch(() => setBookedDates([]))
    }
  }, [selectedRoomId, mounted])
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Booking app
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Christian hack int me fö hårt
        </p>

        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Link href="/booking">
              <Button variant="default"size="lg">Start booking</Button>
            </Link>
            {session && <ArrowUp size={40} className="text-black animate-bounce" />}
          </div>
          {!session && (
            <div className="flex flex-col items-center gap-2">
              <Link href="/login">
                <Button variant="default" size="lg">
                  Sign in
                </Button>
              </Link>
              <ArrowUp size={40} className="text-black animate-bounce" />
            </div>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 grid gap-8 md:grid-cols-3 ">
        {[
          {
            title: "1. Log in",
            text: "Sign in with your github account",
          },
          {
            title: "2. Select a date",
            text: "Use the calendar down below to see availability",
          },
          {
            title: "3. Confirm booking",
            text: "Instant confirmation in real time",
          },
        ].map((step) => (
          <Card key={step.title} className="transition-transform duration-300 hover:scale-125">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Availability preview
        </h2>

        <p className="text-muted-foreground">
          Red dates means the day is booked, feel free to check other rooms availability.
        </p>

        {mounted && rooms.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium mb-2">Select Room</label>
              <select
                className="border p-2 rounded w-full"
                onChange={(e) => setSelectedRoomId(e.target.value)}
                value={selectedRoomId || ""}
              >
                {rooms.map((room: any) => (
                  <option key={room.id} value={room.id}>
                    Rum {room.roomNumber}
                  </option>
                ))}
              </select>
            </div>
            <Card className="w-auto">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  disabled
                  bookedDates={bookedDates}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  )
}
