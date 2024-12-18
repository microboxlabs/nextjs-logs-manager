import { Alert } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi";

interface AlertMessageProps {
    /**
     * The type of alert to display.
     * Can be "success", "error", or "info".
     */
    type: "success" | "error" | "info";

    /**
     * The message to display within the alert.
     */
    message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps): JSX.Element {
    const alertConfig = {
        success: {
            color: "green",
            icon: HiCheckCircle,
            ariaLabel: "Success",
        },
        error: {
            color: "red",
            icon: HiExclamationCircle,
            ariaLabel: "Error",
        },
        info: {
            color: "blue",
            icon: HiInformationCircle,
            ariaLabel: "Info",
        },
    };

    const { color, icon: Icon, ariaLabel } = alertConfig[type];

    return (
        <Alert
            color={color}
            className="rounded-lg shadow-lg"
            aria-label={`${ariaLabel} Alert`}
        >
            <div className="flex items-center gap-2">
                <Icon className="size-6" aria-hidden="true" />
                <span>{message}</span>
            </div>
        </Alert>
    );
}
