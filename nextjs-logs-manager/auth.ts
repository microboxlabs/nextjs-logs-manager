// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"

// const authOptions = {
//  session:{
//   strategy:"jwt"
//  },
//  secret: process.env.AUTH_SECRET,
//  providers: [
//   Credentials({
//     async authorize(credentials) {
//       const { username, password } = credentials as {
//         username: string;
//         password: string;
//       };
//       try {
//         const response = await login({ username, password });
//         if (response.error) {
//           throw new Error(response.error);
//         }
//         if (response.username) {
//           const user = await (username);
//           if (user) {
//             return {
//               id: user.userId,
//               username: user.username,
//               role: user.role,
//             };
//           }
//         }
//       } catch (error) {
//         throw new Error((error as Error).message);
//       }
//       return null;
//     },
//   }),
// ]
// }

// export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)