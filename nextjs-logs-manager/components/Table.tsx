
"use client"
import { apiUrl } from '@/constants/routes'
import { useEffect, useState } from 'react'

export const Table = ({ initData }: any) => {
    const [logs, setLogs] = useState(initData)
    const [shouldRunEffect, setShouldRunEffect] = useState(false); // Bandera inicial
    const [filters, setFilters] = useState({
        status: '',
        service: ''
    })
    const { data, pagination } = logs
    const paginationButtons = [...Array(pagination.totalPages)].map((_, index) => index + 1);

    const handlePagination = async (e: any) => {
        const resp = await fetch(`${apiUrl}/log?limit=10&offset=${(e.target.value - 1) * 10}&status=${filters.status}&service=${filters.service}`)
        const dataLogs = await resp.json()
        setLogs(dataLogs)
    }
    const populatedData = async () => {
        const resp = await fetch(`${apiUrl}/log?status=${filters.status}&service=${filters.service}`)
        const dataLogs = await resp.json()
        setLogs(dataLogs)
    }

    useEffect(() => {
        if (!shouldRunEffect) {
            setShouldRunEffect(true);
            return;
        }
        populatedData()
    }, [filters])

    return (
        <div className="">
            <p>Logs</p>

            <form className="w-full flex flex-col sm:flex-row justify-end gap-4">
                <div className="flex flex-col">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select onChange={(e) => setFilters({
                        ...filters,
                        status: e.target.value
                    })} id="countries" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="">Choose a status</option>
                        <option value="INFO">INFO</option>
                        <option value="WARNING">WARNING</option>
                        <option value="ERROR">ERROR</option>

                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Services</label>
                    <select onChange={(e) => setFilters({
                        ...filters,
                        service: e.target.value
                    })} id="countries" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="">Choose a service</option>
                        <option value="Service-A">Service A</option>
                        <option value="Service-B">Service B</option>
                        <option value="Service-C">Service C</option>

                    </select>
                </div>
            </form>

            <div className='relative overflow-x-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Service
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((log: any) => (
                                <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {log.date}
                                    </th>
                                    <td className="px-6 py-4 text-nowrap">
                                        {log.status}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {log.service}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {log.message}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
            <div className="flex gap-2 my-2 justify-center">
                {
                    paginationButtons.map(page => (
                        <button key={page} onClick={handlePagination} value={page} className='w-8 h-8 text-white bg-blue-500 hover:bg-blue-600 rounded'>{page}</button>
                    ))
                }
            </div>
        </div>

    )
}
