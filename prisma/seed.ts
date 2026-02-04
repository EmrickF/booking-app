import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Seed 3 rooms
  const roomData = [
    { roomNumber: 1 },
    { roomNumber: 2 },
    { roomNumber: 3 },
  ]

  for (const room of roomData) {
    const existingRoom = await prisma.room.findUnique({
      where: { roomNumber: room.roomNumber },
    })

    if (!existingRoom) {
      await prisma.room.create({
        data: room,
      })
      console.log(`Created room ${room.roomNumber}`)
    } else {
      console.log(`Room ${room.roomNumber} already exists`)
    }
  }

  console.log("Seeding complete")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
