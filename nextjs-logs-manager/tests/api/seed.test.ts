import request from 'supertest';

describe('API Route /api/seed', () => {

    it('should return message on GET request', async () => {
        const response = await request('http://localhost:3000').get('/api/seed')
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Se añadieron 2 usuarios de prueba');
    });
});
