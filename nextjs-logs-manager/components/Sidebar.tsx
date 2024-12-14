import { MdFileUpload, MdSpaceDashboard } from 'react-icons/md'
import { SidebarItem } from './SidebarItem'
import { BiSolidLogOut } from 'react-icons/bi'
import { logout } from '@/actions/loginForm'
import { auth } from '@/auth'

export const Sidebar = async () => {
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
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div>
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        {
                            userRoutes.map(item => <SidebarItem key={item.path} {...item} />)
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
    )
}
