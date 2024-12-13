import axios from "axios";

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        role: string;
    };
}

export interface LoginValues {
    email: string;
    password: string;
}

/**
 * Realiza el login con las credenciales del usuario.
 * @param values Credenciales del usuario (email y password).
 * @returns Objeto con el token y datos del usuario.
 */
export const login = async (values: LoginValues): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>("/api/auth/login", values);
    return response.data;
};
