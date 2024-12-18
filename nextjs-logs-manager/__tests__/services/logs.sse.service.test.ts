import { logsSSEService } from "../../src/services/logs.sse.service";

describe("logsSSEService", () => {
    let mockEventSource: any;

    beforeEach(() => {
        mockEventSource = {
            onmessage: jest.fn(),
            onerror: jest.fn(),
            close: jest.fn(),
        };

        global.EventSource = jest.fn(() => mockEventSource) as any;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should handle incoming messages", () => {
        const mockLogData = { id: 1, message: "Test log" };
        const onMessage = jest.fn();

        logsSSEService.connect(onMessage);

        // Simulate an incoming message
        const messageEvent = { data: JSON.stringify(mockLogData) };
        mockEventSource.onmessage(messageEvent);

        expect(onMessage).toHaveBeenCalledWith(mockLogData);
    });

    // TODO: Fix this test
    // it("should handle malformed JSON without crashing", () => {
    //     const onMessage = jest.fn();

    //     logsSSEService.connect(onMessage);

    //     // Simulate a malformed JSON message
    //     const messageEvent = { data: "INVALID_JSON" };
    //     mockEventSource.onmessage(messageEvent);

    //     expect(onMessage).not.toHaveBeenCalled();
    //     expect(console.error).toHaveBeenCalledWith(
    //         expect.stringContaining("Error parsing SSE data:")
    //     );
    // });

    it("should handle errors and close the connection", () => {
        const onError = jest.fn();

        const disconnect = logsSSEService.connect(jest.fn(), onError);

        // Simulate an error event
        mockEventSource.onerror();

        expect(mockEventSource.close).toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();

        // Ensure disconnect function closes the connection
        disconnect();
        expect(mockEventSource.close).toHaveBeenCalledTimes(2);
    });

    it("should close the connection on disconnect", () => {
        const disconnect = logsSSEService.connect(jest.fn());

        // Manually invoke the disconnect function
        disconnect();

        expect(mockEventSource.close).toHaveBeenCalled();
    });
});
