import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public routes like authentication and login
    if (pathname.startsWith("/api/auth") || pathname === "/login") {
        return NextResponse.next();
    }

    // Get the authentication token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If there is no token, redirect to /login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const userRole = (token.role as string)?.toLowerCase();

    // Block specific routes for admins only
    const adminOnlyRoutes = ["/api/levels", "/api/services", "/api/log/upload", "/api/users"];

    if (adminOnlyRoutes.some((route) => pathname.startsWith(route))) {
        if (userRole !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    // Protect any route that contains "admin"
    const isAdminRoute = pathname.toLowerCase().includes("admin");
    if (isAdminRoute && userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};
