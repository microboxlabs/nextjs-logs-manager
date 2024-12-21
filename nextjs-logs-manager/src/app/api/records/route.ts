import nextConfig from "@/next.config.mjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import AuthUser from "@/src/modules/auth/domain/AuthUser";
import AuthUserRole from "@/src/modules/auth/domain/AuthUserRole";
import fromRaw from "@/src/modules/records/application/fromRaw";
import LogsService from "@/src/modules/records/infrastructure/LogsService";
import LogRecord from "@/src/modules/records/domain/LogRecord";
import { LogFilters } from "@/src/modules/records/application/readLogs";
import LogLevel from "@/src/modules/records/domain/LogLevel";

const getQueryParams = (url: string) => {
  const params = new URLSearchParams(url);
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export async function GET(req: NextRequest) {
  const secret = nextConfig.env?.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Hey, did you forget to set JWT_SECRET in your environment variables?",
      },
      { status: 400 },
    );
  }

  const cookie = req.cookies;
  const authCookie = cookie.get("auth-token");
  if (!authCookie) {
    return NextResponse.json(
      {
        error: "No auth cookie found",
      },
      { status: 400 },
    );
  }

  try {
    const user = jwt.verify(authCookie.value, secret) as AuthUser;
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid auth cookie",
        },
        { status: 400 },
      );
    }

    const filters = getQueryParams(req.nextUrl.search);

    const service = new LogsService();

    const toDate = filters?.to ? new Date(filters.to) : undefined;
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    const records = await service.read({
      from: filters?.from ? new Date(filters.from) : undefined,
      to: toDate,
      level: filters?.level ? (filters.level as LogLevel) : undefined,
      service: filters?.service,
      message: filters?.message,
    });

    return NextResponse.json(
      {
        count: records.length,
        records,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        // @ts-ignore
        error: e.toString(),
      },
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  const secret = nextConfig.env?.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Hey, did you forget to set JWT_SECRET in your environment variables?",
      },
      { status: 400 },
    );
  }
  const cookie = req.cookies;
  const authCookie = cookie.get("auth-token");
  if (!authCookie) {
    return NextResponse.json(
      {
        error: "No auth cookie found",
      },
      { status: 400 },
    );
  }

  try {
    const user = jwt.verify(authCookie.value, secret) as AuthUser;
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid auth cookie",
        },
        { status: 400 },
      );
    }
    if (user.role !== AuthUserRole.admin) {
      return NextResponse.json(
        {
          error: "You are not authorized to access this endpoint",
        },
        { status: 401 },
      );
    }
    const body = (await req.json()) ?? {};
    if (!body?.rawRecords) {
      return NextResponse.json(
        {
          error: "No raw records found",
        },
        { status: 400 },
      );
    }
    const logs = (body.rawRecords as string[]).map((raw) => fromRaw(raw));
    const invalidLogs = logs.filter((log) => !log.valid);
    if (invalidLogs.length > 0) {
      return NextResponse.json(
        {
          error: "It looks like some logs are invalid",
          logs: invalidLogs,
        },
        { status: 400 },
      );
    }
    const validLogs = logs
      .filter((log) => log.valid)
      .map((log) => log.entity) as LogRecord[];
    if (validLogs.length <= 0) {
      return NextResponse.json(
        {
          error: "No valid logs found",
        },
        { status: 400 },
      );
    }

    const service = new LogsService();
    await service.save(validLogs);
    return NextResponse.json(
      {
        count: validLogs.length,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Invalid auth cookie",
      },
      { status: 400 },
    );
  }
}
