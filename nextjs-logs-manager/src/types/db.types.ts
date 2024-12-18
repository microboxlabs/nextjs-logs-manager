export type User = {
    id: number;
    email: string;
    roleId: number;
    role: Role;
};

export type Role = {
    id: number;
    name: string;
    users: User[];
    rolePermissions: RolePermission[];
};

export type Permission = {
    id: number;
    name: string;
    rolePermissions: RolePermission[];
};

export type RolePermission = {
    id: number;
    roleId: number;
    permissionId: number;
    role: Role;
    permission: Permission;
};

export type LogEntry = {
    id: number;
    timestamp: Date;
    levelId: number;
    level: LogLevel;
    serviceId: number;
    service: Service;
    message: string;
};

export type LogLevel = {
    id: number;
    name: string;
    logs: LogEntry[];
};

export type Service = {
    id: number;
    name: string;
    logs: LogEntry[];
};

export type UserView = {
    id: number;
    email: string;
    role: string;
    permissions: string[];
};