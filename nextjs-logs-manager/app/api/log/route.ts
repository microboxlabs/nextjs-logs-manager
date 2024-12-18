
import { NextResponse } from "next/server";
import prisma from "../../../src/lib/db";
import { LogEntry } from "@prisma/client";
import { broadcastLog } from "../../../src/lib/broadcast";

// getAllLogs
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
        // console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Failed to fetch logs." }, { status: 500 });
    }
}

// CreateOneLog
export async function POST(request: Request) {
    try {
        const body: Partial<LogEntry> = await request.json();
        let { levelId, serviceId, message } = body;

        if (!levelId || !serviceId || !message) {
            return NextResponse.json(
                { error: "levelId, serviceId y message son requeridos." },
                { status: 400 }
            );
        }

        // Convert ids to number if they are strings
        if (typeof levelId === "string") levelId = parseInt(levelId, 10);
        if (typeof serviceId === "string") serviceId = parseInt(serviceId, 10);

        // Crear el log
        const newLog = await prisma.logEntry.create({
            data: {
                timestamp: new Date(),
                levelId,
                serviceId,
                message,
            },
            include: {
                level: true,
                service: true,
            },
        });

        // Respuesta formateada
        const formattedLog = {
            id: newLog.id,
            timestamp: newLog.timestamp,
            level: newLog.level.name,
            serviceName: newLog.service.name,
            message: newLog.message,
        };

        // Emitir el evento SSE a todos los clientes conectados
        broadcastLog(formattedLog);

        return NextResponse.json(formattedLog, { status: 201 });
    } catch (error) {
        // console.error("Error creating log:", error);
        return NextResponse.json({ error: "Failed to create log." }, { status: 500 });
    }
}