import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import LoginRequest from "@/src/modules/auth/application/login/loginRequest";
import AuthService from "@/src/modules/auth/infrastructure/AuthService";
import nextConfig from "@/next.config.mjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const secret = nextConfig.env?.JWT_SECRET ?? "secret";
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Hey, did you forget to set JWT_SECRET in your environment variables?",
      },
      { status: 400 },
    );
  }
  const payload = (await req.json().catch(() => {})) as LoginRequest;
  const service = new AuthService();
  const response = await service.login(payload);
  if (!response.valid) {
    const message =
      response.type === "domain" ? response.error.message : response.error;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const token = jwt.sign(
    {
      fullName: response.user.fullName,
      email: response.user.email,
      role: response.user.role,
    },
    secret,
  );
  return NextResponse.json(
    {},
    {
      headers: {
        "Set-Cookie": serialize("auth-token", token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    },
  );
}
