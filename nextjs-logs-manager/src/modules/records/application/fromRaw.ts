import Timestamp from "@/src/modules/records/domain/Timestamp";
import Service from "@/src/modules/records/domain/Service";
import Message from "@/src/modules/records/domain/Message";
import LogRecord from "@/src/modules/records/domain/LogRecord";
import LogLevel from "@/src/modules/records/domain/LogLevel";

type Result =
  | {
      valid?: false;
      error: string;
      entity?: undefined;
    }
  | {
      valid: true;
      entity: LogRecord;
    };

const fromRaw = (raw: string): Result => {
  /*
   * raw format:
   * [YYYY-MM-DD HH:MM:SS] [LEVEL] SERVICE: MESSAGE
   * e.g.: [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.
   */
  const levels = Object.values(LogLevel).join("|");
  const regex = new RegExp(
    `^\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] \\[(${levels})\\] (\\S+): (.+)$`,
  );
  const match = raw.match(regex);
  if (!match) {
    return {
      valid: false,
      error: "Invalid log format",
    };
  }
  const primitives = {
    timestamp: match[1],
    level: match[2],
    service: match[3],
    message: match[4],
  };

  const timestamp = Timestamp.from(primitives.timestamp);
  const service = Service.from(primitives.service);
  const message = Message.from(primitives.message);
  if (!timestamp.valid) {
    return {
      valid: false,
      error: timestamp.error,
    };
  }
  if (!service.valid) {
    return {
      valid: false,
      error: service.error,
    };
  }
  if (!message.valid) {
    return {
      valid: false,
      error: message.error,
    };
  }
  // verify level
  if (!Object.values(LogLevel).includes(primitives.level as LogLevel)) {
    return {
      valid: false,
      error: "Invalid log level",
    };
  }
  return {
    valid: true,
    entity: {
      timestamp: timestamp.field.value,
      level: primitives.level as LogLevel,
      service: service.field.value,
      message: message.field.value,
    },
  };
};

export default fromRaw;
