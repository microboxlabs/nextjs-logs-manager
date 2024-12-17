"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/src/components/Breadcrumb";
import { columns_logs } from "@/src/constants/columns.logs-view";
import DataTable from "@/src/components/DataTable";
import Loader from "@/src/components/Loader";
import { logsSSEService } from "@/src/services/logs.sse.service";
import { logService, Log } from "@/src/services/logs.getAll.service";

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

        // Conectar al SSE para escuchar logs en tiempo real
        const disconnect = logsSSEService.connect((newLog) => {
            setLogs((prevLogs) => [newLog, ...prevLogs]); // Agregar el nuevo log al inicio
        });

        return () => disconnect(); // Limpiar la conexión SSE
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-4 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-6xl p-4">
                <Breadcrumb />
                {loading ? (
                    <div className="flex items-center justify-center">
                        <Loader overlay={false} />
                    </div>
                ) : (
                    <div className="pt-10">
                        <DataTable data={logs} columns={columns_logs} pageSize={10} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewLogsPage;
