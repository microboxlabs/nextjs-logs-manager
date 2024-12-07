import { LogLevel } from '@/types/logs'

type BadgeColor = 'info' | 'failure' | 'warning' | 'success' | 'default'

/**
 * Mapa de colores para niveles de log
 * Extensible para futuros niveles
 */
export const LOG_LEVEL_COLORS: Record<LogLevel, BadgeColor> = {
  [LogLevel.INFO]: 'info',
  [LogLevel.ERROR]: 'failure',
  [LogLevel.WARNING]: 'warning',
}

/**
 * Obtiene el color del badge para un nivel
 * @param level - Nivel del log
 * @returns Color del badge para el nivel
 */
export function getLogLevelColor(level: LogLevel): BadgeColor {
  return LOG_LEVEL_COLORS[level] || 'default'
} 