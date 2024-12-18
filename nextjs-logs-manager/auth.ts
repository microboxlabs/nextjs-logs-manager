// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { getUserByUsernameOrEmail } from "@/app/db/models/User";
// import bcrypt from "bcrypt";

// const authOptions = {
//   session: { strategy: "jwt" },
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const { username, email, password } = credentials as {
//           username?: string;
//           email?: string;
//           password: string;
//         };

//         // Buscar usuario
//         const user = await getUserByUsernameOrEmail(username || email);
//         if (!user) throw new Error("User not found");

//         // Comparar contraseña
//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         // Retornar usuario
//         return { id: user.id, username: user.username, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         userId: token.id,
//         username: token.username,
//         role: token.role,
//       };
//       return session;
//     },
//   },
// };

// export default function handler(req: Request) {
//   return NextAuth(authOptions)(req);
// }
// ///////////////////////////////

// // import NextAuth from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { getUser } from "@/lib/db";

// // export const { handlers, signIn, signOut, auth } = NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         username: {
// //           label: "Username",
// //           type: "text",
// //           placeholder: "Enter username",
// //         },
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.username) return null;

// //         const user = await getUser(credentials.username as string);

// //         if (user) {
// //           return {
// //             id: user.id.toString(),
// //             name: user.username,
// //             role: user.role,
// //           };
// //         } else {
// //           return null;
// //         }
// //       },
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.role = user.role;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (session?.user) {
// //         session.user.role = token.role as string;
// //       }
// //       return session;
// //     },
// //   },
// //   pages: {
// //     signIn: "/",
// //   },
// //   session: {
// //     strategy: "jwt",
// //   },
// // });

// //////////////////////////////
// // const authOptions = {
// //   session: {
// //     strategy: "jwt",
// //   },
// //   secret: process.env.AUTH_SECRET,
// //   providers: [
// //     Credentials({
// //       async authorize(credentials) {
// //         const { username, password } = credentials as {
// //           username: string;
// //           password: string;
// //         };
// //         try {
// //           const user = await getUserByUsername(username);
// //           if (!user || user.password !== password) {
// //             throw new Error("Invalid username or password");
// //           }
// //           return {
// //             id: user.userId,
// //             username: user.username,
// //             role: user.role,
// //           };
// //         } catch (error) {
// //           throw new Error((error as Error).message);
// //         }
// //       },
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id as string;
// //         token.role = user.role as string;
// //         token.username = user.username as string;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       session.user = {
// //         userId: token.id as string,
// //         role: token.role as string,
// //         username: token.username as string,
// //       };
// //       return session;
// //     },
// //   },
// // };

// // export default NextAuth(authOptions);