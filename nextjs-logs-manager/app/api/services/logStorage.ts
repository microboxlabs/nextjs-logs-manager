import { LogEntry } from '@/types/logs'

const STORAGE_KEY = 'logs'

/**
 * Obtiene los logs almacenados
 * @returns Array de logs desde localStorage
 */
export function getLogs(): LogEntry[] {
  if (typeof window === 'undefined') return []
  const storedLogs = localStorage.getItem(STORAGE_KEY)
  return storedLogs ? JSON.parse(storedLogs) : []
}

/**
 * Almacena logs y retorna todos los logs
 * @param newLogs - Nuevos logs a almacenar
 * @returns Array combinado de logs existentes y nuevos
 */
export function storeAndGetLogs(newLogs: LogEntry[]): LogEntry[] {
  const existingLogs = getLogs()
  const updatedLogs = [...existingLogs, ...newLogs]
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))
  }
  
  return updatedLogs
} 