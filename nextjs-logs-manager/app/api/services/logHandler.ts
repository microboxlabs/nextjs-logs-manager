import { LogEntry } from '@/types/logs'
import { getLogs } from './logStorage'

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

  /**
   * Actualiza un log existente
   * @param id - ID del log a actualizar
   * @param updates - Campos a actualizar del log
   * @returns Array actualizado de logs
   */
  static updateLog(id: string, updates: Partial<LogEntry>): LogEntry[] {
    const currentLogs = getLogs()
    const updatedLogs = currentLogs.map(log => 
      log.id === id ? { ...log, ...updates } : log
    )
    localStorage.setItem('logs', JSON.stringify(updatedLogs))
    window.dispatchEvent(new Event('logsUpdated'))
    return updatedLogs
  }
} 