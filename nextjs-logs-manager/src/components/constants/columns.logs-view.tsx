import { Badge } from "flowbite-react";

export const columns_logs = [
    {
        key: "timestamp",
        label: "Timestamp",
        isDate: true,
        render: (value: string) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }).format(new Date(value));
            return (
                <span className="text-sm text-gray-600 dark:text-gray-400">{formattedDate}</span>
            );
        },
    },
    {
        key: "level",
        label: "Level",
        isDropdown: true,
        dropdownOptions: ["INFO", "WARNING", "ERROR"],
        render: (value: string) => {
            const badgeColors: Record<string, string> = {
                INFO: "success",
                WARNING: "warning",
                ERROR: "failure",
            };
            return <Badge color={badgeColors[value]}>{value}</Badge>;
        },
    },
    {
        key: "serviceName",
        label: "Service",
        isDropdown: true,
        dropdownOptions: ["Service-A", "Service-B", "Service-C"],
        render: (value: string) => (
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {value}
            </span>
        ),
    },
    {
        key: "message",
        label: "Message",
        render: (value: string) => (
            <span className="text-sm text-gray-800 dark:text-gray-200">{value}</span>
        ),
    },
];