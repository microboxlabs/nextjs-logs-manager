"use client"
import { SidebarItem } from './SidebarItem'
import { BiSolidLogOut } from 'react-icons/bi'
import { logout } from '@/actions/loginForm'
import { useSidebar } from '@/hooks/useSidebar';

interface SidebarProps {
    userRoutes: {
        text: string;
        path: string;
        icon: JSX.Element;
        roleAccess?: string
    }[]
}

export const Sidebar = ({ userRoutes }: SidebarProps) => {
    const { isOpen, toggleSidebar } = useSidebar()

    return (
        <>
            <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${isOpen && 'translate-x-0'}`} aria-label="Sidebar">
                <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div>
                        <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <ul className="space-y-2 font-medium">
                            {
                                userRoutes.map(item => <SidebarItem key={item.path} {...item} toggleSidebar={toggleSidebar} />)
                            }
                        </ul>
                    </div>

                    <form action={logout} className=" space-y-2 font-medium">
                        <button type='submit' className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full'>
                            <BiSolidLogOut className='text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' size={24} />
                            <span className="ms-3">Logout</span>
                        </button>
                    </form>

                </div>
            </aside>

        </>
    )
}
