import { NextResponse } from 'next/server';

let clients: any[] = [];

export async function GET() {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });


  const stream = new ReadableStream({
    start(controller) {
      const client = { controller };
      clients.push(client)

      controller.close = () => {
        clients = clients.filter((c) => c !== client);
      };
    },
    cancel() {
      
    },
  });

  return new NextResponse(stream, { headers });
}

export async function POST(req: Request) {
  const body = await req.json();

  clients.forEach((client) => {
    try {
      client.controller.enqueue(`data: ${JSON.stringify(body)}\n\n`);
    } catch (error) {
      return NextResponse.json("Error al enviar datos");
    }
  });

  return NextResponse.json({ message: "Notificación enviada" });
}