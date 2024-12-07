"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { TLog } from "@/app/shared/types";

export default function LogsTable({ logs }: { logs?: TLog[] }) {
  const { refresh } = useRouter();
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
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
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
              <td className="px-6 py-4">
                <Link
                  href={`/view/${log.id}`}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ver
                </Link>
                <button
                  type="button"
                  className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={removeLog.bind(null, log.id!)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
