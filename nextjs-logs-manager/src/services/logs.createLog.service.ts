import axios from "axios";

export interface CreateLogData {
    levelId: number;
    serviceId: number;
    message: string;
}

export interface CreateLogResponse {
    id: number;
    timestamp: string;
    level: string;
    serviceName: string;
    message: string;
}

/**
 * Crea un nuevo log en la base de datos.
 * @param data Datos del log: levelId, serviceId y message.
 * @returns Respuesta del servidor con los datos del log creado.
 * @throws Error si la creación falla.
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
