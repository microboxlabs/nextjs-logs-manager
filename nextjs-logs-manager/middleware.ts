import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Definición de rutas por tipo
const ROUTES = {
  SHARED: {
    LOGS: "/pages/logs"
  },
  ADMIN: {
    UPLOAD_LOGS: "/pages/admin/upload-logs"
  }
} as const

// Rutas que requieren rol de ADMIN
const adminRoutes = new Set<string>([
  ROUTES.ADMIN.UPLOAD_LOGS
])

// Rutas compartidas entre ADMIN y REGULAR
const sharedRoutes = new Set<string>([
  ROUTES.SHARED.LOGS
])

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Si no hay token, redirige al login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Verificar permisos según la ruta
    if (adminRoutes.has(pathname)) {
      // Rutas exclusivas de admin
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL(ROUTES.SHARED.LOGS, req.url))
      }
    } else if (sharedRoutes.has(pathname)) {
      // Rutas compartidas - ambos roles pueden acceder
      return NextResponse.next()
    } else {
      // Cualquier otra ruta redirige a logs
      return NextResponse.redirect(new URL(ROUTES.SHARED.LOGS, req.url))
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
  matcher: [
    // Rutas compartidas
    ROUTES.SHARED.LOGS,
    // Rutas de admin (usando comodín para futuras rutas)
    "/pages/admin/:path*"
  ]
} 