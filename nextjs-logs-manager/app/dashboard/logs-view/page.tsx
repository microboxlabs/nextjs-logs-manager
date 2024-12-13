"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DataTable from "@/components/DataTable";
import Loader from "@/components/Loader";
import { columns_logs } from "@/constants/columns.logs-view";
import { Log, logService } from "@/services/logs.getAll.service";

const ViewLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logsData = await logService.fetchLogs();
                setLogs(logsData);
            } catch (error) {
                console.error("Error fetching logs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Logs View" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-6xl p-4">
                <Breadcrumb items={breadcrumbItems} />
                {loading ? (
                    <div className="flex items-center justify-center">
                        <Loader overlay={false} />
                    </div>
                ) : (
                    <div className="pt-10">
                        <DataTable data={logs} columns={columns_logs} pageSize={5} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewLogsPage;
