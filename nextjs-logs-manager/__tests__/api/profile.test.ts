import { GET } from "../../app/api/users/profile/route";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import prisma from "../../src/lib/db";

jest.mock("@/src/lib/db", () => ({
    user: {
        findUnique: jest.fn(),
    },
}));

jest.mock("next-auth/jwt", () => ({
    getToken: jest.fn(),
}));

describe("GET /api/user/profile", () => {
    const mockRequest = {} as NextRequest;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and the user profile if authenticated", async () => {
        (getToken as jest.Mock).mockResolvedValue({ sub: "1" });

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

        const response = await GET(mockRequest);
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

    it("should return 401 if token is missing or invalid", async () => {
        (getToken as jest.Mock).mockResolvedValue(null);

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(401);
        expect(json).toEqual({ error: "Unauthorized" });
        expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
        (getToken as jest.Mock).mockResolvedValue({ sub: "1" });

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(404);
        expect(json).toEqual({ error: "User not found." });
        expect(prisma.user.findUnique).toHaveBeenCalled();
    });

    it("should return 500 if an unexpected error occurs", async () => {
        (getToken as jest.Mock).mockResolvedValue({ sub: "1" });

        (prisma.user.findUnique as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch user profile." });
        expect(prisma.user.findUnique).toHaveBeenCalled();
    });
});
