import { LogEntry } from '@/types/logs'

const STORAGE_KEY = 'logs'
const LOGS_UPDATED_EVENT = 'logsUpdated'

/**
 * Obtiene todos los logs almacenados en localStorage
 * @returns Array de logs o array vacío si no hay datos
 */
export function getLogs(): LogEntry[] {
  if (typeof window === 'undefined') return []
  const storedLogs = localStorage.getItem(STORAGE_KEY)
  return storedLogs ? JSON.parse(storedLogs) : []
}

/**
 * Almacena nuevos logs y los combina con los existentes
 * @param newLogs - Logs nuevos a almacenar
 * @returns Array combinado de logs existentes y nuevos
 */
export function storeAndGetLogs(newLogs: LogEntry[]): LogEntry[] {
  if (typeof window === 'undefined') return []
  
  const existingLogs = getLogs()
  const updatedLogs = [...existingLogs, ...newLogs]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))
  window.dispatchEvent(new Event(LOGS_UPDATED_EVENT))
  
  return updatedLogs
}

/**
 * Elimina todos los logs del almacenamiento
 * Dispara evento de actualización
 */
export function clearLogs(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(LOGS_UPDATED_EVENT))
} 