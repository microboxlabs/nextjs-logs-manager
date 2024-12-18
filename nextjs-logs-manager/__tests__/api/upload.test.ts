import { POST } from "../../app/api/log/upload/route";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import { processLogs } from "../../src/services/logs.processLogs.service";
import fs from "fs";
import { broadcastLog } from "../../src/lib/broadcast";
import { ReadableStream as NodeReadableStream } from "stream/web";
import * as http from "http";

// Configuración para ReadableStream en Node.js
global.ReadableStream = global.ReadableStream || NodeReadableStream;

// Mocks
jest.mock("next-auth/jwt", () => ({
    getToken: jest.fn(),
}));

jest.mock("formidable", () => {
    const IncomingForm = jest.fn();
    IncomingForm.prototype.parse = jest.fn();
    return { IncomingForm };
});

jest.mock("../../src/lib/broadcast", () => ({
    broadcastLog: jest.fn(),
}));

jest.mock("../../src/services/logs.processLogs.service", () => ({
    processLogs: jest.fn(),
}));

jest.mock("fs", () => ({
    promises: {
        access: jest.fn(),
        readFile: jest.fn(),
    },
}));

describe("POST /api/log/upload", () => {
    const mockFilePath = "/tmp/test.log";
    const mockLogsContent = `
        [2024-12-17T10:00:00Z] [INFO] ServiceA: Test log 1
        [2024-12-17T10:05:00Z] [ERROR] ServiceB: Test log 2
    `;
    const mockParsedLogs = [
        {
            timestamp: "2024-12-17T10:00:00Z",
            level: "INFO",
            service: "ServiceA",
            message: "Test log 1",
        },
        {
            timestamp: "2024-12-17T10:05:00Z",
            level: "ERROR",
            service: "ServiceB",
            message: "Test log 2",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 403 for non-admin users", async () => {
        (getToken as jest.Mock).mockResolvedValue({ role: "user" });

        const req = {
            method: "POST",
            headers: new Map([["content-type", "multipart/form-data"]]),
            body: {},
        };

        const response = await POST(req as any);
        const json = await response.json();

        expect(response.status).toBe(403);
        expect(json.message).toBe("Unauthorized: Admin access required");

        expect(processLogs).not.toHaveBeenCalled();
        expect(broadcastLog).not.toHaveBeenCalled();
    });

    it("should return 500 if file is missing", async () => {
        (getToken as jest.Mock).mockResolvedValue({ role: "admin" });

        const mockForm = new (formidable.IncomingForm as any)();
        mockForm.parse.mockImplementation((_req: any, callback: (err: any, fields: formidable.Fields, files: formidable.Files) => void) => {
            callback(null, {}, {}); // Sin archivo en `files`
        });

        const req = {
            method: "POST",
            headers: new Map([["content-type", "multipart/form-data"]]),
            body: {},
        };

        const response = await POST(req as any);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json.message).toBe("Error processing file");

        expect(processLogs).not.toHaveBeenCalled();
        expect(broadcastLog).not.toHaveBeenCalled();
    });

    it("should return 500 if file is not readable", async () => {
        (getToken as jest.Mock).mockResolvedValue({ role: "admin" });

        const mockForm = new (formidable.IncomingForm as any)();
        mockForm.parse.mockImplementation((_req: http.IncomingMessage, callback: (err: any, fields: formidable.Fields, files: formidable.Files) => void) => {
            callback(null, {}, {
                file: [{
                    filepath: mockFilePath,
                    size: 0,
                    originalFilename: null,
                    newFilename: "",
                    mimetype: null,
                    hashAlgorithm: false,
                    toJSON: function (): formidable.FileJSON {
                        throw new Error("Function not implemented.");
                    }
                }]
            });
        });

        (fs.promises.access as jest.Mock).mockRejectedValue(new Error("File not accessible"));

        const req = {
            method: "POST",
            headers: new Map([["content-type", "multipart/form-data"]]),
            body: {},
        };

        const response = await POST(req as any);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json.message).toBe("Error processing file");

        expect(processLogs).not.toHaveBeenCalled();
        expect(broadcastLog).not.toHaveBeenCalled();
    });

    // Test deshabilitado por ahora
    // it("should process logs successfully", async () => {
    //     (getToken as jest.Mock).mockResolvedValue({ role: "admin" });

    //     const mockForm = new (formidable.IncomingForm as any)();
    //     mockForm.parse.mockImplementation((_req, callback) => {
    //         callback(null, {}, { file: { filepath: mockFilePath } });
    //     });

    //     (fs.promises.access as jest.Mock).mockResolvedValue(undefined);
    //     (fs.promises.readFile as jest.Mock).mockResolvedValue(mockLogsContent);
    //     (processLogs as jest.Mock).mockResolvedValue(undefined);

    //     const req = {
    //         method: "POST",
    //         headers: new Map([["content-type", "multipart/form-data"]]),
    //         body: {},
    //     };

    //     const response = await POST(req as any);
    //     const json = await response.json();

    //     expect(response.status).toBe(200);
    //     expect(json.message).toBe("Logs processed successfully");
    //     expect(json.logs).toEqual(mockParsedLogs);

    //     expect(processLogs).toHaveBeenCalledWith([mockParsedLogs[0]]);
    //     expect(processLogs).toHaveBeenCalledWith([mockParsedLogs[1]]);
    //     expect(broadcastLog).toHaveBeenCalledWith(mockParsedLogs[0]);
    //     expect(broadcastLog).toHaveBeenCalledWith(mockParsedLogs[1]);
    // });
});
