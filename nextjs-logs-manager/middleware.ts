import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/session";
import { PrismaClient } from "@prisma/client";

// I do this so i can define the routes and their access level:
//    1: Admin level required
//    2: either Regular or admin can open that route
const routes = new Map<string, number>([
  ["/log_loading", 1],
  ["/", 2],
]);

export const middleware = async (req: NextRequest) => {
  if (routes.has(req.nextUrl.pathname)) {
    const cookie = cookies().get("session")?.value;

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log(session?.roleId);
    if (routes.get(req.nextUrl.pathname) == 1 && session.roleId != 1) {
      return NextResponse.redirect(new URL("/access_denied", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/log_loading", "/"],
};
