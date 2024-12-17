import { LogLevel, Service } from "@/src/types/db.types";

export const fetchLevels = async (): Promise<LogLevel[]> => {
    const response = await fetch("/api/levels");
    if (!response.ok) throw new Error("Failed to fetch levels.");
    return response.json();
};

export const fetchServices = async (): Promise<Service[]> => {
    const response = await fetch("/api/services");
    if (!response.ok) throw new Error("Failed to fetch services.");
    return response.json();
};
