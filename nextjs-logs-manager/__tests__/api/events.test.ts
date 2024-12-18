import { GET } from "../../app/api/log/events/route";

declare global {
    var clients: Array<{
        enqueue: jest.Mock;
        close: jest.Mock;
    }>;
}

describe("SSE /api/log/events", () => {
    let mockController: { enqueue: jest.Mock; close: jest.Mock };

    beforeEach(() => {
        global.clients = [];
        mockController = {
            enqueue: jest.fn(),
            close: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should establish an SSE connection and send welcome message", async () => {
        const mockRequest: any = {
            signal: {
                addEventListener: jest.fn(),
            },
        };

        const response = await GET(mockRequest);

        expect(response.headers.get("Content-Type")).toBe("text/event-stream");
        expect(response.headers.get("Cache-Control")).toBe("no-cache");
        expect(response.headers.get("Connection")).toBe("keep-alive");

        const stream = response.body as ReadableStream;
        const reader = stream.getReader();
        const result = await reader.read();

        expect(result.value).toContain(
            "data: Connection established for real-time logs\n\n"
        );
        expect(result.done).toBe(false);
    });

    // TODO: Fix this test
    // it("should remove the connection when the client disconnects", async () => {
    //     const mockAbortSignal = {
    //         addEventListener: jest.fn((event, handler: () => void) => {
    //             if (event === "abort") {
    //                 handler(); // Simula el disparo del evento abort
    //             }
    //         }),
    //     };

    //     const mockRequest: any = {
    //         signal: mockAbortSignal,
    //     };

    //     global.clients.push(mockController);

    //     await GET(mockRequest);

    //     // Simula la desconexión del cliente
    //     const disconnectHandler = mockAbortSignal.addEventListener.mock.calls[0][1];
    //     disconnectHandler();

    //     // Verifica que el controlador fue cerrado y el cliente eliminado
    //     expect(mockController.close).toHaveBeenCalledTimes(1);
    //     expect(global.clients).toHaveLength(0);
    // });

    // TODO: Fix this test
    // it("should broadcast logs to all active connections", () => {
    //     const mockLog = { id: 1, message: "Test log" };

    //     // Simula clientes activos
    //     global.clients = [
    //         { enqueue: jest.fn(), close: jest.fn() },
    //         { enqueue: jest.fn(), close: jest.fn() },
    //     ];

    //     broadcastLog(mockLog);

    //     // Verifica que todos los clientes reciban el log
    //     global.clients.forEach((controller) => {
    //         expect(controller.enqueue).toHaveBeenCalledWith(
    //             `data: ${JSON.stringify(mockLog)}\n\n`
    //         );
    //     });
    // });
});