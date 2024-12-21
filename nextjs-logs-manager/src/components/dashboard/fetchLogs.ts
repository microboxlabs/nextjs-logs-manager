import nextConfig from "@/next.config.mjs";
import { LogFilters } from "@/src/modules/records/application/readLogs";
import LogRecord from "@/src/modules/records/domain/LogRecord";

type Result =
  | {
      type: "success";
      records: LogRecord[];
    }
  | {
      type: "error";
      message: string;
    };

const fetchLogs = async ({
  filters,
}: {
  filters: LogFilters;
}): Promise<Result> => {
  const url = `${nextConfig.env.API_URL}/api/records`;
  const endpoint =
    `${url}?` +
    Object.entries(filters)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        return {
          type: "success",
          records: data.records as LogRecord[],
        } as Result;
      }
      return {
        type: "error",
        message: data.error,
      } as Result;
    })
    .catch((err) => {
      return {
        type: "error",
        message: err.message,
      } as Result;
    });
};

export default fetchLogs;
