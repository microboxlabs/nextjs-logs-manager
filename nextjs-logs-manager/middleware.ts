import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith("/pages/admin")
    const isLogsRoute = req.nextUrl.pathname === "/pages/logs"
    const isRootPagesPath = req.nextUrl.pathname === "/pages"

    // Si no hay token, redirige al login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Redirigir a logs por defecto (para ambos roles)
    if (isRootPagesPath) {
      return NextResponse.redirect(new URL("/pages/logs", req.url))
    }

    // Si es usuario regular, solo puede ver logs
    if (token.role === "REGULAR" && !isLogsRoute) {
      return NextResponse.redirect(new URL("/pages/logs", req.url))
    }

    // Protección de rutas admin
    if (isAdminRoute && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/pages/logs", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

// Configurar qué rutas proteger
export const config = {
  matcher: ["/pages/:path*"]
} 