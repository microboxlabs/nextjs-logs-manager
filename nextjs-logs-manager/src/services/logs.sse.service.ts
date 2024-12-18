/**
 * Service to handle Server-Sent Events (SSE) for real-time logs.
 */
export const logsSSEService = {
    /**
     * Establishes an SSE connection to receive log data in real-time.
     * @param onMessage Callback executed when a new log is received.
     * @param onError Optional callback executed when the connection encounters an error.
     * @returns A function to close the SSE connection.
     */
    connect: (onMessage: (data: any) => void, onError?: () => void): (() => void) => {
        const eventSource = new EventSource("/api/log/events");

        eventSource.onmessage = (event: MessageEvent) => {
            try {
                const logData = JSON.parse(event.data);
                onMessage(logData); // Pass parsed data to the callback
            } catch (error) {
                console.error("Error parsing SSE data:", error);
            }
        };

        eventSource.onerror = () => {
            console.error("SSE connection error");
            eventSource.close();
            if (onError) onError();
        };

        // Return a function to cleanly close the SSE connection
        return () => {
            eventSource.close();
        };
    },
};
