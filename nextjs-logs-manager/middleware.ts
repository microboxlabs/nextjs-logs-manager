import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // Si no hay token, redirige a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  // Si hay token, deja que la solicitud continúe
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/upload/:path*", "/home/:path*"],
};
