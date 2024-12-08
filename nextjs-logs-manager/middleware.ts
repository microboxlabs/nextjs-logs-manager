import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

/**
 * Middleware de autenticación y autorización
 * Protege rutas y maneja redirecciones según rol
 */
export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname
    const userRole = req.nextauth.token?.role

    // Redirigir ruta principal a login
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Proteger upload-logs solo para admin
    if (pathname === "/pages/admin/upload-logs" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/pages/logs", req.url))
    }

    // Permitir acceso a login
    if (pathname === "/login") {
      return NextResponse.next()
    }

    // Redirigir rutas no válidas a login
    if (!["/login", "/pages/logs", "/pages/admin/upload-logs"].includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/login") return true
        return !!token
      }
    },
    pages: {
      signIn: "/login"
    }
  }
)

/**
 * Configuración de rutas protegidas
 * Excluye recursos estáticos y API
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
} 