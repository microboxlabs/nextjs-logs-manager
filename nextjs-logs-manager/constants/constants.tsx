import { MdFileUpload, MdSpaceDashboard } from "react-icons/md";

export const routes = [
    {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <MdSpaceDashboard className='text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' size={24} />
    },
    {
        text: 'Upload Logs',
        path: '/dashboard/upload',
        icon: <MdFileUpload className='text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' size={24} />, roleAccess: 'admin'
    }
]

export const apiUrl = 'http://localhost:3000/api'

export const loginErrors = {
    InvalidCredentials: 'Credenciales inválidas',
    UserNotFound: 'Usuario no encontrado',
};