"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import LogsTable from "./components/LogsTable";
import Heading from "./components/Heading";
import { useAuth } from "./hooks/useAuth";
import { TLog } from "./shared/types";
import Spinner from "./components/Spinner";

export default function Logs() {
  const [logs, setLogs] = useState<TLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, isAdmin } = useAuth();

  const fetchLogs = useCallback(() => {
    axios.get("/api/manage-logs").then((res) => {
      setLogs(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="grid h-[400px] place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Heading>Registros</Heading>
        {isAuth && isAdmin && (
          <Link href="/upload" className="btn bg-green-700">
            Subir registros
          </Link>
        )}
      </header>
      <LogsTable logs={logs} refresh={fetchLogs} />
    </>
  );
}
