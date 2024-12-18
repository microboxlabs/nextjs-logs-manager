import { Alert } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi";

export interface AlertMessageProps {
    type: "success" | "error" | "info";
    message: string;
}

/**
 * AlertMessage component displays an alert message with a specific type.
 *
 * @param {AlertMessageProps} props - The properties for the AlertMessage component.
 * @param {string} props.type - The type of alert (success, error, info).
 * @param {string} props.message - The message to display in the alert.
 * @returns {JSX.Element} The rendered AlertMessage component.
 */
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
