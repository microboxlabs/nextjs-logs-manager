import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { role: true },
                });

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return { id: user.id.toString(), email: user.email, role: user.role.name };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: Number(user.id) },
                    include: {
                        role: {
                            include: { rolePermissions: { include: { permission: true } } },
                        },
                    },
                });

                if (dbUser?.role) {
                    token.role = dbUser.role.name;
                    token.permissions = dbUser.role.rolePermissions.map(
                        (rp) => rp.permission.name
                    );
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role as string;
            session.user.permissions = token.permissions as string[];
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
