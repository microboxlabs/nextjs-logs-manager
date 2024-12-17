export const columns_users = [
    {
        key: "email",
        label: "Email",
        render: (value: string) => (
            <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{value}</span>
        ),
    },
    {
        key: "role",
        label: "Role",
        render: (value: string) => {
            const roleClasses: Record<string, string> = {
                ADMIN: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
                REGULAR: "bg-blue-100 text-blue-200 dark:bg-blue-700 dark:text-blue-100",
            };

            return (
                <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${roleClasses[value] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"}`}
                >
                    {value}
                </span>
            );
        },
    },
    {
        key: "permissions",
        label: "Permissions",
        render: (value: string[]) => (
            <div className="flex flex-wrap gap-2">
                {value.map((permission, index) => (
                    <span
                        key={index}
                        className="rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                    >
                        {permission}
                    </span>
                ))}
            </div>
        ),
    },
];
