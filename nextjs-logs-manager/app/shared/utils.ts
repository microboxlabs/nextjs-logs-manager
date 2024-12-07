import { v4 as uuid } from "uuid";
import type { TLog } from "@/app/shared/types";

export const generateId = () => uuid();

export const extractLogsFromFile = (content: string) => {
  const logs: TLog[] = [];

  const fileLines = content.split("\n");

  for (let i = 0; i < fileLines.length; i++) {
    const lineArray = fileLines[i].split(" ");

    const date = lineArray[0].replace("[", "");
    const time = lineArray[1].replace("]", "");

    const level = lineArray[2].replace("[", "").replace("]", "");
    const serviceName = lineArray[3].replace(":", "");
    const message = fileLines[i].split(": ")[1];

    const newLog = {
      date,
      time,
      level,
      serviceName,
      message,
    };

    // console.log(newLog);
    // console.log(dateObj.toJSON());
    // console.log(datetimeObj.toTimeString());

    logs.push(newLog);
  }

  return logs;
};

