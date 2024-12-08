import { useState, useEffect, useCallback } from 'react'
import { LogEntry } from '@/types/logs'
import { useSession } from 'next-auth/react'
import { getLogs } from '@/app/api/services/logStorage'
import { LogHandler } from '@/app/api/services/logHandler'

/**
 * Hook para manejar operaciones CRUD de logs
 */
export const useLogsManager = () => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Recargar logs desde el storage
  const refreshLogs = useCallback(() => {
    setLogs(getLogs())
  }, [])

  // Eliminar un log específico
  const handleDeleteLog = useCallback((id: string) => {
    if (!isAdmin) return
    LogHandler.deleteLog(id)
    refreshLogs()
  }, [isAdmin, refreshLogs])

  // Cargar logs iniciales y escuchar actualizaciones
  useEffect(() => {
    refreshLogs()
    window.addEventListener('logsUpdated', refreshLogs)
    return () => window.removeEventListener('logsUpdated', refreshLogs)
  }, [refreshLogs])

  return {
    logs,
    isAdmin,
    refreshLogs,
    handleDeleteLog
  }
} 