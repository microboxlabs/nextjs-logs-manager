'use server';

import { auth } from "@/auth";
import { parseLogLine, ParsedLog } from "@/lib/logs-parser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const uploadLogs = async (formData: FormData) => {
  try {
    const session = await auth();
    console.log(session);
    if (!session || session.user.role !== "admin") {
      throw new Error('Unauthorized');
    }

    const file = formData.get('logFile') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const text = await file.text();
    const lines = text.split('\n');

    const logs = lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(parseLogLine)
      .filter((log): log is ParsedLog => log !== null);

    await prisma.$transaction(
      logs.map(log => prisma.logEntry.create({
        data: {
          timestamp: log.timestamp,
          level: log.level,
          service: log.service,
          message: log.message,
        }
      }))
    )

    revalidatePath("/dashboard");
    return { success: true, message: `Processed ${logs.length} log entries` };

  } catch (error) {
    console.error("Error uploading logs:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to upload logs",
    };
  }
}