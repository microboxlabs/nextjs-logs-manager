import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { TPaginatedEntriesResponse } from "@/app/shared/types";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const page = params.get("page") ? Number(params.get("page")) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const logs = await prisma.entry.findMany({ skip, take: limit });
    const count = await prisma.entry.count();

    const res: TPaginatedEntriesResponse = {
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
