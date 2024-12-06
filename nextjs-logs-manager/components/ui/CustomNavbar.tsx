"use client";

import Link from "next/link";

import { logout } from "@/actions";

export function CustomNavbar() {
  const onLogout = async () => {
    await logout();
    window.location.replace("/");
  };

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
        <button onClick={() => onLogout()} className="btn-outline">
          Logout
        </button>
      </div>
    </div>
  );
}
