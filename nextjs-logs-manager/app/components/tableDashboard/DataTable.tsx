'use client'
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

type Log = {
  id: number;
  timestamp: string;
  level: string;
  service: string;
  message: string;
};

const DataTable = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  // realiza el fetch al endpoint de logs en api
  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch("/api/logs");
      const data = await response.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="flex justify-center items-center overflow-x-auto w-full">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Timestamp</Table.HeadCell>
          <Table.HeadCell>Level</Table.HeadCell>
          <Table.HeadCell>Service</Table.HeadCell>
          <Table.HeadCell>Message</Table.HeadCell>
          <Table.HeadCell><span className="sr-only">Edit</span></Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {logs.map((log) => (
            <Table.Row
              key={log.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {log.id}
              </Table.Cell>
              <Table.Cell>{log.timestamp}</Table.Cell>
              <Table.Cell>{log.level}</Table.Cell>
              <Table.Cell>{log.service}</Table.Cell>
              <Table.Cell>{log.message}</Table.Cell>
              <Table.Cell onClick={() =>{alert('clickedit')}}>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DataTable;