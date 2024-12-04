"use client";

import Link from "next/link";

export function CustomNavbar() {
  return (
    <div className="mb-2 flex w-full items-center justify-between border-b p-3">
      <div>
        <Link href="/" className="font-extrabold">
          LogsManager
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <Link className="link-underline" href="/dashboard">
          Dashboard
        </Link>
        <Link
          className="link-underline flex items-center "
          href="/logs"
        >
          <span>Logs</span>
        </Link>
        <Link href="/dashboard" className="btn-outline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
