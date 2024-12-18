import axios from "axios";
import { Log, logService } from "../../src/services/logs.getAll.service";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("logService.fetchLogs", () => {
    const mockLogs: Log[] = [
        {
            id: 1,
            timestamp: "2024-06-17T10:00:00Z",
            level: "INFO",
            serviceName: "ServiceA",
            message: "Test log 1",
        },
        {
            id: 2,
            timestamp: "2024-06-17T11:00:00Z",
            level: "ERROR",
            serviceName: "ServiceB",
            message: "Test log 2",
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch logs successfully without query parameters", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockLogs });

        const result = await logService.fetchLogs();

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/log", { params: undefined });
        expect(result).toEqual(mockLogs);
    });

    it("should fetch logs successfully with query parameters", async () => {
        const queryParams = { page: 1, filter: "ERROR" };
        mockedAxios.get.mockResolvedValueOnce({ data: mockLogs });

        const result = await logService.fetchLogs(queryParams);

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/log", { params: queryParams });
        expect(result).toEqual(mockLogs);
    });

    it("should throw an error when the API request fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

        await expect(logService.fetchLogs()).rejects.toThrow("Failed to fetch logs. Please try again later.");
        expect(mockedAxios.get).toHaveBeenCalledWith("/api/log", { params: undefined });
    });

    it("should throw an error with server-provided error message", async () => {
        const serverError = {
            response: { data: { message: "Internal Server Error" } },
        };
        mockedAxios.get.mockRejectedValueOnce(serverError);

        await expect(logService.fetchLogs()).rejects.toThrow("Internal Server Error");
        expect(mockedAxios.get).toHaveBeenCalledWith("/api/log", { params: undefined });
    });
});
