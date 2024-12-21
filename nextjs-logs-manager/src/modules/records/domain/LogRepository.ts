import LogRecord from "./LogRecord";
import { LogFilters } from "@/src/modules/records/application/readLogs";

export default interface LogRepository {
  getAll(filters: LogFilters): Promise<LogRecord[]>;

  save(records: LogRecord[]): Promise<void>;
}
