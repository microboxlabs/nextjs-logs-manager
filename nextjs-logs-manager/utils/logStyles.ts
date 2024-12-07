import { LogLevel } from '@/types/logs'

type BadgeColor = 'info' | 'failure' | 'warning' | 'success' | 'default'

/**
 * Mapa de colores para cada nivel de log
 * Fácilmente extensible para nuevos niveles
 */
export const LOG_LEVEL_COLORS: Record<LogLevel, BadgeColor> = {
  [LogLevel.INFO]: 'info',
  [LogLevel.ERROR]: 'failure',
  [LogLevel.WARNING]: 'warning',
  // Podemos agregar más niveles fácilmente:
  // [LogLevel.DEBUG]: 'default',
  // [LogLevel.CRITICAL]: 'failure',
  // [LogLevel.SUCCESS]: 'success',
}

/**
 * Obtiene el color del badge para un nivel de log
 * @param level - Nivel del log
 * @returns Color del badge
 */
export function getLogLevelColor(level: LogLevel): BadgeColor {
  return LOG_LEVEL_COLORS[level] || 'default'
} 