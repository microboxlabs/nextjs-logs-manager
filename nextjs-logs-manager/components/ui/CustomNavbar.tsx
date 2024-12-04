"use client";

import Link from "next/link";

export function CustomNavbar() {
  return (
    <div className="mb-2 flex w-full items-center justify-between border-b p-3">
      <div>
        <h1 className="font-extrabold">LogsManager</h1>
      </div>
      <div className="flex items-center space-x-3">
        <Link className="link-underline" href="/dashboard">
          Dashboard
        </Link>
        <Link className="link-underline" href="/dashboard">
          Logs
        </Link>
        <Link href="/dashboard" className="btn-outline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
