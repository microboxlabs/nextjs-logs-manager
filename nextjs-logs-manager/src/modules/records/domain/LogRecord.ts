import LogLevel from "./LogLevel";

type LogRecord = {
  timestamp: Date;
  level: LogLevel;
  service: string;
  message: string;
};

export default LogRecord;
