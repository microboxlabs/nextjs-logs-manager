import axios from "axios";
import { logLevelAndServiceService } from "../../src/services/logs.getLevelsAndService.service";
import { LogLevel, Service } from "../../src/types/db.types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("logLevelAndServiceService", () => {
    const mockLevels: LogLevel[] = [
        { id: 1, name: "INFO", logs: [] },
        { id: 2, name: "ERROR", logs: [] },
    ];

    const mockServices: Service[] = [
        { id: 1, name: "Service A", logs: [] },
        { id: 2, name: "Service B", logs: [] },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchLevels", () => {
        it("should fetch levels successfully", async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockLevels });

            const result = await logLevelAndServiceService.fetchLevels();

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/levels");
            expect(result).toEqual(mockLevels);
        });

        it("should throw an error when the API request fails", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(logLevelAndServiceService.fetchLevels()).rejects.toThrow(
                "Failed to fetch levels."
            );
            expect(mockedAxios.get).toHaveBeenCalledWith("/api/levels");
        });

        it("should throw server-provided error messages", async () => {
            const serverError = {
                response: { data: { error: "Server Error" } },
            };
            mockedAxios.get.mockRejectedValueOnce(serverError);

            await expect(logLevelAndServiceService.fetchLevels()).rejects.toThrow("Server Error");
        });
    });

    describe("fetchServices", () => {
        it("should fetch services successfully", async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockServices });

            const result = await logLevelAndServiceService.fetchServices();

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/services");
            expect(result).toEqual(mockServices);
        });

        it("should throw an error when the API request fails", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(logLevelAndServiceService.fetchServices()).rejects.toThrow(
                "Failed to fetch services."
            );
            expect(mockedAxios.get).toHaveBeenCalledWith("/api/services");
        });

        it("should throw server-provided error messages", async () => {
            const serverError = {
                response: { data: { error: "Service Unavailable" } },
            };
            mockedAxios.get.mockRejectedValueOnce(serverError);

            await expect(logLevelAndServiceService.fetchServices()).rejects.toThrow(
                "Service Unavailable"
            );
        });
    });
});
