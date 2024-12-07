import { LogEntry } from '@/types/logs'
import { parseLogText } from '@/utils/logParser'
import { storeAndGetLogs } from './logStorage'
import { rawMockLogs } from './mockData'

/**
 * Procesa logs crudos y los almacena
 * @param rawLogs - Texto crudo de logs
 * @returns Array de logs procesados
 */
export function processRawLogs(rawLogs: string): LogEntry[] {
  // 1. Parsear logs crudos a objetos LogEntry
  const parsedLogs = parseLogText(rawLogs)
  
  // 2. Almacenar logs procesados
  return storeAndGetLogs(parsedLogs)
}

/**
 * Inicializa el storage con logs de prueba
 * @returns Array de logs iniciales
 */
export function initializeWithMockLogs(): LogEntry[] {
  return processRawLogs(rawMockLogs)
}

/**
 * Obtiene todos los logs almacenados
 * Si no hay logs, inicializa con datos de prueba
 * @returns Array de logs
 */
export function getAllLogs(): LogEntry[] {
  const logs = storeAndGetLogs([])
  return logs.length === 0 ? initializeWithMockLogs() : logs
} 