import mysql from 'mysql2/promise';
import type { DatabaseConfig } from './appConfig.js';

export function createDatabasePool(config: DatabaseConfig) {
  return mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export async function verifyDatabaseConnection(config: DatabaseConfig): Promise<boolean> {
  const pool = createDatabasePool(config);

  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    return Array.isArray(rows);
  } finally {
    await pool.end();
  }
}
