import request from 'supertest';
import { response } from 'express';
import app from '../src/index';

describe('App routes', () => {
  it('should get all users', async () => {
    const response = await request(app).post('/api/webapp/login'); 

    expect(response.status).toBe(200);
    expect(response.body).toBe({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjk1MTk2MjIzfQ.sfNjATxo5BfTSyuBsY5ac60XjpHq5GI7gSpEHg_vL80'
    });

  });
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjk1MTk2MjIzfQ.sfNjATxo5BfTSyuBsY5ac60XjpHq5GI7gSpEHg_vL80