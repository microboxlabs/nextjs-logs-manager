import { LogEntry } from '@/types/logs'
import { getLogs, storeAndGetLogs } from './logStorage'

/**
 * Manejador de operaciones CRUD para logs
 */
export class LogHandler {
  /**
   * Elimina un log específico por su ID
   * @param id - ID del log a eliminar
   * @returns Array actualizado de logs
   */
  static deleteLog(id: string): LogEntry[] {
    const currentLogs = getLogs()
    const updatedLogs = currentLogs.filter(log => log.id !== id)
    localStorage.setItem('logs', JSON.stringify(updatedLogs))
    window.dispatchEvent(new Event('logsUpdated'))
    return updatedLogs
  }
} 