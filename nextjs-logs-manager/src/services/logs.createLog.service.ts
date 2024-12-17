import { LogEntry } from "@/src/types/db.types";

export const createLog = async (data: Pick<LogEntry, "levelId" | "serviceId" | "message">) => {
    const response = await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create log.");
    }

    return response.json();
};
