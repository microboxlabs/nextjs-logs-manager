
interface Logs {
    userId: string;
    date: Date;
    status: string;
    service: string;
    message: string;
}

export class UploadFileDto {
    constructor(
        public logs: Logs[]
    ) { }

    public static create(object: { [key: string]: any }[], userId: string): [string?, UploadFileDto?] {
        const logs: Logs[] = [];
        const errors: string[] = [];

        object.map(element => {
            const { date, status, service, message } = element
            if (!date) errors.push('Missing date');
            if (!status) errors.push('Missing status');
            if (!service) errors.push('Missing service');
            if (!message) errors.push('Missing message');

            if (date && status && service && message) {
                logs.push({
                    userId: userId,
                    date: new Date(date),  // Asegurándonos de que `date` sea un objeto Date
                    status,
                    service,
                    message
                });
            }
        })

        if (errors.length > 0) {
            return [errors.join(', ')]; // Retornamos los errores concatenados
        }

        // Si todo es válido, retornamos el DTO con los logs
        return [undefined, new UploadFileDto(logs)];
    }
}