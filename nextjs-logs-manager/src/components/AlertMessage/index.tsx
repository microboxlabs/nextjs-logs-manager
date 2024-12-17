import { Alert } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi";

interface AlertMessageProps {
    type: "success" | "error" | "info";
    message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
    const alertConfig = {
        success: {
            color: "green",
            icon: HiCheckCircle,
        },
        error: {
            color: "red",
            icon: HiExclamationCircle,
        },
        info: {
            color: "blue",
            icon: HiInformationCircle,
        },
    };

    const Icon = alertConfig[type].icon;

    return (
        <Alert color={alertConfig[type].color} className="rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
                <Icon className="h-6 w-6" />
                <span>{message}</span>
            </div>
        </Alert>
    );
}
