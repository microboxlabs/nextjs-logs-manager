import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { role: string };
    const { role } = decoded;
    if (role !== "admin") {
      const response = NextResponse.json({ valid: false }, { status: 401 });
      response.cookies.set("valid", "false", {
        httpOnly: true, // Evita acceso desde JavaScript
        secure: process.env.NODE_ENV === "production", // Usar solo HTTPS en producción
        path: "/", // Asegura que la cookie sea enviada en todas las rutas
        maxAge: 3600, // Expira en 1 hora
      });
      return response;
    }
    const response = NextResponse.json({ valid: true }, { status: 200 });
    response.cookies.set("valid", "true", {
      httpOnly: true, // Evita acceso desde JavaScript
      secure: process.env.NODE_ENV === "production", // Usar solo HTTPS en producción
      path: "/", // Asegura que la cookie sea enviada en todas las rutas
      maxAge: 3600, // Expira en 1 hora
    });
    return response;
  } catch (err) {
    console.log("Token verification failed:", err);
    return NextResponse.json(
      { valid: false, error: "Invalid token" },
      { status: 401 },
    );
  }
}
