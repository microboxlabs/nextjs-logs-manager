"use client";
import { useState, useEffect } from "react";
import FilterForm from "@/components/Filters";
import LogTable from "@/components/LogTable";
import ILog from "@/types/ILog";
import Navbar from "@/components/Navbar";

const DashboardPage = () => {
  const [logs, setLogs] = useState<ILog[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Tamaño fijo para la paginación
  const [totalLogs, setTotalLogs] = useState(0); // Total de registros

  const fetchLogs = async () => {
    const params = new URLSearchParams({
      ...filters,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    try {
      const response = await fetch(`/api/logs?${params.toString()}`);
      const data = await response.json();
      setLogs(data.logs);
      setTotalLogs(data.total);
    } catch (error) {
      console.log("Error fetching logs:", error);
      setLogs([]);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, [filters, page]);

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reinicia a la primera página
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-h-screen min-h-screen p-4 dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold dark:text-white">
          Logs Dashboard
        </h1>
        <FilterForm onFilter={handleFilter} />
        <div className="mt-4">
          {logs.length > 0 ? (
            <LogTable
              initialLogs={logs}
              total={totalLogs}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          ) : (
            <p className="text-gray-500">
              No logs found for the selected filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
