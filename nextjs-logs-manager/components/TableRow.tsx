import { Log } from '@/types/types'
import React from 'react'

type TableRowProps = {
  log: Log
}

export const TableRow = ({ log }: TableRowProps) => {
  const date = new Date(log.date)

  return <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`}
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

}
