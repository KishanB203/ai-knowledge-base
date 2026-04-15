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
});
