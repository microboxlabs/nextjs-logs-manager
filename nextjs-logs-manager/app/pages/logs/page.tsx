'use client'

import { Table, Badge, TextInput, Select, Pagination } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import { getLogLevelColor } from '@/utils/logStyles'
import { useLogsManager } from './useLogsManager'

export default function LogsPage() {
  const {
    currentLogs,
    totalPages,
    currentPage,
    uniqueServices,
    uniqueLevels,
    searchText,
    selectedService,
    selectedLevel,
    setSearchText,
    setSelectedService,
    setSelectedLevel,
    setCurrentPage
  } = useLogsManager()

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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Todos los servicios</option>
          {uniqueServices.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </Select>
        <Select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Todos los niveles</option>
          {uniqueLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
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
            {currentLogs.map((log) => (
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          theme={{
            pages: {
              base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
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