import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: { email: {}, password: {} },
            authorize: async (credentials: any) => {
                const { email } = credentials
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user) throw new Error('UserNotFound')
                if (user.password !== credentials.password) throw new Error('InvalidCredentials')

                return user
            },
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id ?? ''
            session.user.role = token.role
            return session
        },
    },
})

