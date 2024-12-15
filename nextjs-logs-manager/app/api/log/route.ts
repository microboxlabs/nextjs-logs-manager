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

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const limit = +(url.searchParams.get('limit') || 10);  // Obtener el parámetro 'limit'
    const offset = +(url.searchParams.get('offset') || 0);
    const total = await prisma.log.count()

    if (isNaN(limit) || limit <= 0) {
        return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
    }
    if (isNaN(offset) || offset < 0) {
        return NextResponse.json({ error: 'Invalid offset parameter' }, { status: 400 });
    }

    const resp = await prisma.log.findMany({
        take: limit,
        skip: offset,
    })

    return NextResponse.json({
        data: resp,
        pagination: {
            total,
            totalPages: Math.ceil(total / limit)
        }

    })
}