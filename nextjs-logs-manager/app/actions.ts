"use server";

import { PrismaClient } from "@prisma/client";
import { Filter } from "./page";

interface GetLogsProps {
  filters?: { typeId?: number; service?: string };
}

export const GetLogs = async (
  props: { filters: Filter | undefined } | undefined,
) => {
  const prisma = new PrismaClient();

  // Build dynamic where clause based on filters
  const whereClause = {
    typeId: props?.filters?.typeId ? props?.filters.typeId : undefined,
    service: props?.filters?.service ? props?.filters.service : undefined,
    datetime: props?.filters?.from ? props?.filters.from : undefined,
    // service: props?.filters?.service ? props?.filters.service : undefined,
  };

  console.log(whereClause);

  const logs = await prisma.log.findMany({
    include: {
      type: {
        select: {
          name: true, // only include the name of the type
        },
      },
    },
    where: whereClause,
  });

  const service_names = await prisma.log.findMany({
    distinct: ["service"], // Group by the `service` field
    select: {
      service: true, // Only retrieve the `service` field
    },
  });

  const types = await prisma.type.findMany();

  return { logs, service_names, types };
};
