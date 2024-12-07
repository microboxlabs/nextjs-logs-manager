import { PrismaClient } from "@prisma/client";
import type { TLog } from "@/app/shared/types";

const prisma = new PrismaClient();

const extractLogsFromFile = (content: string) => {
  const logs: TLog[] = [];

  const fileLines = content.split("\n");

  for (let i = 0; i < fileLines.length; i++) {
    const lineArray = fileLines[i].split(" ");

    // Date and time fields are Date type, it parses date strings to Date objts
    const date = lineArray[0].replace("[", "");
    const dateElements = date.split("-").map((e) => Number(e));

    const year = dateElements[0];
    // Cause months in Date are zero-indexed
    const month = dateElements[1] - 1;
    const day = dateElements[2];

    const dateObj = new Date(year, month, day);

    const time = lineArray[1].replace("]", "");
    const timeElements = time.split(":").map((e) => Number(e));

    const datetimeObj = new Date(
      year,
      month,
      day,
      timeElements[0],
      timeElements[1],
      timeElements[2],
    );
    const level = lineArray[2].replace("[", "").replace("]", "");
    const serviceName = lineArray[3].replace(":", "");
    const message = fileLines[i].split(": ")[1];

    const newLog = {
      date: dateObj,
      time: datetimeObj,
      level,
      serviceName,
      message,
    };

    // console.log(newLog);
    // console.log(dateObj.toJSON());
    // console.log(datetimeObj.toTimeString());

    logs.push(newLog);
  }

  return logs;
};

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
    const updatedLog = request.body;
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
