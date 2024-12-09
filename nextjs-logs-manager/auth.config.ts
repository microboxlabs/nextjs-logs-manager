import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs';

import { loginSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) throw new Error("Invalid credentials");

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });
        if (!user || !user.password) throw new Error("User not found");

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
