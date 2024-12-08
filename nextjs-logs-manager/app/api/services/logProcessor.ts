import { LogEntry } from '@/types/logs'
import { parseLogText } from '@/utils/logParser'
import { getLogs, storeAndGetLogs } from './logStorage'
import { rawMockLogs } from './mockData'

/**
 * Procesa logs crudos y los almacena
 * @param rawLogs - Texto crudo de logs
 * @returns Array de logs procesados y almacenados
 */
export function processRawLogs(rawLogs: string): LogEntry[] {
  const processedLogs = parseLogText(rawLogs)
  return storeAndGetLogs(processedLogs)
}

/**
 * Obtiene todos los logs del storage
 * Si el storage está vacío, carga los mocks iniciales
 * @returns Array de logs almacenados
 */
export function getAllLogs(): LogEntry[] {
  const storedLogs = getLogs()
  
  // Si no hay logs almacenados, inicializar con los mocks
  if (storedLogs.length === 0) {
    const initialLogs = parseLogText(rawMockLogs)
    return storeAndGetLogs(initialLogs)
  }
  
  return storedLogs
} 