import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/api/auth", "/login"];
const ADMIN_ONLY_ROUTES = ["/api/levels", "/api/services", "/api/log/upload", "/api/users"];
const AUTHENTICATED_ROUTES = ["/api/logs/events", "/dashboard/user-profile"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Permitir rutas públicas
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Obtener el token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const userRole = (token.role as string)?.toLowerCase();

    // Permitir acceso a rutas autenticadas
    if (AUTHENTICATED_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Rutas solo para admin
    if (ADMIN_ONLY_ROUTES.some(route => pathname.startsWith(route)) && userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};
