import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith("/pages/admin")
    const isUserRoute = req.nextUrl.pathname.startsWith("/pages/user")

    // Si no hay token, redirige al login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Protección de rutas por rol
    if (isAdminRoute && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/pages/user", req.url))
    }

    if (isUserRoute && token.role !== "REGULAR") {
      return NextResponse.redirect(new URL("/pages/admin", req.url))
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