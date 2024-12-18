import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard/admin");
      const isRegularRoute = req.nextUrl.pathname.startsWith("/dashboard/regular");

      // Permite solo a ADMIN en rutas de admin
      if (isAdminRoute) return token?.role === "ADMIN";

      // Permite solo a REGULAR en rutas regulares
      if (isRegularRoute) return token?.role === "REGULAR";

      return !!token; // Permite otras rutas si hay token
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Aplica el middleware a todas las rutas del dashboard
};