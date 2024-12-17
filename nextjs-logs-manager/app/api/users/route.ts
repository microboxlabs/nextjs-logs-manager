import { NextResponse } from "next/server";
import prisma from "@/src/lib/db";

// Get all users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
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


        const formattedUsers = users.map((user) => ({
            id: user.id,
            email: user.email,
            role: user.role.name,
            permissions: user.role.rolePermissions.map((rp) => rp.permission.name),
        }));

        return NextResponse.json(formattedUsers, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users." },
            { status: 500 }
        );
    }
}