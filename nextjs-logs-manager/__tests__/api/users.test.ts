import { GET } from "../../app/api/users/route";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    user: {
        findMany: jest.fn(),
    },
}));

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

describe("GET /api/users", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and a formatted list of users", async () => {
        const mockUsers = [
            {
                id: 1,
                email: "user1@example.com",
                role: {
                    name: "Admin",
                    rolePermissions: [
                        { permission: { name: "READ" } },
                        { permission: { name: "WRITE" } },
                    ],
                },
            },
            {
                id: 2,
                email: "user2@example.com",
                role: {
                    name: "User",
                    rolePermissions: [{ permission: { name: "READ" } }],
                },
            },
        ];

        const expectedFormattedUsers = [
            {
                id: 1,
                email: "user1@example.com",
                role: "Admin",
                permissions: ["READ", "WRITE"],
            },
            {
                id: 2,
                email: "user2@example.com",
                role: "User",
                permissions: ["READ"],
            },
        ];

        (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(expectedFormattedUsers);

        expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.user.findMany).toHaveBeenCalledWith({
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: { permission: true },
                        },
                    },
                },
            },
        });
    });

    it("should return 200 and an empty list when no users exist", async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual([]);

        expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message when Prisma throws an error", async () => {
        (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch users." });

        expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    test.each([
        {
            description: "user with no permissions",
            mockData: [
                {
                    id: 1,
                    email: "user1@example.com",
                    role: { name: "User", rolePermissions: [] },
                },
            ],
            expected: [
                {
                    id: 1,
                    email: "user1@example.com",
                    role: "User",
                    permissions: [],
                },
            ],
        },
        {
            description: "user with a single permission",
            mockData: [
                {
                    id: 2,
                    email: "user2@example.com",
                    role: {
                        name: "Admin",
                        rolePermissions: [{ permission: { name: "READ" } }],
                    },
                },
            ],
            expected: [
                {
                    id: 2,
                    email: "user2@example.com",
                    role: "Admin",
                    permissions: ["READ"],
                },
            ],
        },
    ])("should return correct format for $description", async ({ mockData, expected }) => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue(mockData);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(expected);
    });
});
