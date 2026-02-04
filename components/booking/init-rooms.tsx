"use client"

import { useEffect, useState } from "react"

export function InitRooms() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeRooms = async () => {
      try {
        const response = await fetch("/api/rooms/init", { method: "POST" })
        if (response.ok) {
          setInitialized(true)
        }
      } catch (error) {
        console.error("Failed to initialize rooms:", error)
      }
    }

    initializeRooms()
  }, [])

  return null
}
