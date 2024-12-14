import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import { MdFileUpload, MdSpaceDashboard } from "react-icons/md";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    const sidebarItems = [
        { text: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard className='text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' size={24} /> },
        { text: 'Upload Logs', path: '/dashboard/upload', icon: <MdFileUpload className='text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' size={24} />, roleAccess: 'admin' }
    ]

    const userRoutes = sidebarItems.filter(item => {
        if (session?.user?.role === 'user') {
            return !item.roleAccess
        } else {
            return item
        }
    })

    return (
        <div>
            <Sidebar userRoutes={userRoutes} />
            <div className="p-4 sm:ml-64">
                {children}
            </div>
        </div>
    );
}