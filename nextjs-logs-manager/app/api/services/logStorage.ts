import { LogEntry } from '@/types/logs'
import { mockLogs } from './mockData'

const STORAGE_KEY = 'logs'

/**
 * Obtiene los logs almacenados y validados
 */
export function getLogs(): LogEntry[] {
  if (typeof window === 'undefined') return mockLogs
  const storedLogs = localStorage.getItem(STORAGE_KEY)
  return storedLogs ? JSON.parse(storedLogs) : mockLogs
}

/**
 * Almacena logs y retorna todos los logs actualizados
 */
export function storeAndGetLogs(newLogs: LogEntry[]): LogEntry[] {
  const existingLogs = getLogs()
  const updatedLogs = [...existingLogs, ...newLogs]
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))
  }
  
  return updatedLogs
} 