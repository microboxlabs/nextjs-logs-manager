import request from 'supertest';

describe('API Route /api/log', () => {

    it('should return an error message when the user is not authenticated', async () => {
        const response = await request('http://localhost:3000').post('/api/log').send({})
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("no user authentificated");
    });


});
