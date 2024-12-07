'use client'

import { useEffect, useState } from 'react'
import { Table, Badge, TextInput, Select, Pagination } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import { LogEntry } from '@/types/logs'
import { getLogs } from '@/app/api/services/logStorage'
import { getLogLevelColor } from '@/utils/logStyles'

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // Cargar logs procesados al montar el componente
    const processedLogs = getLogs()
    setLogs(processedLogs)
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Registros del Sistema
        </h1>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <TextInput
          icon={HiSearch}
          placeholder="Buscar en mensajes..."
          className="md:col-span-2"
        />
        <Select>
          <option value="">Todos los servicios</option>
          <option value="Service-A">Service A</option>
          <option value="Service-B">Service B</option>
          <option value="Service-C">Service C</option>
        </Select>
        <Select>
          <option value="">Todos los niveles</option>
          <option value="INFO">Info</option>
          <option value="WARNING">Warning</option>
          <option value="ERROR">Error</option>
        </Select>
      </div>

      {/* Tabla de Logs */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-44">Timestamp</Table.HeadCell>
            <Table.HeadCell className="w-28">Nivel</Table.HeadCell>
            <Table.HeadCell className="w-32">Servicio</Table.HeadCell>
            <Table.HeadCell>Mensaje</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {logs.map((log) => (
              <Table.Row 
                key={log.id} 
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {log.timestamp}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getLogLevelColor(log.level)}>
                    {log.level}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {log.service}
                </Table.Cell>
                <Table.Cell className="text-gray-700 dark:text-gray-300">
                  {log.message}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center mt-4">
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          showIcons
        />
      </div>
    </div>
  )
} 