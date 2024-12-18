"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loader from "../../src/components/Loader";
import LoginForm from "../../src/forms/loginForm";


const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: { email: string; password: string }) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (result?.error) {
                setErrorMessage("Invalid email or password");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            // console.error("Login error:", error);
            setErrorMessage("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
            {loading && <Loader overlay={true} />}
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Welcome Back
                </h2>
                {errorMessage && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
                        {errorMessage}
                    </div>
                )}
                <LoginForm handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginPage;
