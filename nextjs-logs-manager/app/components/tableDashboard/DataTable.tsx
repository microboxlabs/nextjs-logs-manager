'use client';
import { Table } from "flowbite-react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Paginations from "./Paginations";

type Log = {
  id: number;
  timestamp: string;
  level: string;
  service: string;
  message: string;
};

interface DataTableProps {
  filterCriteria?: any; // Recibe los criterios de filtro
}

export type DataTableRef = {
  refreshLogs: (criteria?: any) => void; // Permite pasar filtros opcionales
  prependLogs: (newLogs: Log[]) => void; // Función para agregar nuevos logs
};

const DataTable = forwardRef<DataTableRef, DataTableProps>(({ filterCriteria }, ref) => {
  const [logs, setLogs] = useState<Log[]>([]); // Logs paginados de la DB
  const [newLogs, setNewLogs] = useState<Log[]>([]); // Logs nuevos procesados
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Orden inicial
  const pageSize = 10;

  const fetchLogs = async (page: number = 1, criteria: any = {}) => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortOrder,
        ...criteria, // Aquí se incluyen filtros vacíos como parte de la consulta
      }).toString();
  
      const response = await fetch(`/api/logs?${query}`);
      if (!response.ok) throw new Error("Failed to fetch logs");
  
      const data = await response.json();
      setLogs(data.logs);
      setTotalPages(Math.ceil(data.total / pageSize));
      setNewLogs([]);
    } catch (err: any) {
      console.error("Error fetching logs:", err.message);
    }
  };

  const prependLogs = (incomingLogs: Log[]) => {
    setNewLogs((prevNewLogs) => [...incomingLogs.reverse(), ...prevNewLogs]);
  };

  useImperativeHandle(ref, () => ({
    refreshLogs: (criteria: any = {}) => {
      setCurrentPage(1); // Reinicia a la primera página al aplicar filtros
      fetchLogs(1, criteria);
    },
    prependLogs,
  }));

  useEffect(() => {
    fetchLogs(currentPage, filterCriteria); // Usa siempre los filtros actuales
  }, [currentPage, filterCriteria]);

  const combinedLogs = [...newLogs, ...logs];

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} // Alternar orden
            className="cursor-pointer"
          >
            Timestamp {sortOrder === "asc" ? "▲" : "▼"}
          </Table.HeadCell>
          <Table.HeadCell>Timestamp</Table.HeadCell>
          <Table.HeadCell>Level</Table.HeadCell>
          <Table.HeadCell>Service</Table.HeadCell>
          <Table.HeadCell>Message</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {combinedLogs.length > 0 ? (
              combinedLogs.map((log, index) => (
                <Table.Row key={index}>
                <Table.Cell>{log.id}</Table.Cell>
                <Table.Cell>{log.timestamp}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 rounded ${
                      log.level === "ERROR" ? "bg-red-100 text-red-700" :
                      log.level === "WARNING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {log.level}
                  </span>
                </Table.Cell>
                <Table.Cell>{log.service}</Table.Cell>
                <Table.Cell>{log.message}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center text-gray-500">
                No logs found matching your filters.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Paginación */}
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
});

DataTable.displayName = "DataTable";
export default DataTable;