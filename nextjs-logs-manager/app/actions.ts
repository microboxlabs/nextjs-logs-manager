"use server";

import { prisma } from "./_lib/prisma";
import { Filter } from "./page";

export const GetLogs = async (
  props: { filters: Filter | undefined } | undefined,
  page: number,
  pageSize: number,
) => {
  let from = undefined;
  let to = undefined;

  if (props?.filters?.from) {
    from = new Date(props.filters.from);
    from.setHours(0, 0, 0, 0);
  }

  if (props?.filters?.to) {
    to = new Date(props.filters.to);
    to.setHours(23, 59, 59, 999);
  }

  let whereClause = {
    typeId: props?.filters?.typeId ? props?.filters.typeId : undefined,
    service: props?.filters?.service ? props?.filters.service : undefined,
    datetime: {
      gte: from,
      lte: to,
    },
  };

  const logs = await prisma.log.findMany({
    include: {
      type: {
        select: {
          name: true, // only include the name of the type
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      datetime: "desc",
    },
    where: whereClause,
  });

  const logs_count = await prisma.log.count({
    where: whereClause,
  });

  const service_names = await prisma.log.findMany({
    distinct: ["service"], // Group by the `service` field
    select: {
      service: true, // Only retrieve the `service` field
    },
  });

  const types = await prisma.type.findMany();

  return { logs, logs_count, service_names, types };
};
