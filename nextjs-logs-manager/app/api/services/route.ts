import { NextResponse } from "next/server";
import prisma from "../../../src/lib/db";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        // console.error("Error fetching services:", error);
        return NextResponse.json(
            { error: "Failed to fetch services." },
            { status: 500 }
        );
    }
}
