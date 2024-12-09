"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { Table, Pagination, Button } from "flowbite-react";

import { TLog } from "@/app/shared/types";
import { useAuth } from "../hooks/useAuth";

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
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Nivel</Table.HeadCell>
          <Table.HeadCell>Servicio</Table.HeadCell>
          <Table.HeadCell>Mensaje</Table.HeadCell>
          {isAdmin && <Table.HeadCell>Acciones</Table.HeadCell>}
        </Table.Head>
        <Table.Body className="divide-y">
          {logs?.map((log) => (
            <Table.Row key={log.id} className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {log.id}
              </Table.Cell>
              <Table.Cell>{`${log.date} ${log.time}`}</Table.Cell>
              <Table.Cell>{log.level}</Table.Cell>
              <Table.Cell>{log.serviceName}</Table.Cell>
              <Table.Cell>{log.message}</Table.Cell>
              {isAdmin && (
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button as={Link} href={`/view/${log.id}`} pill>
                      Ver
                    </Button>
                    <Button
                      onClick={removeLog.bind(null, log.id!)}
                      color="red"
                      pill
                    >
                      Eliminar
                    </Button>
                  </div>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
