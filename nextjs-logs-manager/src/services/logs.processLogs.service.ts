import prisma from "../lib/db";

export const processLogs = async (logs: Array<{ timestamp: string; level: string; service: string; message: string }>) => {
    if (!logs || logs.length === 0) {
        throw new Error("No logs to process");
    }

    for (const log of logs) {
        const level = await prisma.logLevel.upsert({
            where: { name: log.level },
            update: {},
            create: { name: log.level },
        });

        const service = await prisma.service.upsert({
            where: { name: log.service },
            update: {},
            create: { name: log.service },
        });

        await prisma.logEntry.create({
            data: {
                timestamp: new Date(log.timestamp),
                levelId: level.id,
                serviceId: service.id,
                message: log.message,
            },
        });
    }
};
