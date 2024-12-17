"use client";

import Breadcrumb from "@/src/components/Breadcrumb";
import CreateLogsForm from "@/src/forms/createLogsForm";

const AdminCreatePage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="mx-auto mb-4 w-full max-w-7xl">
                <Breadcrumb />
            </div>

            <div className="mx-auto w-full max-w-7xl rounded-lg bg-white p-6 text-gray-900 shadow-lg dark:bg-gray-800 dark:text-white sm:p-8">
                <h2 className="mb-4 text-center text-2xl font-bold">Admin - Create Log</h2>
                <p className="mb-6 text-center text-base text-gray-500 dark:text-gray-400">
                    Fill in the details below to create a new log entry.
                </p>
                <CreateLogsForm />
            </div>
        </div>
    );
};

export default AdminCreatePage;
