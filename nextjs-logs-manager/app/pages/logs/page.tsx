'use client'

import { Table, Badge, TextInput, Select, Pagination, Button, Tooltip } from 'flowbite-react'
import { HiSearch, HiRefresh, HiTrash } from 'react-icons/hi'
import { getLogLevelColor } from '@/utils/logStyles'
import { useLogsManager } from './useLogsManager'
import { clearLogs } from '@/app/api/services/logStorage'

export default function LogsPage() {
  const { data: logs, pagination, filters, sorting, refreshLogs } = useLogsManager()

  const handleRefresh = () => {
    refreshLogs()
  }

  const handleClear = () => {
    if (window.confirm('¿Estás seguro? Esto eliminará todos los logs excepto el ejemplo inicial.')) {
      clearLogs()
      refreshLogs()
    }
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Registros del Sistema
        </h1>
        <div className="flex gap-2">
          <Tooltip content="Actualizar registros" placement="left">
            <Button 
              color="gray"
              size="sm"
              onClick={handleRefresh}
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <HiRefresh className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Limpiar todos los registros" placement="bottom">
            <Button 
              color="failure"
              size="sm"
              onClick={handleClear}
              className="hover:bg-red-600 dark:hover:bg-red-700"
            >
              <HiTrash className="h-5 w-5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <TextInput
          icon={HiSearch}
          placeholder="Buscar en mensajes..."
          className="md:col-span-2"
          value={filters.searchText}
          onChange={(e) => filters.setSearchText(e.target.value)}
        />
        <Select
          value={filters.selectedService}
          onChange={(e) => filters.setSelectedService(e.target.value)}
        >
          <option value="">Todos los servicios</option>
          {filters.uniqueServices.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </Select>
        <Select
          value={filters.selectedLevel}
          onChange={(e) => filters.setSelectedLevel(e.target.value)}
        >
          <option value="">Todos los niveles</option>
          {filters.uniqueLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </Select>
      </div>

      {/* Tabla de Logs */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-44">
              <div className="flex items-center gap-2">
                Timestamp
                <button
                  onClick={sorting.toggle}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title={sorting.direction === 'desc' ? 'Más reciente primero' : 'Más antiguo primero'}
                >
                  {sorting.direction === 'desc' ? '↓' : '↑'}
                </button>
              </div>
            </Table.HeadCell>
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
                <Table.Cell className="text-gray-900 dark:text-white">
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
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setCurrentPage}
          theme={{
            pages: {
              base: "inline-flex items-center mt-2 -space-x-px xs:mt-0",
              showIcon: "inline-flex",
              previous: {
                base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                icon: "h-5 w-5"
              },
              next: {
                base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                icon: "h-5 w-5"
              },
              selector: {
                base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                active: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
                disabled: "opacity-50 cursor-normal"
              }
            }
          }}
          showIcons
        />
      </div>
    </div>
  )
} 