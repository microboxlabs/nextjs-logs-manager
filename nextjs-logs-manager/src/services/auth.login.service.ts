import axios, { AxiosError } from "axios";
import { LoginResponse, LoginValues } from "../types/auth.types";

/**
 * Logs in a user with the provided credentials.
 *
 * @param values - The login credentials.
 * @returns A promise that resolves to the login response.
 * @throws An error if the login request fails.
 */
export const login = async (values: LoginValues): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>("/api/auth/login", values);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || "Error during login.");
    }
};
