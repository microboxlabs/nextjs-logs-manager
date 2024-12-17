"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "flowbite-react";
import { FaFileAlt, FaPlus, FaUsers } from "react-icons/fa";
import Breadcrumb from "@/src/components/Breadcrumb";
import Loader from "@/src/components/Loader";
import { NewLogComponent } from "@/src/components/NewLogComponent";
import CustomModal from "@/src/components/CustomModal";
import { uploadLogFile } from "@/src/services/logs.uploadLogFile.service";

interface CardItem {
    title: string;
    icon: React.ElementType;
    path: string;
    roles?: string[];
    modalContent?: React.ReactNode;
}

const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSubmit = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            await uploadLogFile(selectedFile);
            alert("File uploaded successfully!");
            setIsModalOpen(false);
            router.push("/dashboard/logs-view");
        } catch (error) {
            alert("An error occurred while uploading the file.");
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
        }
    };

    const cards: CardItem[] = [
        { title: "View Logs", icon: FaFileAlt, path: "/dashboard/logs-view" },
        {
            title: "Create New Log",
            icon: FaPlus,
            roles: ["ADMIN"],
            modalContent: (
                <NewLogComponent
                    onFileSelect={(file) => {
                        setSelectedFile(file);
                    }}
                />
            ),
            path: "/dashboard/logs-view/new-log",
        },
        { title: "View Users", icon: FaUsers, path: "/dashboard/users", roles: ["ADMIN"] },
        { title: "User Profile", icon: FaUsers, path: "/dashboard/profile" },
    ];

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader overlay={true} />
            </div>
        );
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    const userRole = session?.user?.role || "";

    const handleCardClick = (card: CardItem) => {
        if (card.modalContent) {
            setModalTitle(card.title);
            setIsModalOpen(true);
        } else if (card.path) {
            router.push(card.path);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null); // Limpia el archivo seleccionado al cerrar
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 px-4 py-6 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-7xl px-4">
                <Breadcrumb />
            </div>
            <div className="mx-auto w-full max-w-7xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 sm:p-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome Back, {session?.user?.email || "User"}
                </h2>
                <p className="mb-6 text-center text-base text-gray-600 dark:text-gray-300">
                    Select an action to proceed
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {cards.map((card) => {
                        if (card.roles && !card.roles.includes(userRole)) return null;

                        return (
                            <Card
                                key={card.title}
                                className="cursor-pointer rounded-lg bg-white text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-700"
                                onClick={() => handleCardClick(card)}
                            >
                                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300">
                                    <card.icon className="text-3xl" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                                    {card.title}
                                </h3>
                            </Card>
                        );
                    })}
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
                {cards.find(card => card.title === modalTitle)?.modalContent}
            </CustomModal>

        </div>
    );
};

export default DashboardPage;
