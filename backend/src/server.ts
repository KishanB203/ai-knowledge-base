import { createApp } from './infrastructure/webserver/express/app.js';
import { loadConfig } from './infrastructure/config/appConfig.js';

const config = loadConfig();
const app = createApp(config);

const server = app.listen(config.port, () => {
  console.log(`Knowledge Base API listening on port ${config.port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received. Closing Knowledge Base API server.`);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
