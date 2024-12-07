import { PrismaClient } from "@prisma/client";
import { extractLogsFromFile } from "@/app/shared/utils";
import type { TLog } from "@/app/shared/types";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("logFiles");
    const textDecoder = new TextDecoder("utf-8");
    let newLogs: TLog[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      const arrBuffer = await file.arrayBuffer();
      const fileContent = textDecoder.decode(arrBuffer);
      const logsFromFile = extractLogsFromFile(fileContent);

      newLogs = newLogs.concat(logsFromFile);
    }

    // console.log(newLogs);
    await prisma.log.createMany({ data: newLogs });
    await prisma.entry.create({
      data: {
        date: new Date(),
        user: "unknown",
        details: `Registros cargados: ${newLogs.length}`,
      },
    });
    await prisma.$disconnect();

    return Response.json({});
  } catch (error) {
    return Response.error();
  }
}

export async function PUT(request: Request) {
  try {
    const updatedLog = (await request.json()) as TLog;
    console.log(updatedLog);

    return Response.json({});
  } catch (error) {
    return Response.error();
  }
}

export async function DELETE(request: Request) {
  try {
    const logId = await request.json();
    // console.log(logId);
    await prisma.log.delete({ where: { id: logId as number } });
    await prisma.$disconnect();

    return Response.json(logId);
  } catch (error) {
    return Response.error();
  }
}

export async function GET(request: Request) {
  try {
    const logs = prisma.log.findMany();

    return Response.json(logs);
  } catch (error) {
    return Response.error();
  }
}
