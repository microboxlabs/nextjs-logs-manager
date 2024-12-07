import { LogLevel, LogService, LogEntry } from '@/types/logs'

/**
 * Parsea una línea de log en formato [timestamp] [level] service: message
 * @param logLine - Línea de texto del log a parsear
 * @returns Objeto LogEntry parseado
 */
export function parseLogLine(logLine: string): LogEntry {
  const matches = logLine.match(/\[(.*?)\] \[(.*?)\] (.*?): (.*)/)
  if (!matches) throw new Error(`Línea inválida: ${logLine}`)

  const [, timestamp, level, service, message] = matches

  return {
    id: crypto.randomUUID(),
    timestamp,
    level: level as LogLevel,
    service: service as LogService,
    message
  }
}

/**
 * Parsea múltiples líneas de log
 * @param rawLogText - Texto completo con múltiples líneas de log
 * @returns Array de LogEntry parseados
 */
export function parseLogText(rawLogText: string): LogEntry[] {
  const logLines = rawLogText.split('\n').filter(line => line.trim())
  return logLines.map(parseLogLine)
} 