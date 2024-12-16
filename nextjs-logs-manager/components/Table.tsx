
"use client"

import { fetchLogs } from '@/types/types'
import { Filters } from './Filters'
import { TableRow } from './TableRow'
import { useTable } from '@/hooks/useTable'

interface TableProps {
    initData: fetchLogs;
    dataStatus: {
        data: string[]
    };
    dataServices: {
        data: string[]
    };
}

export const Table = ({ initData, dataStatus, dataServices }: TableProps) => {

    const { data, paginationButtons, updateFilters, handlePagination } = useTable(initData)

    return (
        <div className="">
            <p>Logs</p>

            <Filters setFilters={updateFilters} dataStatus={dataStatus} dataServices={dataServices} />

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
                            data.map(log => <TableRow key={log.id} log={log} />)
                        }
                    </tbody>

                </table>
            </div>
            <div className="flex gap-2 my-2 justify-center">
                {
                    paginationButtons.map(page => (
                        <button key={page} onClick={() => handlePagination(page)} className='w-8 h-8 text-white bg-blue-500 hover:bg-blue-600 rounded'>{page}</button>
                    ))
                }
            </div>
        </div>

    )
}
