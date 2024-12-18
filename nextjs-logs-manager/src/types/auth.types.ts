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