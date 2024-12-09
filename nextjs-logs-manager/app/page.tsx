"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import LogsTable from "./components/LogsTable";
import Heading from "./components/Heading";
import { useAuth } from "./hooks/useAuth";
import type { TLog, TPaginatedLogsResponse } from "./shared/types";
import Spinner from "./components/Spinner";

export default function Logs() {
  const [logs, setLogs] = useState<TLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 1,
    totalPages: 1,
    totalCount: 1,
  });
  const { isAuth, isAdmin } = useAuth();

  const fetchLogs = useCallback(() => {
    axios
      .get<TPaginatedLogsResponse>("/api/manage-logs", {
        params: { page: pagination.page },
      })
      .then((res) => {
        setLogs(res.data.data);
        setIsLoading(false);
        setPagination((s) => ({
          ...s,
          page: res.data.pagination.page,
          perPage: res.data.pagination.perPage,
          totalPages: res.data.pagination.totalPages,
          totalCount: res.data.pagination.totalCount,
        }));
      });
  }, [pagination.page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (isLoading) {
    return (
      <div className="grid h-[400px] place-items-center">
        <Spinner />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setPagination((s) => ({ ...s, page }));
  };

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
      <LogsTable
        logs={logs}
        refresh={fetchLogs}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  );
}
