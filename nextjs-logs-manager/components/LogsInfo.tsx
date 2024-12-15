import { apiUrl } from '@/constants/routes'
import React from 'react'

export const LogsInfo = async () => {
    const resp = await fetch(`${apiUrl}/metrics`)
    const data = await resp.json()

    return (
        <div className="flex flex-col gap-1">
            <p>Metrics</p>
            <p className="px-2 py-3 text-center border rounded">{data.totalLogs} logs</p>
            <div className="flex gap-1">
                <p className="px-2 py-3 text-center flex-1 border rounded">{data.statusInfo} info</p>
                <p className="px-2 py-3 text-center flex-1 border rounded">{data.statusWarning} warning</p>
                <p className="px-2 py-3 text-center flex-1 border rounded">{data.statusError} error</p>
            </div>
        </div>
    )
}
