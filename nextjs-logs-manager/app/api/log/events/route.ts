export const dynamic = "force-dynamic"; // Esto fuerza SSR y evita prerendering
import { addClient, removeClient } from "../../../../src/lib/broadcast";

export async function GET(req: Request): Promise<Response> {
    const headers = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    const stream = new ReadableStream({
        start(controller) {
            addClient(controller);

            controller.enqueue(`data: Connection established\n\n`);

            req.signal.addEventListener("abort", () => {
                removeClient(controller);
                controller.close();
            });
        },
    });

    return new Response(stream, { headers });
}
