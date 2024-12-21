import LogRepository from "@/src/modules/records/domain/LogRepository";
import LogRecord from "@/src/modules/records/domain/LogRecord";
import LogLevel from "../domain/LogLevel";

export type LogFilters = {
  from?: Date;
  to?: Date;
  service?: string;
  message?: string;
  level?: LogLevel;
};

const readLogs = ({
  filters,
  repository,
}: {
  filters: LogFilters;
  repository: LogRepository;
}): Promise<LogRecord[]> => {
  return repository.getAll(filters);
};

export default readLogs;
