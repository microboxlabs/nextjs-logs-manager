import { createLogs, getLogs, countLogs, deleteAllLogs } from "../models/Log";
import { getDb } from '../../lib/db';


type CleanedLog = {
  timestamp: string;
  level: string;
  service: string;
  message: string;
};

class LogsController {
  static async addLogs(logs: CleanedLog[]) {
    const invalidLogs: CleanedLog[] = [];

    for (const log of logs) {
      try {
        await createLogs(log.timestamp, log.level, log.service, log.message);
      } catch (error) {
        console.error(`Error al insertar log: ${JSON.stringify(log)}`, error);
        invalidLogs.push(log);
      }
    }

    if (invalidLogs.length > 0) {
      console.warn("Logs inválidos:", invalidLogs);
    }
  }

  static async listLogs(page: number = 1, pageSize: number = 10, filters: any = {}) {
    try {
      const offset = (page - 1) * pageSize;
      let query = `SELECT id, timestamp, level, service, message 
                   FROM logs WHERE 1=1`;
      const params: any[] = [];
  
      // filtros especificos

      if (filters.level) {
        query += " AND LOWER(level) = LOWER(?)";
        params.push(filters.level);
      }
      if (filters.service) {
        query += " AND LOWER(service) LIKE LOWER(?)";
        params.push(`%${filters.service}%`);
      }
      if (filters.search) {
        query += " AND LOWER(message) LIKE LOWER(?)";
        params.push(`%${filters.search}%`);
      }
  
      // ordena por timestamp
      query += " ORDER BY timestamp DESC LIMIT ? OFFSET ?";
      params.push(pageSize, offset);
  
      const db = await getDb();
      const logs = await db.all(query, params);
  
      // contar registros totales que coinciden con los filtros
      const countQuery = `SELECT COUNT(*) as count FROM logs WHERE 1=1` +
        (filters.level ? " AND LOWER(level) = LOWER(?)" : "") +
        (filters.service ? " AND LOWER(service) LIKE LOWER(?)" : "") +
        (filters.search ? " AND LOWER(message) LIKE LOWER(?)" : "");
      const countParams = [...params.slice(0, -2)]; // Excluir limit y offset
      const totalResult = await db.get(countQuery, countParams);
  
      return { logs, total: totalResult?.count || 0 };
    } catch (error) {
      console.error("Error fetching logs:", error);
      throw new Error("Failed to fetch logs.");
    }
  }

  static async clearLogs() {
    try {
      await deleteAllLogs();
    } catch (error) {
      console.error("Error deleting logs:", error);
      throw new Error("Failed to delete logs.");
    }
  }
}

export default LogsController;