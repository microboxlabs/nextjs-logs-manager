import { useState, useEffect } from 'react'
import { LogEntry, LogLevel, LogService } from '@/types/logs'
import { getAllLogs } from '@/app/api/services/logProcessor'

// Tipos para los filtros y paginación
type LogFilters = {
  searchText: string
  service: string
  level: string
}

type PaginationConfig = {
  currentPage: number
  logsPerPage: number
}

export const useLogsManager = () => {
  // Estado principal
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])

  // Estado de filtros
  const [searchText, setSearchText] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10

  // Obtener valores únicos de los logs
  const getUniqueValues = (logs: LogEntry[]) => {
    const services = logs
      .reduce((acc, log) => 
        acc.includes(log.service) ? acc : [...acc, log.service], 
        [] as LogService[]
      ).sort()
    
    const levels = logs
      .reduce((acc, log) => 
        acc.includes(log.level) ? acc : [...acc, log.level], 
        [] as LogLevel[]
      ).sort()

    return { services, levels }
  }

  // Filtrar logs según criterios
  const filterLogs = (logs: LogEntry[], filters: LogFilters) => {
    return logs.filter(log => {
      const matchesSearch = !filters.searchText || 
        log.message.toLowerCase().includes(filters.searchText.toLowerCase())
      
      const matchesService = !filters.service || 
        log.service === filters.service
      
      const matchesLevel = !filters.level || 
        log.level === filters.level

      return matchesSearch && matchesService && matchesLevel
    })
  }

  // Paginar logs
  const paginateLogs = (logs: LogEntry[], { currentPage, logsPerPage }: PaginationConfig) => {
    const indexOfLastLog = currentPage * logsPerPage
    const indexOfFirstLog = indexOfLastLog - logsPerPage
    
    const result = {
      currentLogs: logs.slice(indexOfFirstLog, indexOfLastLog),
      totalPages: Math.ceil(logs.length / logsPerPage)
    }

    console.log('Pagination Debug:', {
      total: logs.length,
      currentPage,
      logsPerPage,
      indexOfFirstLog,
      indexOfLastLog,
      currentLogsLength: result.currentLogs.length,
      totalPages: result.totalPages
    })

    return result
  }

  // Cargar logs iniciales
  useEffect(() => {
    const processedLogs = getAllLogs()
    setLogs(processedLogs)
    setFilteredLogs(processedLogs)
  }, [])

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    const filtered = filterLogs(logs, {
      searchText,
      service: selectedService,
      level: selectedLevel
    })
    setFilteredLogs(filtered)
  }, [logs, searchText, selectedService, selectedLevel])

  // Obtener valores únicos y logs paginados
  const { services: uniqueServices, levels: uniqueLevels } = getUniqueValues(logs)
  const { currentLogs, totalPages } = paginateLogs(filteredLogs, {
    currentPage,
    logsPerPage
  })

  return {
    // Datos paginados y filtrados
    currentLogs,
    totalPages,
    currentPage,
    
    // Opciones de filtro
    uniqueServices,
    uniqueLevels,
    
    // Estado actual de filtros
    searchText,
    selectedService,
    selectedLevel,
    
    // Funciones de actualización
    setSearchText,
    setSelectedService,
    setSelectedLevel,
    setCurrentPage
  }
} 