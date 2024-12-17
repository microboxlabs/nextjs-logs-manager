import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import { Readable } from "stream";
import { processLogs } from "@/src/services/logs.processLogs.service";
import os from "os";
import fs from "fs";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || (token.role as string).toLowerCase() !== "admin") {
            return NextResponse.json({ message: "Unauthorized: Admin access required" }, { status: 403 });
        }

        const incomingReq = await toNodeRequest(req);
        const file = await parseForm(incomingReq);

        console.log("Archivo procesado:", file);
        console.log("Verificando existencia con existsSync:", fs.existsSync(file.filepath));

        const fileContent = await fileToString(file.filepath);
        const logs = parseLogs(fileContent);

        await processLogs(logs);

        return NextResponse.json({
            message: "Logs processed successfully",
            logs,
        });
    } catch (error: any) {
        console.error("Error processing file:", error);
        return NextResponse.json({ message: "Error processing file", error: error.message }, { status: 500 });
    }
}

async function toNodeRequest(req: NextRequest): Promise<any> {
    if (!req.body) {
        throw new Error("Request body is null");
    }

    const readable = Readable.from(webStreamToAsyncIterable(req.body as ReadableStream));
    const nodeReq = Object.assign(readable, {
        headers: Object.fromEntries(req.headers),
        method: req.method,
        url: req.url,
    });

    return nodeReq;
}

function webStreamToAsyncIterable(stream: ReadableStream) {
    const reader = stream.getReader();
    return {
        async *[Symbol.asyncIterator]() {
            while (true) {
                const { done, value } = await reader.read();
                if (done) return;
                yield value;
            }
        },
    };
}

const parseForm = async (req: any): Promise<formidable.File> => {
    const contentType = req.headers["content-type"];

    if (contentType?.includes("multipart/form-data")) {
        const tmpDir = os.tmpdir();

        // Opcional: Verificar que se puede escribir en el directorio
        // if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

        const form = formidable({
            multiples: false,
            keepExtensions: true,
            uploadDir: tmpDir,
        });

        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error("Error al parsear el formulario:", err);
                    return reject(err);
                }

                console.log("Campos recibidos:", fields);
                console.log("Archivos recibidos:", files);

                const fileArray = files.file as formidable.File[];
                if (fileArray && Array.isArray(fileArray) && fileArray.length > 0) {
                    const file = fileArray[0];
                    console.log("Archivo procesado:", file);

                    return resolve(file);
                }
                return reject(new Error("No file was uploaded or file path is missing"));
            });
        });
    }

    throw new Error("Unsupported content type");
};

const fileToString = async (filePath: string): Promise<string> => {
    const fsP = (await import("fs")).promises;

    try {
        console.log("Verificando existencia del archivo:", filePath);
        await fsP.access(filePath);
        console.log("Leyendo el archivo...");
        return await fsP.readFile(filePath, "utf-8");
    } catch (err) {
        console.error("El archivo no existe o no se puede leer:", err);
        throw new Error("File not found or inaccessible");
    }
};

const parseLogs = (content: string) => {
    const lines = content.split("\n").map((line) => line.trim());
    return lines
        .map((line) => {
            const match = line.match(/^\[(.+)\] \[(.+)\] (.+): (.+)$/);
            return match
                ? {
                    timestamp: match[1],
                    level: match[2],
                    service: match[3],
                    message: match[4],
                }
                : null;
        })
        .filter((log) => log !== null);
};
