import { GET } from "../../app/api/levels/route";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    logLevel: {
        findMany: jest.fn(),
    },
}));

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

describe("GET /api/levels", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and a list of levels", async () => {
        const mockLevels = [
            { id: 1, name: "Info" },
            { id: 2, name: "Error" },
        ];

        (prisma.logLevel.findMany as jest.Mock).mockResolvedValue(mockLevels);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(mockLevels);
        expect(prisma.logLevel.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.logLevel.findMany).toHaveBeenCalledWith({
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });
    });

    it("should return 200 and an empty list when there are no levels", async () => {
        (prisma.logLevel.findMany as jest.Mock).mockResolvedValue([]);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual([]);
        expect(prisma.logLevel.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return 200 and objects with id and name properties", async () => {
        const mockLevels = [
            { id: 1, name: "Info" },
            { id: 2, name: "Error" },
        ];

        (prisma.logLevel.findMany as jest.Mock).mockResolvedValue(mockLevels);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(json)).toBe(true);

        json.forEach((item: { id: number; name: string }) => {
            expect(item).toHaveProperty("id");
            expect(item).toHaveProperty("name");
        });
    });

    it("should return 500 and an error message when Prisma throws an error", async () => {
        (prisma.logLevel.findMany as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch levels." });
        expect(prisma.logLevel.findMany).toHaveBeenCalledTimes(1);
    });

    test.each([
        { mockData: [{ id: 1, name: "Info" }], expected: [{ id: 1, name: "Info" }] },
        { mockData: [], expected: [] },
    ])("should return 200 and correct data ($expected)", async ({ mockData, expected }) => {
        (prisma.logLevel.findMany as jest.Mock).mockResolvedValue(mockData);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(expected);
    });
});
