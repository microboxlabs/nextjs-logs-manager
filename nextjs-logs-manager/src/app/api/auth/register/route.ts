import { NextRequest, NextResponse } from "next/server";
import nextConfig from "@/next.config.mjs";
import RegisterRequest from "@/src/modules/auth/application/register/registerRequest";
import AuthService from "@/src/modules/auth/infrastructure/AuthService";

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
  const payload = (await req.json().catch(() => ({}))) as RegisterRequest;
  console.log({ payload });
  const service = new AuthService();
  const response = await service.register(payload);
  if (!response.valid) {
    const message =
      response.type === "domain" ? response.error.message : response.error;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json(
    {
      message: "You're signed up!",
    },
    {
      status: 200,
    },
  );
}
