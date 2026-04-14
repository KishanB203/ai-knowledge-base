import dotenv from "dotenv";

dotenv.config();

function toNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  port: toNumber(process.env.PORT, 4000),
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: toNumber(process.env.DB_PORT, 3306),
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "root",
  dbName: process.env.DB_NAME ?? "knowledge_base",
};
