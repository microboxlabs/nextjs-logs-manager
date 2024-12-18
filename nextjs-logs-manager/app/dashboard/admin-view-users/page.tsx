"use client";

import { useEffect, useState } from "react";
import DataTable from "../../../src/components/DataTable";
import Loader from "../../../src/components/Loader";
import { columns_users } from "../../../src/constants/columns.users-view";
import { useAlert } from "../../../src/contexts/AlertContext";
import { fetchUsers } from "../../../src/services/users.getAll.service";
import Breadcrumb from "../../../src/components/Breadcrumb";
interface User {
    id: number;
    email: string;
    role: string;
    permissions?: string[];
}

const ViewUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                // console.error("Error fetching users:", error);
                showAlert("error", "Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [showAlert]);

    useEffect(() => {
        const pendingAlert = sessionStorage.getItem("pendingAlert");
        if (pendingAlert) {
            const { type, message } = JSON.parse(pendingAlert);

            setTimeout(() => {
                showAlert(type, message);
                sessionStorage.removeItem("pendingAlert");
            }, 500);
        }
    }, [showAlert]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-6xl p-4">
                {/* Breadcrumb */}
                <Breadcrumb />

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader overlay={false} />
                    </div>
                ) : (
                    <div className="pt-10">
                        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                            User Management
                        </h1>
                        <DataTable data={users} columns={columns_users} pageSize={5} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewUsersPage;
