import axios from "axios";

export interface Log {
    id: number;
    timestamp: string;
    level: string;
    serviceName: string;
    message: string;
}

export const logService = {
    async fetchLogs(): Promise<Log[]> {
        try {
            const response = await axios.get<Log[]>("/api/log");
            return response.data;
        } catch (error) {
            console.error("Error fetching logs:", error);
            throw error; // Re-throw the error for error handling
        }
    },
};
