import { GET } from "../../app/api/users/[id]/route";
import prisma from "../../src/lib/db";

jest.mock("../../src/lib/db", () => ({
    user: {
        findUnique: jest.fn(),
    },
}));

describe("GET /api/users/[id]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockParams = (id: string) => ({ params: { id } });

    it("should return 200 and the user data for a valid ID", async () => {
        const mockUser = {
            id: 1,
            email: "user@example.com",
            role: {
                name: "Admin",
                rolePermissions: [
                    { permission: { name: "READ" } },
                    { permission: { name: "WRITE" } },
                ],
            },
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        const request = new Request("http://localhost/api/users/1");
        const response = await GET(request, mockParams("1"));
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({
            id: 1,
            email: "user@example.com",
            role: "Admin",
            permissions: ["READ", "WRITE"],
        });
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
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

    it("should return 400 if ID is invalid", async () => {
        const request = new Request("http://localhost/api/users/invalid");
        const response = await GET(request, mockParams("invalid"));
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json).toEqual({ error: "Invalid user ID provided." });
        expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        const request = new Request("http://localhost/api/users/1");
        const response = await GET(request, mockParams("1"));
        const json = await response.json();

        expect(response.status).toBe(404);
        expect(json).toEqual({ error: "User not found." });
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: expect.anything(),
        });
    });

    it("should return 500 if an unexpected error occurs", async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const request = new Request("http://localhost/api/users/1");
        const response = await GET(request, mockParams("1"));
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch user." });
        expect(prisma.user.findUnique).toHaveBeenCalled();
    });
});