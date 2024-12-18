'use client';

import DataTable, { DataTableRef } from "@/app/components/tableDashboard/DataTable";
import FileUploadLogs from "@/app/components/tableDashboard/FileUploadLogs";
import FiltersLogs from "@/app/components/tableDashboard/FiltersLogs";
import { useRef, useState } from "react";

export default function AdminDashboard() {
  const dataTableRef = useRef<DataTableRef | null>(null);
  const [filterCriteria, setFilterCriteria] = useState({});

  const handleFilterChange = (criteria: any) => {
    setFilterCriteria(criteria);
    dataTableRef.current?.refreshLogs(criteria);
  };

  const filterFields = [
    { name: "level", label: "Nivel", type: "select", options: ["INFO", "WARNING", "ERROR"] },
    { name: "service", label: "Servicio", type: "text" },
    { name: "search", label: "Mensaje", type: "text" },
  ] as const;

  return (
    <div className="dashboard p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <FileUploadLogs 
        onRefresh={() => dataTableRef.current?.refreshLogs()} 
        prependLogs={(newLogs) => dataTableRef.current?.prependLogs(newLogs)} 
      />
      <FiltersLogs fields={filterFields} onFilterChange={handleFilterChange} />
      <DataTable ref={dataTableRef} filterCriteria={filterCriteria} />
    </div>
  );
}