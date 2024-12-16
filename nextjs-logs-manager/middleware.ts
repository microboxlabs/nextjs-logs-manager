import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Rutas protegidas por rol
const ADMIN_ROUTES = ["/dashboard/admin", "/api/admin/:path*"];
const USER_ROUTES = ["/dashboard/user", "/api/user/:path*"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Evitar interceptar las rutas de NextAuth
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Si no hay token (sesión), redirigir al login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Validar rutas de administrador
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
        if (token.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }
    }

    // Validar rutas de usuario (incluye admin)
    if (USER_ROUTES.some((route) => pathname.startsWith(route))) {
        if (token.role !== "user" && token.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Users only" }, { status: 403 });
        }
    }

    return NextResponse.next();
}

// Configuración de rutas protegidas
export const config = {
    matcher: [
        "/dashboard/:path*", // Protege todo el dashboard
        "/api/:path*",       // Protege todas las rutas de API
    ],
};
