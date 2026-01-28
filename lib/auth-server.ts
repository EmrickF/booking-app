import "server-only"
import { cookies } from "next/headers"
import { auth } from "@/lib/auth"

export async function getSessionServer() {
  const cookieStore = await cookies()

  return auth.api.getSession({
    headers: {
      cookie: cookieStore.toString(),
    },
  })
}
