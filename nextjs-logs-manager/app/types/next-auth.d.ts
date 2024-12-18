import NextAuth from "next-auth";

  declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        userId: string;
        username: string;
        role: string;
      } & DefaultSession["user"];
    }
  
    interface User extends DefaultUser {
      id: string;
      role: string;
      username: string;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      username: string;
      role: string;
    }
  }


  // declare module "next-auth" {
//     interface Session {
//       user: {
//         id: number;
//         username: string;
//         role: string;
//       };
//     }
  
//     interface User {
//       role: string;
//     }
//   }
  
//   declare module "next-auth/jwt" {
//     interface JWT {
//       role: string;
//     }
//   }