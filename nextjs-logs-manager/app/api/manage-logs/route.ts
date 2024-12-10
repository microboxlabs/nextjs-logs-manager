import type { NextRequest } from "next/server";
import { PrismaClient, Log } from "@prisma/client";
import { extractLogsFromFile } from "@/app/shared/utils";
import type { TPaginatedLogsResponse } from "@/app/shared/types";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("logFiles");
    const textDecoder = new TextDecoder("utf-8");
    let newLogs: Log[] = [];

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
        date: new Date().toUTCString(),
        user: "Unknown",
        details: `Logs uploaded: ${newLogs.length}`,
      },
    });

    return Response.json({});
  } catch (error) {
    return Response.error();
  }
}

export async function PUT(request: Request) {
  try {
    const updatedLog = (await request.json()) as Log;

    await prisma.log.update({
      where: { id: updatedLog.id },
      data: {
        date: updatedLog.date,
        time: updatedLog.time,
        level: updatedLog.level,
        serviceName: updatedLog.serviceName,
        message: updatedLog.message,
      },
    });
    await prisma.entry.create({
      data: {
        date: new Date().toUTCString(),
        user: "Unknown",
        details: `Log #${updatedLog.id} updated`,
      },
    });

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

    return Response.json(logId);
  } catch (error) {
    return Response.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const page = params.get("page") ? Number(params.get("page")) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const logs = await prisma.log.findMany({ skip, take: limit });
    const count = await prisma.log.count();

    const res: TPaginatedLogsResponse = {
      data: logs,
      pagination: {
        page,
        perPage: limit,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
      },
    };

    return Response.json(res);
  } catch (error) {
    return Response.error();
  }
}
