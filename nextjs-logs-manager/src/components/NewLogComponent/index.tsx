import { useState } from "react";
import Link from "next/link";
import { Dropzone } from "../Dropzone";

interface NewLogComponentProps {
    onFileSelect: (file: File | null) => void;
}

export const NewLogComponent: React.FC<NewLogComponentProps> = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileUpload = (file: File | null) => {
        setSelectedFile(file);
        onFileSelect(file);
    };

    console.info("selectedFile", selectedFile);

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Upload a log file using the dropzone below. After uploading, the action will be handled by the parent component.
            </p>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 pt-8 dark:border-gray-700 dark:bg-gray-800">
                <Dropzone onFileSelect={handleFileUpload} maxSize={5} accept=".txt" iconSize="lg" />
            </div>

            <div className="relative my-6 flex items-center">
                <div className="grow border-t border-dotted border-gray-300"></div>
                <span className="mx-4 shrink text-sm text-gray-500">or</span>
                <div className="grow border-t border-dotted border-gray-300"></div>
            </div>

            <div className="text-center">
                <Link
                    href="/dashboard/logs-view/admin-create"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                    Click here if you want to create the log manually
                </Link>
            </div>
        </div>
    );
};
