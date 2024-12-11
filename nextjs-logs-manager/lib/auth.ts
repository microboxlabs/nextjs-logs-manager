import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Input validation
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          // If user doesn't exist, return null
          if (!user) {
            return null;
          }

          // Verify password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          // If password doesn't match, return null
          if (!passwordMatch) {
            return null;
          }

          // Return user object without password
          return {
            id: user.id.toString(),
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        } finally {
          // Always disconnect from Prisma
          await prisma.$disconnect();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user role in JWT token
      if (user) {
        token.role = user.role;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user role in session
      if (token) {
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
