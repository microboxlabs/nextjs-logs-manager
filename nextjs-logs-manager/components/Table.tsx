
"use client"
import { apiUrl } from '@/constants/routes'
import { useState } from 'react'

export const Table = ({ initData }: any) => {
    const [logs, setLogs] = useState(initData)
    const { data, pagination } = logs
    const paginationButtons = [...Array(pagination.totalPages)].map((_, index) => index + 1);

    const handlePagination = async (e: any) => {

        const resp = await fetch(`${apiUrl}/log?limit=10&offset=${(e.target.value - 1) * 10}`)
        const dataLogs = await resp.json()
        setLogs(dataLogs)
    }

    return (
        <div className="relative overflow-x-auto">
            <p>Logs</p>
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
            <div className="flex gap-2 my-2 justify-center">
                {
                    paginationButtons.map(page => (
                        <button onClick={handlePagination} value={page} className='w-8 h-8 text-white bg-blue-500 hover:bg-blue-600 rounded'>{page}</button>
                    ))
                }
            </div>
        </div>

    )
}
