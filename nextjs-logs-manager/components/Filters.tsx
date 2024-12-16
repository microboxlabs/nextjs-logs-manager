import { Datepicker } from 'flowbite-react/components/Datepicker'
import React from 'react'

interface FiltersProps {
    setFilters: (name: string, value: string) => void;
    dataStatus: {
        data: string[]
    };
    dataServices: {
        data: string[]
    };
}

export const Filters = ({ setFilters, dataStatus, dataServices }: FiltersProps) => {

    return (
        <form className="w-full flex flex-col sm:flex-row justify-end gap-4">
            <div className="flex flex-col">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">start date</label>
                <Datepicker onSelectedDateChanged={(value) => setFilters('initDate', value.toISOString())} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">end date</label>
                <Datepicker onSelectedDateChanged={(value) => setFilters('endDate', value.toISOString())} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select onChange={(e) => setFilters('status', e.target.value)} id="countries" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Choose a status</option>
                    {
                        dataStatus?.data?.map((element) => <option key={element} value={element}>{element}</option>)
                    }

                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Services</label>
                <select onChange={(e) => setFilters('service', e.target.value)} id="countries" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Choose a service</option>
                    {
                        dataServices?.data?.map((element) => <option key={element} value={element}>{element}</option>)
                    }

                </select>
            </div>
        </form>
    )
}
