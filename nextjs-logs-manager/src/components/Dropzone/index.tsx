import { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { VscCloudUpload } from "react-icons/vsc";

interface DropzoneProps {
    onFileSelect?: (file: File | null) => void;
    accept?: string;
    maxSize?: number;
    iconSize?: "sm" | "md" | "lg" | "xl";
    message?: string;
    subMessage?: string;
    className?: string;
}

const iconSizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-20 w-20",
    xl: "h-36 w-36",
};

/**
 * Dropzone component for file upload with drag-and-drop support.
 *
 * @param {Object} props - The properties object.
 * @param {(file: File | null) => void} props.onFileSelect - Callback function to handle file selection.
 * @param {string} [props.accept=".txt"] - Accepted file types for upload.
 * @param {number} [props.maxSize=2] - Maximum file size in MB.
 * @param {string} [props.iconSize="xl"] - Size of the upload icon.
 * @param {string} [props.message="Click to upload"] - Message displayed on the dropzone.
 * @param {string} [props.subMessage=`TXT files only (max ${maxSize}MB)`] - Sub-message displayed on the dropzone.
 * @param {string} [props.className=""] - Additional CSS classes for the dropzone container.
 *
 * @returns {JSX.Element} The rendered Dropzone component.
 */
export function Dropzone({
    onFileSelect,
    accept = ".txt",
    maxSize = 2,
    iconSize = "xl",
    message = "Click to upload",
    subMessage = `TXT files only (max ${maxSize}MB)`,
    className = "",
}: DropzoneProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        processFile(file);
    };

    const processFile = (file: File | undefined) => {
        if (file) {
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File size exceeds the maximum limit of ${maxSize}MB.`);
                setSelectedFile(null);
                onFileSelect?.(null);
                return;
            }
            setSelectedFile(file);
            onFileSelect?.(file);
        } else {
            setSelectedFile(null);
            onFileSelect?.(null);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        processFile(file);
    };

    return (
        <div className={`flex w-full max-w-md flex-col items-center justify-center ${className}`}>
            <Label
                htmlFor="dropzone-file"
                className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${isDragging
                    ? "scale-110 animate-pulse border-blue-500 bg-blue-100 shadow-xl"
                    : "border-dashed border-gray-300 bg-gray-50"
                    } p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center py-3">
                    <VscCloudUpload
                        className={`mb-1 ${iconSizeClasses[iconSize]} ${isDragging ? "text-blue-500" : "text-gray-500"
                            } transition-colors dark:text-gray-400`}
                    />
                    <p
                        className={`mb-1 text-sm font-medium ${isDragging ? "text-blue-700" : "text-gray-700"
                            } dark:text-gray-200`}
                    >
                        <span className="font-semibold">{message}</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{subMessage}</p>
                </div>
                <FileInput
                    id="dropzone-file"
                    className="hidden"
                    accept={accept}
                    onChange={handleFileChange}
                />
            </Label>
            {selectedFile && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <p>Selected File:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                </div>
            )}
        </div>
    );
}
