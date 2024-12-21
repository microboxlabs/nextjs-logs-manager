import LogRepository from "@/src/modules/records/domain/LogRepository";
import PrismaLogRepository from "@/src/modules/records/infrastructure/PrismaLogRepository";
import saveLogs from "../application/saveLogs";
import readLogs, { LogFilters } from "../application/readLogs";
import LogRecord from "@/src/modules/records/domain/LogRecord";

export default class LogsService {
  private repository: LogRepository = new PrismaLogRepository();

  async save(records: LogRecord[]) {
    return await saveLogs({
      records: records,
      repository: this.repository,
    });
  }

  async read(filters: LogFilters) {
    return await readLogs({
      filters,
      repository: this.repository,
    });
  }
}
