import { useState, useEffect, useCallback } from 'react'
import { LogEntry, LogLevel, LogService } from '@/types/logs'
import { useSession } from 'next-auth/react'
import { getLogs } from '@/app/api/services/logStorage'
import { LogHandler } from '@/app/api/services/logHandler'

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
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  // Estado principal
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Estado de filtros
  const [searchText, setSearchText] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10

  // Estado de rango de fechas
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  })

  // Ordenar logs por timestamp
  const sortLogsByTimestamp = (logs: LogEntry[], direction: 'asc' | 'desc'): LogEntry[] => {
    return [...logs].sort((a, b) => {
      const comparison = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      return direction === 'desc' ? comparison : -comparison
    })
  }

  // Toggle dirección de ordenamiento
  const toggleSortDirection = () => {
    setSortDirection(prev => {
      const newDirection = prev === 'desc' ? 'asc' : 'desc'
      const newSortedLogs = sortLogsByTimestamp(logs, newDirection)
      setLogs(newSortedLogs)
      setFilteredLogs(sortLogsByTimestamp(filteredLogs, newDirection))
      return newDirection
    })
  }

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
  const filterLogs = useCallback(() => {
    return logs.filter(log => {
      const logDate = new Date(log.timestamp)
      
      // Filtro de fecha
      const matchesDateRange = !dateRange.start || !dateRange.end || 
        (logDate >= dateRange.start && logDate <= dateRange.end)
      
      // Filtro de texto
      const matchesSearch = !searchText || 
        log.message.toLowerCase().includes(searchText.toLowerCase())
      
      // Filtros de nivel y servicio
      const matchesLevel = !selectedLevel || log.level === selectedLevel
      const matchesService = !selectedService || log.service === selectedService

      return matchesDateRange && matchesSearch && matchesLevel && matchesService
    })
  }, [logs, dateRange, searchText, selectedLevel, selectedService])

  // Paginar logs
  const paginateLogs = (logs: LogEntry[], { currentPage, logsPerPage }: PaginationConfig) => {
    const indexOfLastLog = currentPage * logsPerPage
    const indexOfFirstLog = indexOfLastLog - logsPerPage
    
    return {
      currentLogs: logs.slice(indexOfFirstLog, indexOfLastLog),
      totalPages: Math.ceil(logs.length / logsPerPage)
    }
  }

  // Función para recargar los logs
  const refreshLogs = useCallback(() => {
    const currentLogs = getLogs()
    const sortedLogs = sortLogsByTimestamp(currentLogs, sortDirection)
    setLogs(sortedLogs)
    setFilteredLogs(sortedLogs)
  }, [sortDirection])

  // Cargar logs iniciales y escuchar actualizaciones
  useEffect(() => {
    refreshLogs()
    
    window.addEventListener('logsUpdated', refreshLogs)
    return () => window.removeEventListener('logsUpdated', refreshLogs)
  }, [refreshLogs])

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    const filtered = logs.filter(log => {
      const logDate = new Date(log.timestamp)
      
      // Filtro de fecha
      const matchesDateRange = !dateRange.start || !dateRange.end || (
        logDate >= dateRange.start && 
        logDate <= new Date(dateRange.end.getTime() + 24 * 60 * 60 * 1000 - 1) // Incluir todo el día final
      )
      
      // Otros filtros
      const matchesSearch = !searchText || 
        log.message.toLowerCase().includes(searchText.toLowerCase())
      const matchesLevel = !selectedLevel || log.level === selectedLevel
      const matchesService = !selectedService || log.service === selectedService

      return matchesDateRange && matchesSearch && matchesLevel && matchesService
    })

    setFilteredLogs(sortLogsByTimestamp(filtered, sortDirection))
  }, [logs, searchText, selectedService, selectedLevel, dateRange, sortDirection])

  // Obtener valores únicos y logs paginados
  const { services: uniqueServices, levels: uniqueLevels } = getUniqueValues(logs)
  const { currentLogs, totalPages } = paginateLogs(filteredLogs, {
    currentPage,
    logsPerPage
  })

  const handleDeleteLog = useCallback((id: string) => {
    if (!isAdmin) return
    LogHandler.deleteLog(id)
    refreshLogs()
  }, [isAdmin, refreshLogs])

  return {
    pagination: {
      currentPage,
      totalPages,
      setCurrentPage
    },
    filters: {
      searchText,
      selectedService,
      selectedLevel,
      setSearchText,
      setSelectedService,
      setSelectedLevel,
      uniqueServices,
      uniqueLevels,
      dateRange: {
        startDate: dateRange.start,
        endDate: dateRange.end,
        setDateRange: (start: Date | null, end: Date | null) => setDateRange({ start, end })
      }
    },
    sorting: {
      direction: sortDirection,
      toggle: toggleSortDirection
    },
    data: currentLogs,
    isAdmin,
    refreshLogs,
    handleDeleteLog
  }
} 