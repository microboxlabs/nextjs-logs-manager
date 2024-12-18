import axios from "axios";
import { CreateLogData, CreateLogResponse } from "../types/logs.types";

/**
 * Creates a new log entry by sending a POST request to the "/api/log" endpoint.
 *
 * @param data - The data for the log entry to be created.
 * @returns A promise that resolves to the response data of the created log entry.
 * @throws An error if the log creation fails, with a message indicating the failure reason.
 */
export const createLog = async (
    data: CreateLogData
): Promise<CreateLogResponse> => {
    try {
        const response = await axios.post<CreateLogResponse>("/api/log", data);
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "Failed to create log.";
        throw new Error(errorMessage);
    }
};
