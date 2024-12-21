import { NextRequest, NextResponse } from "next/server";
import { jwtVerify as verify } from "jose";
import nextConfig from "@/next.config.mjs";

export async function middleware(request: NextRequest) {
  const secret = nextConfig.env?.JWT_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const cookies = request.cookies;
  const authCookie = cookies.get("auth-token");

  const isLogin = request.nextUrl.pathname.startsWith("/login");

  if (!authCookie || !secret) {
    if (isLogin) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const isAuthenticated = await verify(
      authCookie.value,
      new TextEncoder().encode(secret),
    ).catch(() => false);

    if (!isLogin && !isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isLogin && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
