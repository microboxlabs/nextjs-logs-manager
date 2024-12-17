import { NextResponse } from "next/server";
import prisma from "@/src/lib/db"; // Asegúrate de importar tu instancia de Prisma

export async function GET() {
    try {
        // Obtener todos los niveles desde la base de datos
        const levels = await prisma.logLevel.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json(levels, { status: 200 });
    } catch (error) {
        console.error("Error fetching levels:", error);
        return NextResponse.json(
            { error: "Failed to fetch levels." },
            { status: 500 }
        );
    }
}
