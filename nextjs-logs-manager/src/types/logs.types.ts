interface BaseLog {
    timestamp: string;
    level: string;
    service: string;
    message: string;
}

export interface CreateLogData {
    levelId: number;
    serviceId: number;
    message: string;
}

export interface CreateLogResponse extends BaseLog {
    id: number;
    serviceName?: string;
}

export interface Log extends BaseLog {
    id: number;
    serviceName?: string;
}

export interface LogData extends BaseLog { }