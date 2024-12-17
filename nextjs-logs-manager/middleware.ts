import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/api/auth") || pathname === "/login") {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/api/log/upload") {
        const userRole = (token.role as string)?.toLowerCase();
        if (userRole !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    const isAdminRoute = (pathname as string).toLowerCase().includes("admin");
    if (isAdminRoute && (token.role as string).toLowerCase() !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/:path*",
    ],
};
