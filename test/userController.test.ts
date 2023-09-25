import request from 'supertest';
import { response } from 'express';
import app from '../src/index';
import { authenticateUser } from '../src/service/userData';
import { User } from '../src/entity/User';

jest.mock('../src/service/userData')
const authenticateUserMock = authenticateUser as jest.Mock;

jest.mock('../src/entity/User')

describe('Authentication', () => {
  it('should return 400 when no username or password', async () => {
    const response = await request(app).post('/api/webapp/login').send({userName: '', password: ''}); 
    expect(response.status).toBe(400);
  });

  // it('should retun 401 when invalid credentials',async () => {
  //   const response = await request(app).post('/api/webapp/login').send({userName: 'test1@test.com', password: 'invalidpassword'}); 
  //   expect(response.status).toBe(401);
  // })
});