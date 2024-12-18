// utils/broadcast.ts
let clients: ReadableStreamController<any>[] = [];

export function broadcastLog(log: any) {
    clients.forEach((controller) => {
        const logData = new TextEncoder().encode(`data: ${JSON.stringify(log)}\n\n`);
        controller.enqueue(logData);
    });
}

export function addClient(controller: ReadableStreamController<any>) {
    clients.push(controller);
}

export function removeClient(controller: ReadableStreamController<any>) {
    clients = clients.filter((c) => c !== controller);
}
