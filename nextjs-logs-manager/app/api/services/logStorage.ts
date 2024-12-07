import { LogEntry } from '@/types/logs'
import { mockLogs } from '@/app/api/services/mockData'

/**
 * Obtiene los logs almacenados del localStorage o los mock logs si estamos en el servidor
 * @returns Array de LogEntry
 */
export function getRawLogs(): LogEntry[] {
  if (typeof window === 'undefined') return mockLogs
  const storedLogs = localStorage.getItem('logs')
  return storedLogs ? JSON.parse(storedLogs) : mockLogs
}

/**
 * Almacena logs en localStorage
 * @param logs - Array de logs a almacenar
 */
export function storeLogs(logs: LogEntry[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('logs', JSON.stringify(logs))
  }
}

/**
 * Agrega nuevos logs a los existentes
 * @param newLogs - Nuevos logs a agregar
 * @returns Array actualizado de todos los logs
 */
export function appendLogs(newLogs: LogEntry[]): LogEntry[] {
  const existingLogs = getRawLogs()
  const updatedLogs = [...existingLogs, ...newLogs]
  storeLogs(updatedLogs)
  return updatedLogs
} 