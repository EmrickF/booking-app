import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Book rooms easily and securely
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A simple booking system built with Next.js, Prisma and secure authentication.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/booking">
            <Button size="lg">Start booking</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "1. Sign in",
            text: "Secure authentication with BetterAuth",
          },
          {
            title: "2. Pick a date",
            text: "Use the calendar to see availability",
          },
          {
            title: "3. Confirm booking",
            text: "Instant confirmation in real time",
          },
        ].map((step) => (
          <Card key={step.title}>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* AVAILABILITY PREVIEW */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-2xl font-semibold">
          Availability preview
        </h2>

        <p className="text-muted-foreground">
          Log in to make a booking
        </p>

        <div className="flex justify-center">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                disabled
                className="rounded-md"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
