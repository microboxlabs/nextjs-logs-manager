"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { IoCreateOutline } from "react-icons/io5";
import Breadcrumb from "../../../src/components/Breadcrumb";
import DataTable from "../../../src/components/DataTable";
import Loader from "../../../src/components/Loader";
import { columns_logs } from "../../../src/constants/columns.logs-view";
import { logService } from "../../../src/services/logs.getAll.service";
import { logsSSEService } from "../../../src/services/logs.sse.service";
import CustomModal from "../../../src/components/CustomModal";
import { NewLogComponent } from "../../../src/components/NewLogComponent";
import { useAlert } from "../../../src/contexts/AlertContext";
import { uploadLogFile } from "../../../src/services/logs.uploadLogFile.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Log } from "../../../src/types/logs.types";

const ViewLogsPage: React.FC = () => {
    // Hooks
    const { data: session } = useSession();
    const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

    // States
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("New Log");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { showAlert } = useAlert();
    const router = useRouter();

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logsData = await logService.fetchLogs();
                setLogs(logsData);
            } catch (error) {
                // console.error("Error fetching logs:", error);
                showAlert("error", "Error fetching logs.");
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();

        const disconnect = logsSSEService.connect((newLog) => {
            setLogs((prevLogs) => [newLog, ...prevLogs]);
        });

        return () => disconnect();
    }, [showAlert]);

    const handleFileSubmit = async () => {
        if (!selectedFile) {
            showAlert("error", "Please select a file to upload.");
            return;
        }

        setIsUploading(true);
        try {
            await uploadLogFile(selectedFile);
            showAlert("success", "File uploaded successfully!");
            setTimeout(() => {
                router.push("/dashboard/logs-view");
            }, 500);
        } catch (error) {
            // console.error(error);
            showAlert("error", "An error occurred while uploading the file.");
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            setIsModalOpen(false);
        }
    };

    // Handlers
    const handleOpenModal = () => {
        setModalTitle("Create New Log");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 dark:bg-gray-900">
                <div className="mx-auto w-full max-w-6xl p-4">
                    <Breadcrumb />
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader overlay={false} />
                        </div>
                    ) : (
                        <div className="pt-10">
                            {isAdmin && (
                                <div className="mb-4 flex justify-end">
                                    <Button
                                        size="sm"
                                        className="flex items-center dark:bg-gray-600"
                                        onClick={handleOpenModal}
                                    >
                                        <IoCreateOutline className="mr-2" />
                                        New Log
                                    </Button>
                                </div>
                            )}

                            <DataTable data={logs} columns={columns_logs} pageSize={10} />
                        </div>
                    )}
                </div>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                title={modalTitle}
                onClose={handleCloseModal}
                actionButton={
                    <button
                        onClick={handleFileSubmit}
                        disabled={!selectedFile || isUploading}
                        className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${!selectedFile ? "cursor-not-allowed bg-gray-400" : ""
                            }`}
                    >
                        {isUploading ? "Uploading..." : "Submit"}
                    </button>
                }
            >
                <NewLogComponent
                    onFileSelect={(file) => {
                        setSelectedFile(file);
                    }}
                />
            </CustomModal>
        </>
    );
};

export default ViewLogsPage;
