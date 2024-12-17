import prisma from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const logs = await prisma.logEntry.findMany({
            include: {
                level: true,
                service: true,
            },
            orderBy: {
                timestamp: "desc",
            },
        });

        const formattedLogs = logs.map((log) => ({
            id: log.id,
            timestamp: log.timestamp,
            level: log.level.name,
            serviceName: log.service.name,
            message: log.message,
        }));

        return NextResponse.json(formattedLogs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Failed to fetch logs." }, { status: 500 });
    }
}
