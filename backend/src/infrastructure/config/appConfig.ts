import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  nodeEnv: string;
  port: number;
  corsOrigin: string;
  database: DatabaseConfig;
  auth: AuthConfig;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
}

export function loadConfig(): AppConfig {
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: toNumber(process.env.PORT, 3000),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    database: {
      host: process.env.DB_HOST ?? 'localhost',
      port: toNumber(process.env.DB_PORT, 3306),
      user: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root',
      database: process.env.DB_NAME ?? 'knowledge_base',
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET ?? 'development-only-change-me',
      jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    },
  };
}

function toNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
