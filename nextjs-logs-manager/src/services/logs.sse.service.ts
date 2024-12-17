export const logsSSEService = {
    connect: (onMessage: (data: any) => void, onError?: () => void) => {
        const eventSource = new EventSource("/api/log/events");

        eventSource.onmessage = (event) => {
            try {
                const logData = JSON.parse(event.data);
                onMessage(logData); // send data to the callback
            } catch (error) {
                console.error("Error parsing SSE data:", error);
            }
        };

        eventSource.onerror = () => {
            console.error("SSE connection error");
            eventSource.close();
            if (onError) onError();
        };

        return () => {
            eventSource.close(); // close the connection
        };
    },
};
