'use client'

import DataTable from "@/app/components/tableDashboard/DataTable";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <DataTable />
    </div>
  );
}