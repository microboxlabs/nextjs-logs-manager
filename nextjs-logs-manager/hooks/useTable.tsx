import { apiUrl } from '@/constants/constants';
import { fetchLogs } from '@/types/types';
import { FormEvent, useEffect, useState } from 'react'

export const useTable = (initData: fetchLogs) => {
    const [logs, setLogs] = useState(initData)
    const [shouldRunEffect, setShouldRunEffect] = useState(false); // Bandera inicial
    const [filters, setFilters] = useState({
        status: '',
        service: '',
        initDate: '',
        endDate: ''
    })
    const updateFilters = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const { data, pagination } = logs
    const paginationButtons = [...Array(pagination.totalPages)].map((_, index) => index + 1);

    const handlePagination = async (pageValue: number) => {
        const resp = await fetch(`${apiUrl}/log?limit=5&offset=${(pageValue - 1) * 5}&status=${filters.status}&service=${filters.service}&initDate=${filters.initDate}&endDate=${filters.endDate}`)
        const dataLogs = await resp.json()
        setLogs(dataLogs)
    }

    const applyFilters = async () => {
        const resp = await fetch(`${apiUrl}/log?limit=5&status=${filters.status}&service=${filters.service}&initDate=${filters.initDate}&endDate=${filters.endDate}`)
        const dataLogs = await resp.json()
        setLogs(dataLogs)
    }

    useEffect(() => {
        if (!shouldRunEffect) {
            setShouldRunEffect(true);
            return;
        }
        applyFilters()
    }, [filters])

    return {
        data,
        paginationButtons,
        handlePagination,
        updateFilters
    }
}
