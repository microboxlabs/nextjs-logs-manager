import Link from 'next/link'

interface SidebarItemProps {
    text: string;
    path: string;
    icon: JSX.Element;
    toggleSidebar: () => void;
    roleAccess?: string;
}

export const SidebarItem = ({ text, path, icon, toggleSidebar }: SidebarItemProps) => {

    return (
        <li>
            <Link onClick={toggleSidebar} href={path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {icon}
                <span className="ms-3">{text}</span>
            </Link>
        </li>
    )
}
