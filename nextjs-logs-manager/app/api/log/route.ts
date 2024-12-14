import { auth } from "@/auth"
import { UploadFileDto } from "@/lib/dtos/uploadFileDto"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const body = await request.json()
    const session = await auth()
    if (!session) return NextResponse.json({ error: "no user authentificated" }, { status: 401 })
    if (session.user.role !== 'admin') return NextResponse.json({ error: "only admin role" }, { status: 401 })

    const [error, uploadFileDto] = UploadFileDto.create(body, session.user.id!)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const resp = await prisma.log.createManyAndReturn({
        data: [
            ...uploadFileDto!.logs
        ]
    })
    console.log('data subida')
    return NextResponse.json(resp)
}