import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/src/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = parseInt(token.sub, 10);

        const user = await prisma.user.findUnique({
            where: { id: userId },
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

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const formattedUser = {
            id: user.id,
            email: user.email,
            role: user.role.name,
            permissions: user.role.rolePermissions.map((rp) => rp.permission.name),
        };

        return NextResponse.json(formattedUser, { status: 200 });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            { error: "Failed to fetch user profile." },
            { status: 500 }
        );
    }
}
