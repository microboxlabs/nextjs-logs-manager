'use client';

import { AlertCircle, Info, AlertTriangle } from "lucide-react";

import { LogEntry } from "@/interfaces";

interface Props {
  logs: LogEntry[];
}

export const DashboardCards = ({ logs }: Props) => {
  // Stats
  const totalLogs = logs.length;
  const errorCount = logs.filter((log) => log.level === "ERROR").length;
  const warningCount = logs.filter((log) => log.level === "WARNING").length;
  const infoCount = logs.filter((log) => log.level === "INFO").length;

  const serviceStats = logs.reduce((acc: { [key: string]: number }, log) => {
    acc[log.service] = (acc[log.service] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(serviceStats).map(([service, count]) => ({
    service,
    count,
  }));

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Logs</h3>
          <p className="text-3xl font-bold text-gray-900">{totalLogs}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-700">Errors</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{errorCount}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-700">Warnings</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-2">
            <Info className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-700">Info</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{infoCount}</p>
        </div>
      </div>
    </div>
  );
};
