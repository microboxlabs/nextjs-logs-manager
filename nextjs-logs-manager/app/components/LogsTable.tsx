"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import { TLog } from "@/app/shared/types";
import { useAuth } from "../hooks/useAuth";
import Pagination from "./Pagination";

type Props = {
  logs?: TLog[];
  refresh: () => void;
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
  onPageChange: (page: number) => void;
};

export default function LogsTable({
  logs,
  refresh,
  pagination,
  onPageChange,
}: Props) {
  const [page, setPage] = useState();
  const { isAdmin } = useAuth();
  if (!logs) {
    return null;
  }

  const removeLog = async (id: number) => {
    if (confirm("Esta seguro de eliminar este registro")) {
      try {
        await axios.delete("/api/manage-logs", { data: id });
        alert("Registro eliminado exitosamente");
        refresh();
      } catch (error) {
        alert("Algo salió mal");
      }
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Nivel
              </th>
              <th scope="col" className="px-6 py-3">
                Servicio
              </th>
              <th scope="col" className="px-6 py-3">
                Mensaje
              </th>
              {isAdmin && (
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr
                key={log.id}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {log.id}
                </th>
                <td className="px-6 py-4">{`${log.date} ${log.time}`}</td>
                <td className="px-6 py-4">{log.level}</td>
                <td className="px-6 py-4">{log.serviceName}</td>
                <td className="px-6 py-4">{log.message}</td>
                {isAdmin && (
                  <td className="px-6 py-4">
                    <Link
                      href={`/view/${log.id}`}
                      className="btn mr-4 bg-blue-600"
                    >
                      Ver
                    </Link>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={removeLog.bind(null, log.id!)}
                    >
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
