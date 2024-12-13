import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const user = req.headers.get('user'); // Opcional: recuperar el usuario del middleware

    return NextResponse.json({ message: 'This is a protected route', user: JSON.parse(user || '{}') });
}
