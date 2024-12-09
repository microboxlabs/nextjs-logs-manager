'use server';

import { prisma } from "@/lib/prisma";

export const getAllLogs = async () => {
  try {
    const logs = await prisma.logEntry.findMany();

    return {
      ok: true,
      logs: logs,
    };

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'Could not obtain logs'
    }
  }
}