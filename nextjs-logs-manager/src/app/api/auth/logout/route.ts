import nextConfig from "@/next.config.mjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const secret = nextConfig.env?.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Hey, did you forget to set JWT_SECRET in your environment variables?",
      },
      { status: 400 },
    );
  }
  const cookie = req.cookies;
  const authCookie = cookie.get("auth-token");
  if (!authCookie) {
    return NextResponse.json(
      {
        error: "No auth cookie found",
      },
      { status: 400 },
    );
  }
  // verify the auth cookie
  try {
    jwt.verify(authCookie.value, secret);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Invalid auth cookie",
      },
      { status: 400 },
    );
  }
  return NextResponse.json(
    {},
    {
      headers: {
        "Set-Cookie": serialize("auth-token", "", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 0, // delete the cookie
        }),
      },
    },
  );
}
