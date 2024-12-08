import { LogEntry } from '@/types/logs'
import { parseLogText } from '@/utils/logParser'
import { storeAndGetLogs } from './logStorage'

/**
 * Procesa texto crudo de logs y los almacena en el storage
 * @param rawLogs - Texto con formato "timestamp | level | service | message"
 * @returns Array de logs procesados y almacenados
 */
export function processRawLogs(rawLogs: string): LogEntry[] {
  const processedLogs = parseLogText(rawLogs)
  return storeAndGetLogs(processedLogs)
} 