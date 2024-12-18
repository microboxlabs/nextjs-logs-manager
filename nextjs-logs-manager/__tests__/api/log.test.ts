import { GET } from "../../app/api/log/route";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    logEntry: {
        findMany: jest.fn(),
        create: jest.fn(),
    },
}));

jest.mock("../../app/api/log/events/route", () => ({
    broadcastLog: jest.fn(),
}));

describe("GET /api/log", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and a list of log", async () => {
        const mockLogs = [
            {
                id: 1,
                timestamp: new Date("2024-12-16T10:00:00Z").toISOString(),
                level: { name: "Error" },
                service: { name: "Service A" },
                message: "An error occurred",
            },
        ];

        (prisma.logEntry.findMany as jest.Mock).mockResolvedValue(mockLogs);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual([
            {
                id: 1,
                timestamp: "2024-12-16T10:00:00.000Z",
                level: "Error",
                serviceName: "Service A",
                message: "An error occurred",
            },
        ]);
        expect(prisma.logEntry.findMany).toHaveBeenCalledWith({
            include: { level: true, service: true },
            orderBy: { timestamp: "desc" },
        });
    });

    it("should return 500 when an error occurs", async () => {
        (prisma.logEntry.findMany as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch logs." });
        expect(prisma.logEntry.findMany).toHaveBeenCalled();
    });
});

describe("GET /api/log", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and a list of logs", async () => {
        const mockLogs = [
            {
                id: 1,
                timestamp: "2024-12-16T10:00:00.000Z",
                level: { name: "Info" },
                service: { name: "Service A" },
                message: "Test log message",
            },
        ];

        (prisma.logEntry.findMany as jest.Mock).mockResolvedValue(mockLogs);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual([
            {
                id: 1,
                timestamp: "2024-12-16T10:00:00.000Z",
                level: "Info",
                serviceName: "Service A",
                message: "Test log message",
            },
        ]);
        expect(prisma.logEntry.findMany).toHaveBeenCalled();
    });

    it("should return 500 when an error occurs", async () => {
        (prisma.logEntry.findMany as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch logs." });
        expect(prisma.logEntry.findMany).toHaveBeenCalled();
    });
});
