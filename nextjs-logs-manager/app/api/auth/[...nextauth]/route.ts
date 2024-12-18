import NextAuth from "next-auth/next";
import { authOptions } from "../../../../src/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
