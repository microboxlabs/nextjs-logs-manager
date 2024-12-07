import { LogEntry } from '@/types/logs'
import { parseLogText } from '@/utils/logParser'
import { rawMockLogs } from './mockData'

/**
 * Procesa logs crudos
 * @param rawLogs - Texto crudo de logs
 * @returns Array de logs procesados
 */
export function processRawLogs(rawLogs: string): LogEntry[] {
  return parseLogText(rawLogs)
}

/**
 * Obtiene todos los logs
 * En un entorno real, esto se conectaría a una API o base de datos
 * @returns Array de logs
 */
export function getAllLogs(): LogEntry[] {
  // Por ahora, siempre procesamos los logs del mock
  return processRawLogs(rawMockLogs)
} 