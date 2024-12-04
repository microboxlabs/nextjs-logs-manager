"use server";

import { PrismaClient } from "@prisma/client";

export const GetRoles = async () => {
  try {
    const prisma = new PrismaClient();

    const data = await prisma.role.findMany();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
