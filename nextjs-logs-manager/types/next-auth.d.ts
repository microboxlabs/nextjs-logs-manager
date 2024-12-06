import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: "ADMIN" | "REGULAR"
    }
  }

  interface User {
    id: string
    email: string
    role: "ADMIN" | "REGULAR"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "REGULAR"
  }
} 