"use server";

import { prisma } from "../_lib/prisma";

export const GetRoles = async () => {
  try {
    const data = await prisma.role.findMany();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
