"use client";

import { useState } from "react";
import {
    Table,
    Pagination,
    TextInput,
    Accordion,
    Dropdown,
    Label,
    Button,
} from "flowbite-react";

interface ColumnConfig {
    key: string;
    label: string;
    isDate?: boolean;
    isDropdown?: boolean;
    dropdownOptions?: string[];
    render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface DataTableProps {
    data: Record<string, any>[];
    columns: ColumnConfig[];
    pageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    pageSize = 5,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
        {}
    );
    const [visibleFilters, setVisibleFilters] = useState<string[]>([]);

    const filteredData = (data || []).filter((item) => {
        return (columns || []).every((column) => {
            const value = item[column.key];

            if (column.isDate && startDate && endDate) {
                const dateValue = new Date(value).getTime();
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();
                return dateValue >= start && dateValue <= end;
            }

            if (column.isDropdown && selectedFilters[column.key]) {
                return value === selectedFilters[column.key];
            }

            if (!column.isDropdown && !column.isDate && selectedFilters[column.key]) {
                return String(value)
                    .toLowerCase()
                    .includes(selectedFilters[column.key].toLowerCase());
            }

            return true;
        });
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page: number) => setCurrentPage(page);

    const handleFilterChange = (key: string, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const toggleFilterVisibility = (key: string) => {
        setVisibleFilters((prev) =>
            prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
        );
    };

    const clearFilters = () => {
        setSelectedFilters({});
        setVisibleFilters([]);
        setStartDate(null);
        setEndDate(null);
    };

    const clearAll = () => {
        clearFilters();
        setSearchQuery("");
        setCurrentPage(1);
    };

    const startRange = (currentPage - 1) * pageSize + 1;
    const endRange = Math.min(currentPage * pageSize, filteredData.length);

    return (
        <div className="w-full">
            <div className="mb-4">
                <TextInput
                    placeholder="Search across all data..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Accordion alwaysOpen={false}>
                <Accordion.Panel>
                    <Accordion.Title>Filters</Accordion.Title>
                    <Accordion.Content>
                        <div className="mb-4 flex flex-wrap gap-2">
                            {columns?.map((column) => (
                                <button
                                    key={column.key}
                                    onClick={() => toggleFilterVisibility(column.key)}
                                    className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${visibleFilters.includes(column.key)
                                        ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                                        : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    {column.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {columns?.map((column) =>
                                visibleFilters.includes(column.key) ? (
                                    <div
                                        key={column.key}
                                        className="min-w-[200px] max-w-[400px] rounded-lg p-2"
                                    >
                                        {column.isDate ? (
                                            <>
                                                <Label htmlFor={`${column.key}-start`} className="text-sm font-semibold">
                                                    {column.label} Start Date
                                                </Label>
                                                <TextInput
                                                    id={`${column.key}-start`}
                                                    type="date"
                                                    value={startDate || ""}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className="mt-2 w-full"
                                                />
                                                <Label htmlFor={`${column.key}-end`} className="mt-4 block text-sm font-semibold">
                                                    {column.label} End Date
                                                </Label>
                                                <TextInput
                                                    id={`${column.key}-end`}
                                                    type="date"
                                                    value={endDate || ""}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    className="mt-2 w-full"
                                                />
                                            </>
                                        ) : column.isDropdown ? (
                                            <>
                                                <Label className="text-sm font-semibold">{column.label}</Label>
                                                <Dropdown
                                                    label={selectedFilters[column.key] || `Select ${column.label}`}
                                                    className="mt-2"
                                                >
                                                    {column.dropdownOptions?.map((option) => (
                                                        <Dropdown.Item
                                                            key={option}
                                                            onClick={() => handleFilterChange(column.key, option)}
                                                        >
                                                            {option}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                            </>
                                        ) : (
                                            <>
                                                <Label className="text-sm font-semibold">{column.label}</Label>
                                                <TextInput
                                                    placeholder={`Search ${column.label}`}
                                                    value={selectedFilters[column.key] || ""}
                                                    onChange={(e) =>
                                                        handleFilterChange(column.key, e.target.value)
                                                    }
                                                    className="mt-2 w-full"
                                                />
                                            </>
                                        )}
                                    </div>
                                ) : null
                            )}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            <div className="mt-4 max-h-96 overflow-x-auto">
                <Table className="w-full">
                    <Table.Head>
                        {columns?.map((column) => (
                            <Table.HeadCell key={column.key}>{column.label}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {columns?.map((column) => (
                                        <Table.Cell
                                            key={column.key}
                                            className="text-gray-900 dark:text-white"
                                        >
                                            {column.render
                                                ? column.render(row[column.key], row)
                                                : row[column.key]}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell
                                    colSpan={columns?.length || 1}
                                    className="text-center text-gray-500 dark:text-gray-400"
                                >
                                    No data found.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {startRange} to {endRange} of {filteredData.length} entries
                </span>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredData.length / pageSize)}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default DataTable;
