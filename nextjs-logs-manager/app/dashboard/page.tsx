"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "flowbite-react";
import { FaFileAlt, FaPlus, FaUsers, FaCogs } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";

interface User {
    id: number;
    email: string;
    role: string;
}

const DashboardPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
            router.push("/");
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const breadcrumbItems = [{ label: "Dashboard" }];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 px-4 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-6xl p-4">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
                    Welcome Back, {user?.email || "User"}
                </h2>
                <p className="mb-6 text-center text-gray-700 dark:text-gray-300 sm:text-lg">
                    Select an action to proceed
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card
                        onClick={() => handleNavigation("/dashboard/logs-view")}
                        className="cursor-pointer transition hover:shadow-lg"
                    >
                        <FaFileAlt className="mx-auto text-4xl text-gray-500 dark:text-gray-300" />
                        <h3 className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                            View Logs
                        </h3>
                    </Card>

                    {user?.role === "ADMIN" && (
                        <Card
                            onClick={() => handleNavigation("/dashboard/logs/create")}
                            className="cursor-pointer transition hover:shadow-lg"
                        >
                            <FaPlus className="mx-auto text-4xl text-gray-500 dark:text-gray-300" />
                            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Log
                            </h3>
                        </Card>
                    )}

                    {user?.role === "ADMIN" && (
                        <Card
                            onClick={() => handleNavigation("/dashboard/users")}
                            className="cursor-pointer transition hover:shadow-lg"
                        >
                            <FaUsers className="mx-auto text-4xl text-gray-500 dark:text-gray-300" />
                            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                                View All Users & Roles
                            </h3>
                        </Card>
                    )}

                    {user?.role === "ADMIN" && (
                        <Card
                            onClick={() => handleNavigation("/dashboard/settings")}
                            className="cursor-pointer transition hover:shadow-lg"
                        >
                            <FaCogs className="mx-auto text-4xl text-gray-500 dark:text-gray-300" />
                            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                                Manage Settings
                            </h3>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
