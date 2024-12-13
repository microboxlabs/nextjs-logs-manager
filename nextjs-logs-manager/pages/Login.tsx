"use client";

import { useState } from "react";
import LoginForm from "@/forms/loginForm";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useAuth } from "@/lib/authContext";
import { login } from "@/services/auth.login.service";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login: loginContext } = useAuth();
    const router = useRouter();

    const handleSubmit = async (values: { email: string; password: string }) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await login(values);
            const { token, user } = response;

            localStorage.setItem("access_token", token);
            localStorage.setItem("user", JSON.stringify(user));

            loginContext();

            router.push("/dashboard");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
                    Welcome Back
                </h2>
                {errorMessage && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-700 dark:bg-red-900 dark:text-red-300">
                        {errorMessage}
                    </div>
                )}
                <LoginForm handleSubmit={handleSubmit} />
                {loading && <Loader overlay={true} />}
            </div>
        </div>
    );
};

export default LoginPage;
