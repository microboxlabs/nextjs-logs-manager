"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (session?.user.role === "ADMIN") {
    return <div>Bienvenido al Dashboard de Admin</div>;
  }

  if (session?.user.role === "REGULAR") {
    return <div>Bienvenido al Dashboard de Regular</div>;
  }

  return <div>Error: Usuario no autorizado</div>;
}