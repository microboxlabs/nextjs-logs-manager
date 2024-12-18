import axios from "axios";
import { createLog } from "../../src/services/logs.createLog.service";
import { CreateLogData, CreateLogResponse } from "../../src/types/logs.types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("createLog service", () => {
    const mockUrl = "/api/log";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully create a log and return response data", async () => {
        const mockLogData: CreateLogData = {
            levelId: 1,
            serviceId: 2,
            message: "Test log message",
        };

        const mockResponse: CreateLogResponse = {
            id: 123,
            timestamp: "2024-12-17T10:00:00Z",
            level: "Info",
            serviceName: "Service A",
            message: "Test log message",
            service: ""
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await createLog(mockLogData);

        expect(mockedAxios.post).toHaveBeenCalledWith(mockUrl, mockLogData);
        expect(result).toEqual(mockResponse);
    });

    it("should throw an error when the server responds with an error", async () => {
        const mockLogData: CreateLogData = {
            levelId: 1,
            serviceId: 2,
            message: "Test log message",
        };

        mockedAxios.post.mockRejectedValueOnce({
            response: { data: { error: "Failed to create log" } },
        });

        await expect(createLog(mockLogData)).rejects.toThrow(
            "Failed to create log"
        );

        expect(mockedAxios.post).toHaveBeenCalledWith(mockUrl, mockLogData);
    });

    it("should throw a generic error for unexpected exceptions", async () => {
        const mockLogData: CreateLogData = {
            levelId: 1,
            serviceId: 2,
            message: "Test log message",
        };

        mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

        await expect(createLog(mockLogData)).rejects.toThrow("Network Error");

        expect(mockedAxios.post).toHaveBeenCalledWith(mockUrl, mockLogData);
    });
});
