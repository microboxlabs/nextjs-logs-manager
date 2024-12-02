"use server";

import { PrismaClient } from "@prisma/client";

export const GetRoles = async () => {
  const prisma = new PrismaClient();

  const data = await prisma.role.findMany();
  return data;
};
