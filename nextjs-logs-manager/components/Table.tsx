import React from 'react'

export const Table = () => {
    return (
        <div className="relative overflow-x-auto">
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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            2024-11-01 10:00:00
                        </th>
                        <td className="px-6 py-4 text-nowrap">
                            Info
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Service-A
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Successfully completed task.
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            2024-11-01 10:01:00
                        </th>
                        <td className="px-6 py-4 text-nowrap">
                            ERROR
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Service-B
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Failed to connect to the database.
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            2024-11-01 10:02:00
                        </th>
                        <td className="px-6 py-4 text-nowrap">
                            WARNING
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Service-C
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Response time is slow.
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            2024-11-01 10:02:00
                        </th>
                        <td className="px-6 py-4">
                            WARNING
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Service-C
                        </td>
                        <td className="px-6 py-4 text-nowrap">
                            Response time is slow.
                        </td>
                    </tr>


                </tbody>

            </table>
        </div>

    )
}
