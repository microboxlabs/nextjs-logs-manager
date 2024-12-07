"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
  Pagination,
} from "flowbite-react";
import { useFilters } from "@/contexts/FilterContext";
import { Log } from "@/lib/schemas";

interface DashboardTableProps {
  logs: Log[];
}

export function DashboardTable({ logs }: DashboardTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { filters } = useFilters();
  const itemsPerPage = 5;

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      return (
        (!startDate || logDate >= startDate) &&
        (!endDate || logDate <= endDate) &&
        (!filters.logLevel || log.level === filters.logLevel) &&
        (!filters.serviceName ||
          log.service.toLowerCase().includes(filters.serviceName.toLowerCase()))
      );
    });
  }, [logs, filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const onPageChange = (page: number) => setCurrentPage(page);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="mt-4">
      <Table striped>
        <TableHead>
          <TableHeadCell>Timestamp</TableHeadCell>
          <TableHeadCell>Log Level</TableHeadCell>
          <TableHeadCell>Service Name</TableHeadCell>
          <TableHeadCell>Message</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {currentLogs.map((log) => (
            <TableRow
              key={log.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell>{formatDate(log.timestamp)}</TableCell>
              <TableCell>{log.level}</TableCell>
              <TableCell>{log.service}</TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons={true}
        />
      </div>
    </Card>
  );
}
