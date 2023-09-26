import request from 'supertest';
import { response } from 'express';
import app from '../src/index';
import { authenticateUser } from '../src/service/userData';
import { AppDataSource } from '../src/data-source';

describe('Authenticate User Function', () => {
  it('should return a user when match is found', async () => {
    
    await AppDataSource.initialize();
    const userName = 'test'
    const user = await authenticateUser(userName);
    expect(user?.email).toBe(userName);
  });
});


