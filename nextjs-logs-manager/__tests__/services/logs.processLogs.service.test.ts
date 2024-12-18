import { processLogs } from "../../src/services/logs.processLogs.service";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    logLevel: {
        upsert: jest.fn(),
    },
    service: {
        upsert: jest.fn(),
    },
    logEntry: {
        create: jest.fn(),
    },
}));

describe("processLogs", () => {
    const mockLogs = [
        {
            timestamp: "2024-12-17T10:00:00Z",
            level: "INFO",
            service: "ServiceA",
            message: "Log message 1",
        },
        {
            timestamp: "2024-12-17T10:05:00Z",
            level: "ERROR",
            service: "ServiceB",
            message: "Log message 2",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should process logs successfully", async () => {
        // Mock upsert and create methods
        (prisma.logLevel.upsert as jest.Mock).mockResolvedValue({ id: 1 });
        (prisma.service.upsert as jest.Mock).mockResolvedValue({ id: 2 });
        (prisma.logEntry.create as jest.Mock).mockResolvedValue({});

        await processLogs(mockLogs);

        expect(prisma.logLevel.upsert).toHaveBeenCalledTimes(mockLogs.length);
        expect(prisma.service.upsert).toHaveBeenCalledTimes(mockLogs.length);
        expect(prisma.logEntry.create).toHaveBeenCalledTimes(mockLogs.length);

        mockLogs.forEach((log, index) => {
            expect(prisma.logLevel.upsert).toHaveBeenNthCalledWith(index + 1, {
                where: { name: log.level },
                update: {},
                create: { name: log.level },
            });

            expect(prisma.service.upsert).toHaveBeenNthCalledWith(index + 1, {
                where: { name: log.service },
                update: {},
                create: { name: log.service },
            });

            expect(prisma.logEntry.create).toHaveBeenNthCalledWith(index + 1, {
                data: {
                    timestamp: new Date(log.timestamp),
                    levelId: expect.any(Number),
                    serviceId: expect.any(Number),
                    message: log.message,
                },
            });
        });
    });

    it("should throw an error if no logs are provided", async () => {
        await expect(processLogs([])).rejects.toThrow("No logs to process");
        expect(prisma.logLevel.upsert).not.toHaveBeenCalled();
        expect(prisma.service.upsert).not.toHaveBeenCalled();
        expect(prisma.logEntry.create).not.toHaveBeenCalled();
    });

    it("should throw an error if processing fails", async () => {
        (prisma.logLevel.upsert as jest.Mock).mockRejectedValue(new Error("DB Error"));

        await expect(processLogs(mockLogs)).rejects.toThrow("Failed to process logs");

        expect(prisma.logLevel.upsert).toHaveBeenCalledTimes(1);
        expect(prisma.service.upsert).not.toHaveBeenCalled();
        expect(prisma.logEntry.create).not.toHaveBeenCalled();
    });
});
