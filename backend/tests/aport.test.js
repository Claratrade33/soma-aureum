import request from 'supertest';
import app from '../server';

describe('POST /api/aportes', () => {
  it('deve criar um aporte válido', async () => {
    const res = await request(app)
      .post('/api/aportes')
      .send({ username:'Teste', aporte:3000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.tier).toBe('Prata');
  });
});
