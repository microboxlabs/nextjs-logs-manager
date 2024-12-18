import axios, { AxiosResponse } from "axios";
import { LogLevel, Service } from "../types/db.types";

/**
 * Service for fetching log levels and services.
 */
export const logLevelAndServiceService = {
    /**
     * Fetches all log levels from the API.
     * @returns A promise that resolves to a list of log levels.
     * @throws Will throw an error if the API request fails.
     */
    async fetchLevels(): Promise<LogLevel[]> {
        try {
            const response: AxiosResponse<LogLevel[]> = await axios.get("/api/levels");
            return response.data;
        } catch (error: any) {
            console.error("Error fetching log levels:", error?.response?.data || error.message);
            throw new Error(error?.response?.data?.error || "Failed to fetch levels.");
        }
    },

    /**
     * Fetches all services from the API.
     * @returns A promise that resolves to a list of services.
     * @throws Will throw an error if the API request fails.
     */
    async fetchServices(): Promise<Service[]> {
        try {
            const response: AxiosResponse<Service[]> = await axios.get("/api/services");
            return response.data;
        } catch (error: any) {
            console.error("Error fetching services:", error?.response?.data || error.message);
            throw new Error(error?.response?.data?.error || "Failed to fetch services.");
        }
    },
};
