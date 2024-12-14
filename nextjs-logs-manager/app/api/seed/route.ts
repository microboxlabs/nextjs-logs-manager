import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export const GET = async () => {

    await prisma.user.deleteMany()

    const users = await prisma.user.createMany({
        data: [
            {
                email: "user@test.com",
                name: "juan perez",
                password: "user"
            },
            {
                email: "admin@test.com",
                name: "reinaldo bustamante",
                role: "admin",
                password: "admin"
            }
        ]
    })

    return NextResponse.json({ msg: `Se añadieron ${users.count} usuarios de prueba` })
}