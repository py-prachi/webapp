import request from 'supertest';
import { response } from 'express';
import app from '../src/index';
import { userLogin } from '../src/controller/userController';
import { AppDataSource } from '../src/data-source';

describe('App routes', () => {
  it('should get all users', async () => {
    await AppDataSource.initialize();
    const response = await request(app)
    .post('/api/webapp/login')
    .send({userName: 'test', password: 'test1234'}); 

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined()
    const expectedJwtPayload = atob(response.body.token.split(".")[1]);
    expect(JSON.parse(expectedJwtPayload).sub).toBe("test")
  });
});