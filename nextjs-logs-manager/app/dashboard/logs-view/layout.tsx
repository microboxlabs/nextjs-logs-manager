export default function LogsViewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="py-4">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                    Logs View
                </h2>
            </header>
            {children}
        </section>
    );
}
