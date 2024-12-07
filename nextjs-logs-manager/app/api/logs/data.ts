import { LogEntry } from '@/types/logs'
import { parseLogText } from '@/utils/logParser'
import { storeAndGetLogs } from '../services/logStorage'

// Obtener y procesar logs crudos
export function processAndStoreLogs(rawLogText: string): LogEntry[] {
  // Parsear los logs crudos
  const parsedLogs = parseLogText(rawLogText)
  // Almacenar y obtener todos los logs actualizados
  return storeAndGetLogs(parsedLogs)
} 