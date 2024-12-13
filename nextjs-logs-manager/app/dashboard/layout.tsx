import Breadcrumb from "@/components/Breadcrumb";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Logs View", href: "/dashboard/logs-view" },
    ];

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="px-4 py-6">
                <Breadcrumb items={breadcrumbItems} />
            </header>
            <main className="container mx-auto px-4">{children}</main>
        </section>
    );
}
