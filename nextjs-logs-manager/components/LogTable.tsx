"use client";
import { useEffect, useState } from "react";
import ILog from "@/types/ILog";
import { Table, Button } from "flowbite-react";

type LogTableProps = {
  initialLogs: ILog[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
};

const LogTable: React.FC<LogTableProps> = ({
  initialLogs,
  total,
  page,
  pageSize,
  onPageChange,
}) => {
  const [logs, setLogs] = useState<ILog[]>(initialLogs);
  const [liveLogs, setLiveLogs] = useState<ILog[]>([]);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    // Conectar al servidor SSE para recibir nuevos logs
    const eventSource = new EventSource("/api/logs/stream");

    // Escuchar mensajes del servidor
    eventSource.addEventListener("message", (event) => {
      const newLog: ILog = JSON.parse(event.data);
      setLiveLogs((prevLogs) => [newLog, ...prevLogs]);
    });

    // Limpiar conexión SSE al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    // Mezclar liveLogs con los logs actuales solo si estamos en la primera página
    if (page === 1) {
      const updatedLogs = [...liveLogs, ...logs].slice(0, pageSize);
      setLogs(updatedLogs);
    }
  }, [liveLogs, page, pageSize]);

  const getPaginationRange = () => {
    const delta = 2; // Número de páginas visibles alrededor de la página actual
    const range = [];

    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-sm">
      <Table className="min-w-full border-collapse border border-gray-200">
        <Table.Head className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <Table.HeadCell className="border border-gray-300 p-2">
            Timestamp
          </Table.HeadCell>
          <Table.HeadCell className="border border-gray-300 p-2">
            Level
          </Table.HeadCell>
          <Table.HeadCell className="border border-gray-300 p-2">
            Service
          </Table.HeadCell>
          <Table.HeadCell className="border border-gray-300 p-2">
            Message
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {logs.map((log) => (
            <Table.Row key={log.id}>
              <Table.Cell className="border border-gray-300 p-2">
                {log.timestamp}
              </Table.Cell>
              <Table.Cell className="border border-gray-300 p-2">
                {log.level}
              </Table.Cell>
              <Table.Cell className="border border-gray-300 p-2">
                {log.service}
              </Table.Cell>
              <Table.Cell className="border border-gray-300 p-2">
                {log.message}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="my-2 flex items-center justify-center space-x-2">
        {/* Botón "Previous" */}
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </Button>

        {/* Números de Páginas */}
        {getPaginationRange().map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`rounded ${
              page === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {pageNumber}
          </Button>
        ))}

        {/* Botón "Next" */}
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LogTable;
