import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';
import type { AppConfig } from '../../config/appConfig.js';

const config: AppConfig = {
  nodeEnv: 'test',
  port: 3000,
  corsOrigin: 'http://localhost:5173',
  database: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'knowledge_base',
  },
  auth: {
    jwtSecret: 'test-secret',
    jwtExpiresIn: '1h',
  },
};

describe('Knowledge Base API app', () => {
  it('returns health status', async () => {
    const response = await request(createApp(config)).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        service: 'knowledge-base-api',
        status: 'ok',
      },
    });
  });

  it('rejects login when required fields are missing', async () => {
    const response = await request(createApp(config)).post('/api/v1/auth/login').send({});

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: 'Email or username and password are required.',
    });
  });

  it('rejects invalid credentials', async () => {
    const response = await request(createApp(config)).post('/api/v1/auth/login').send({
      identifier: 'admin',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: 'Invalid email, username, or password.',
    });
  });

  it('logs in an admin user and returns profile data without password details', async () => {
    const response = await request(createApp(config)).post('/api/v1/auth/login').send({
      identifier: 'admin',
      password: 'Admin@123',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toEqual(expect.any(String));
    expect(response.body.data.user).toEqual({
      id: 'admin-001',
      email: 'admin@knowledgebase.local',
      username: 'admin',
      role: 'Admin',
      department: 'Management',
      position: 'Manager',
    });
    expect(response.body.data.user.passwordHash).toBeUndefined();
  });

  it('returns the authenticated user for a valid token', async () => {
    const app = createApp(config);
    const login = await request(app).post('/api/v1/auth/login').send({
      identifier: 'normaluser',
      password: 'User@123',
    });

    const response = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${login.body.data.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        user: {
          id: 'user-001',
          email: 'normal.user@knowledgebase.local',
          username: 'normaluser',
          role: 'Normal User',
          department: 'Design',
          position: 'Team Leader',
        },
      },
    });
  });

  it('rejects missing and invalid tokens for protected routes', async () => {
    const app = createApp(config);
    const missingToken = await request(app).get('/api/v1/auth/me');
    const invalidToken = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-token');

    expect(missingToken.status).toBe(401);
    expect(missingToken.body.message).toBe('Authentication is required.');
    expect(invalidToken.status).toBe(401);
    expect(invalidToken.body.message).toBe('Session expired or invalid. Please log in again.');
  });
});
