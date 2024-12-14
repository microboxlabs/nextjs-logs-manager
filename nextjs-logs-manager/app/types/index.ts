type UserRole  = 'admin' | 'userReg'

export interface IUser{
    id: number
    username: string
    password: string
    role: UserRole
}

export interface ILog{
    id: number
    timestamp: string
    loglevel: string
    servicename: string
    message: string
}