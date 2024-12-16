export interface Log {
    id: string;
    date: Date;
    status: string;
    service: string;
    message: string;
}

export interface Pagination {
    total: number;
    totalPages: number;
}
export interface fetchLogs {
    data: Log[]
    pagination: Pagination
}

export interface FileContent {
    date: string;
    status: string;
    service: string;
    message: string;
}