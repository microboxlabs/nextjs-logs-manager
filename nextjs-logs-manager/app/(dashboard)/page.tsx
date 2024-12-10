"use client";
import LogUploadForm from "@/components/Logs/LogUploadForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log("SESSION: ", session);

    if (session.status === "unauthenticated") {
      redirect("/auth/signin");
    }
    console.log("SESSION: ", session);
  }, [session]);

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">Logs</h1>

      <LogUploadForm />

      <Link href="/auth/signout">Log out</Link>
    </main>
  );
}
