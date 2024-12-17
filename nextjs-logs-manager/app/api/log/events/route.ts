let clients: any[] = []; // Lista global de conexiones SSE

export async function GET(req: Request): Promise<Response> {
    const headers = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    // Crear una nueva conexión SSE
    const stream = new ReadableStream({
        start(controller) {
            clients.push(controller); // Agregar la conexión actual a la lista

            // Enviar mensaje de bienvenida
            controller.enqueue("data: Conexión establecida para logs en tiempo real\n\n");

            // Eliminar conexión al desconectar el cliente
            req.signal.addEventListener("abort", () => {
                clients = clients.filter((c) => c !== controller);
                controller.close();
            });
        },
    });

    return new Response(stream, { headers });
}

// Función para emitir logs a todas las conexiones activas
export function broadcastLog(log: any) {
    clients.forEach((controller) => {
        controller.enqueue(`data: ${JSON.stringify(log)}\n\n`);
    });
}
