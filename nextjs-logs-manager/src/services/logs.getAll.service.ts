import axios, { AxiosResponse } from "axios";

/**
 * Interface representing a single log entry.
 */
export interface Log {
    id: number;
    timestamp: string;
    level: string;
    serviceName: string;
    message: string;
}

/**
 * Service for handling API requests related to logs.
 */
export const logService = {
    /**
     * Fetches logs from the API with optional query parameters for filtering or pagination.
     * @param params Optional query parameters for filtering or pagination.
     * @returns Promise<Log[]> A list of log entries.
     * @throws Will throw an error if the API request fails.
     */
    async fetchLogs(params?: Record<string, any>): Promise<Log[]> {
        try {
            const response: AxiosResponse<Log[]> = await axios.get("/api/log", {
                params, // Optional query params (e.g., { page: 1, filter: "ERROR" })
            });
            return response.data;
        } catch (error: any) {
            console.error("Error fetching logs:", error?.response?.data || error.message);
            throw new Error(error?.response?.data?.message || "Failed to fetch logs. Please try again later.");
        }
    },
};
