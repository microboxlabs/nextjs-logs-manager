import { GET } from "../../app/api/services/route";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    service: {
        findMany: jest.fn(),
    },
}));

describe("GET /api/services", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and a list of services", async () => {
        const mockServices = [
            { id: 1, name: "Service A" },
            { id: 2, name: "Service B" },
        ];

        (prisma.service.findMany as jest.Mock).mockResolvedValue(mockServices);

        const response = await GET();

        expect(response.status).toBe(200);

        const json = await response.json();
        expect(json).toEqual(mockServices);

        expect(prisma.service.findMany).toHaveBeenCalledWith({
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });
    });

    it("should return 500 when Prisma throws an error", async () => {
        (prisma.service.findMany as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await GET();

        expect(response.status).toBe(500);

        const json = await response.json();
        expect(json).toEqual({ error: "Failed to fetch services." });

        expect(prisma.service.findMany).toHaveBeenCalled();
    });
});
