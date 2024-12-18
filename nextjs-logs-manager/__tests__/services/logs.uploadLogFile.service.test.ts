import axios from "axios";
import { uploadLogFile } from "../../src/services/logs.uploadLogFile.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("uploadLogFile service", () => {
    const mockFile = new File(["mock content"], "test.log", { type: "text/plain" });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should upload the log file successfully", async () => {
        mockedAxios.post.mockResolvedValueOnce({ status: 200 });

        await expect(uploadLogFile(mockFile)).resolves.not.toThrow();

        expect(mockedAxios.post).toHaveBeenCalledWith(
            "/api/log/upload",
            expect.any(FormData),
            expect.objectContaining({
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("should throw an error when the server responds with an error", async () => {
        mockedAxios.post.mockRejectedValueOnce({
            response: {
                data: { message: "File size too large" },
                status: 400,
            },
        });

        await expect(uploadLogFile(mockFile)).rejects.toThrow("File size too large");

        expect(mockedAxios.post).toHaveBeenCalled();
    });

    it("should throw a generic error for unexpected exceptions", async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

        await expect(uploadLogFile(mockFile)).rejects.toThrow("Failed to upload file.");

        expect(mockedAxios.post).toHaveBeenCalled();
    });
});
