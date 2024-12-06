import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import ILog from "@/types/ILog";

export async function POST(req: NextRequest) {
  try {
    const { fileContent } = await req.json();
    const logEntries = fileContent
      .split("\r\n")
      .map((line: string) => {
        const match = line.match(/^\[(.+)\] \[(.+)\] (.+): (.+)$/);
        if (match) {
          const [, timestamp, level, service, message] = match;
          return { timestamp, level, service, message };
        }
        return null;
      })
      .filter(Boolean) as ILog[]; // Aseguramos que sea del tipo correcto.

    // Validación adicional para asegurarnos de que no hay valores nulos
    if (!logEntries.length) {
      return NextResponse.json(
        { message: "No valid log entries found." },
        { status: 400 },
      );
    }

    // Insertar los datos en la base de datos.
    const stmt = db.prepare(`
      INSERT INTO logs (timestamp, level, service, message)
      VALUES (?, ?, ?, ?)
    `);

    // Si usas `better-sqlite3`, el bucle forEach funciona directamente.
    for (const { timestamp, level, service, message } of logEntries) {
      stmt.run(timestamp, level, service, message);
    }

    // Finalizar si es necesario
    if (stmt.finalize) {
      stmt.finalize();
    }

    return NextResponse.json({ message: "Logs uploaded successfully!" });
  } catch (error) {
    console.log("Error processing logs:", error);
    return NextResponse.json(
      { error: "Failed to process logs." },
      { status: 500 },
    );
  }
}
