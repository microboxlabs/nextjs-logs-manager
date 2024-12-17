import { NextResponse } from "next/server";
import prisma from "@/src/lib/db";

// GET user by ID
export async function GET({ params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id, 10);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID provided." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
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
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user." },
            { status: 500 }
        );
    }
}
