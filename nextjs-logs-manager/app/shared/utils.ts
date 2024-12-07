import { v4 as uuid } from "uuid";
import type { TLog } from "@/app/shared/types";

export const generateId = () => uuid();

export const extractLogsFromFile = (content: string) => {
  const logs: TLog[] = [];

  const fileLines = content.split("\n");

  for (let i = 0; i < fileLines.length; i++) {
    const lineArray = fileLines[i].split(" ");

    // Date and time fields are Date type, it parses date strings to Date objts
    const date = lineArray[0].replace("[", "");
    const dateElements = date.split("-").map((e) => Number(e));

    const year = dateElements[0];
    // Cause months in Date are zero-indexed
    const month = dateElements[1] - 1;
    const day = dateElements[2];

    const dateObj = new Date(year, month, day);

    const time = lineArray[1].replace("]", "");
    const timeElements = time.split(":").map((e) => Number(e));

    const datetimeObj = new Date(
      year,
      month,
      day,
      timeElements[0],
      timeElements[1],
      timeElements[2],
    );
    const level = lineArray[2].replace("[", "").replace("]", "");
    const serviceName = lineArray[3].replace(":", "");
    const message = fileLines[i].split(": ")[1];

    const newLog = {
      date: dateObj,
      time: datetimeObj,
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

