"use client";
import LogTable from "@/components/Logs/LogTable";
import LogUploadForm from "@/components/Logs/LogUploadForm";
import { Log } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/auth/signin");
    }
  }, [session]);

  useEffect(() => {
    async function getLogs() {
      const { logs: newLogs } = await fetch("/api/logs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (resp) => await resp.json());

      if (logs != newLogs) setLogs(newLogs);
    }

    getLogs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">Logs</h1>

      {logs ? <LogTable logs={logs} /> : null}

      {session.status != "loading" ? <LogUploadForm /> : null}

      <Link href="/auth/signout">Log out</Link>
    </main>
  );
}
