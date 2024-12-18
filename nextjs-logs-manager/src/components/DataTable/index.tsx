"use client";

import { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import {
    Table,
    Pagination,
    TextInput,
    Accordion,
    Dropdown,
    Label,
    Datepicker,
} from "flowbite-react";
import { ClearButton } from "../ClearButton";

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

/**
 * DataTable component for displaying and filtering tabular data.
 *
 * @component
 * @param {DataTableProps} props - The properties for the DataTable component.
 * @param {Array<Object>} props.data - The data to be displayed in the table.
 * @param {Array<Object>} props.columns - The columns configuration for the table.
 * @param {number} [props.pageSize=5] - The number of rows to display per page.
 *
 * @returns {JSX.Element} The rendered DataTable component.
 *
 * @example
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   pageSize={10}
 * />
 *
 * @typedef {Object} DataTableProps
 * @property {Array<Object>} data - The data to be displayed in the table.
 * @property {Array<Object>} columns - The columns configuration for the table.
 * @property {number} [pageSize=5] - The number of rows to display per page.
 *
 * @typedef {Object} Column
 * @property {string} key - The unique key for the column.
 * @property {string} label - The display label for the column.
 * @property {boolean} [isDate] - Whether the column contains date values.
 * @property {boolean} [isDropdown] - Whether the column contains dropdown values.
 * @property {Array<string>} [dropdownOptions] - The options for the dropdown column.
 * @property {function} [render] - Custom render function for the column.
 */
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

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const handleFilterChange = (key: string, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const toggleFilterVisibility = (key: string) => {
        setVisibleFilters((prev) => {
            if (prev.includes(key)) {
                const newVisibleFilters = prev.filter((f) => f !== key);
                setSelectedFilters((current) => {
                    const { [key]: _, ...rest } = current;
                    return rest;
                });
                setCurrentPage(1);
                return newVisibleFilters;
            } else {
                setCurrentPage(1);
                return [...prev, key];
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 840);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const clearVisibleFilters = () => {
        setVisibleFilters([]);
        setSelectedFilters({});
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const filteredData = (data || [])
        .filter((item) => {
            if (searchQuery.trim() !== "") {
                const searchText = searchQuery.toLowerCase();
                return Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(searchText)
                );
            }
            return true;
        })
        .filter((item) => {
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

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const startRange = (currentPage - 1) * pageSize + 1;
    const endRange = Math.min(currentPage * pageSize, filteredData.length);

    return (
        <div className="w-full p-4">

            {/* Search */}
            <div className="mb-4 flex w-full items-center gap-2">
                <TextInput
                    placeholder="Search all data..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full"
                />
                <ClearButton onClick={() => setSearchQuery("")} icon={<AiOutlineClear size={16} />}
                />
            </div>

            {/* Filters */}
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
                            <ClearButton onClick={clearVisibleFilters} icon={<AiOutlineClear size={16} />} size="xs" />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {columns?.map((column) =>
                                visibleFilters.includes(column.key) ? (
                                    <div key={column.key} className="max-w-xs flex-1">
                                        {column.isDate ? (
                                            <>
                                                <Label
                                                    htmlFor={`${column.key}-start`}
                                                    className="text-sm font-semibold"
                                                >
                                                    {column.label} Start Date
                                                </Label>

                                                <Datepicker
                                                    id={`${column.key}-start`}
                                                    className="mt-2 w-full"
                                                    language="en"
                                                    weekStart={1}
                                                    onSelectedDateChanged={(date) => {
                                                        setStartDate(date.toISOString().split("T")[0]);
                                                    }}
                                                />

                                                <Label
                                                    htmlFor={`${column.key}-end`}
                                                    className="mt-4 block text-sm font-semibold"
                                                >
                                                    {column.label} End Date
                                                </Label>

                                                <Datepicker
                                                    id={`${column.key}-end`}
                                                    className="mt-2 w-full"
                                                    language="en"
                                                    weekStart={1}
                                                    onSelectedDateChanged={(date) => {
                                                        setEndDate(date.toISOString().split("T")[0]);
                                                    }}
                                                />
                                            </>
                                        ) : column.isDropdown ? (
                                            <>
                                                <Label className="text-sm font-semibold">
                                                    {column.label}
                                                </Label>
                                                <Dropdown
                                                    label={
                                                        selectedFilters[column.key] ||
                                                        `Select ${column.label}`
                                                    }
                                                    className="mt-2"
                                                >
                                                    {column.dropdownOptions?.map((option) => (
                                                        <Dropdown.Item
                                                            key={option}
                                                            onClick={() =>
                                                                handleFilterChange(column.key, option)
                                                            }
                                                        >
                                                            {option}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown>
                                            </>
                                        ) : (
                                            <>
                                                <Label className="text-sm font-semibold">
                                                    {column.label}
                                                </Label>
                                                <TextInput
                                                    placeholder={`Search ${column.label}`}
                                                    value={selectedFilters[column.key] || ""}
                                                    onChange={(e) =>
                                                        handleFilterChange(
                                                            column.key,
                                                            e.target.value
                                                        )
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

            {/* Table */}
            <div className="relative mt-4 hidden overflow-x-auto sm:rounded-lg md:block">
                <Table className="w-full table-auto text-sm">
                    <Table.Head>
                        {columns?.map((column) => (
                            <Table.HeadCell key={column.key} className="whitespace-nowrap">
                                {column.label}
                            </Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {columns?.map((column) => (
                                        <Table.Cell
                                            key={column.key}
                                            className="whitespace-nowrap text-gray-900 dark:text-white"
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

            {/* Mobile Table */}
            <div className="mt-4 block space-y-4 md:hidden">
                {paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                        <div
                            key={index}
                            className="space-y-2 rounded-lg border border-gray-700 bg-gray-800 p-4"
                        >
                            {columns.map((column) => (
                                <div key={column.key} className="flex flex-col">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        {column.label}
                                    </span>
                                    <span className="text-gray-200">
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400">
                        No data found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col-reverse items-center gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                {/* Range Information */}
                <div className="w-full text-center text-gray-500 sm:w-auto sm:text-left">
                    {isSmallScreen ? (
                        <>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{startRange}</span> -{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">{endRange}</span> of{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">{filteredData.length}</span>
                        </>
                    ) : (
                        <>
                            Showing{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">{startRange}</span> to{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">{endRange}</span> of{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">{filteredData.length}</span> entries
                        </>
                    )}
                </div>

                {/* Pagination Component */}
                {filteredData.length > pageSize && (
                    <div className="flex w-full justify-center sm:w-auto sm:justify-end">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            layout={isSmallScreen ? "navigation" : "pagination"}
                            showIcons
                            className="text-gray-500 dark:text-gray-400"
                        />
                    </div>
                )}
            </div>


        </div>
    );
};

export default DataTable;
