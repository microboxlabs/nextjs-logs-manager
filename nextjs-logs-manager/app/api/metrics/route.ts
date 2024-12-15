import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {

    const total = await prisma.log.count()
    const statusInfo = await prisma.log.count({
        where: {
            status: "INFO"
        }
    })
    const statusWarning = await prisma.log.count({
        where: {
            status: "WARNING"
        }
    })
    const statusError = await prisma.log.count({
        where: {
            status: "ERROR"
        }
    })

    return NextResponse.json({
        totalLogs: total,
        statusInfo,
        statusWarning,
        statusError
    })
}