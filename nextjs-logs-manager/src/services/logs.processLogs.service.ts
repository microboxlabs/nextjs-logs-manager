import prisma from "../lib/db";
import { LogData } from "../types/logs.types";

/**
 * Processes an array of log data by upserting log levels and services,
 * and creating log entries in the database.
 *
 * @param {LogData[]} logs - An array of log data to be processed.
 * @returns {Promise<void>} - A promise that resolves when the logs have been processed.
 * @throws {Error} - Throws an error if no logs are provided or if processing fails.
 */
export const processLogs = async (logs: LogData[]): Promise<void> => {
    if (!logs || logs.length === 0) {
        throw new Error("No logs to process");
    }

    try {
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
    } catch (error) {
        console.error("Error processing logs:", error);
        throw new Error("Failed to process logs");
    }
};
