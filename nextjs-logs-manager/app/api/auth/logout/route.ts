import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Eliminar la cookie 'token'
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return response;
}
