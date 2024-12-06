'use client';

import { LogEntry } from "@/interfaces";
import formatDate from "@/lib/format-date";
import { useMemo, useState } from "react";

interface Props {
  logs: LogEntry[];
}

export const LogsTable = ({ logs }: Props) => {
  // Estados de filtros
  const [selectedService, setSelectedService] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  // Obtener servicios y niveles
  const uniqueServices = Array.from(new Set(logs.map((log) => log.service)));
  const levels = ["INFO", "WARNING", "ERROR"];

  // Filtrar logs basado en los filtros seleccionados
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const serviceMatch = !selectedService || log.service === selectedService;
      const levelMatch = !selectedLevel || log.level === selectedLevel;
      const dateMatch =
        (!dateRange.start ||
          new Date(log.timestamp) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(log.timestamp) <= new Date(dateRange.end));
      return serviceMatch && levelMatch && dateMatch;
    });
  }, [logs, selectedService, selectedLevel, dateRange]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "WARNING":
        return "bg-yellow-100 text-yellow-800";
      case "INFO":
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      {/* Filtros */}
      <div className="m-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow md:grid-cols-3">
        {/* Filtro por servicio */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">All services</option>
            {uniqueServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por nivel */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">All levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por fecha */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="datetime-local"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
            />
            <input
              type="datetime-local"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      {/* Vista mobile */}
      <div className="block md:hidden">
        {filteredLogs.map((log) => (
          <div key={log.id} className="border-b p-4 last:border-b-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">Timestamp</div>
              <div className="text-sm">{formatDate(log.timestamp)}</div>
              <div className="text-sm text-gray-500">Level</div>
              <div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(log.level)}`}
                >
                  {log.level}
                </span>
              </div>
              <div className="text-sm text-gray-500">Service</div>
              <div>
                <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800">
                  {log.service}
                </span>
              </div>
              <div className="text-sm text-gray-500">Message</div>
              <div className="text-sm">{log.message}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Vista desktop */}
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b bg-white hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  {formatDate(log.timestamp)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(log.level)}`}
                  >
                    {log.level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-800">
                    {log.service}
                  </span>
                </td>
                <td className="px-6 py-4">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
