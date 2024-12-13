import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function middleware(req: NextRequest) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.headers.set('user', JSON.stringify(decoded)); // Opcional: pasar el usuario al request
        return NextResponse.next();
    } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/api/protected-route/*'], // Aplica a rutas protegidas específicas
};
