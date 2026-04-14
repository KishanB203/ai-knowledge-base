import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { verifyDatabaseConnection } from "./config/db.js";

async function startServer() {
  try {
    await verifyDatabaseConnection();
    console.log("MySQL connection verified.");
  } catch (error) {
    console.warn("MySQL connection could not be verified during startup.");
    console.warn(error);
  }

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Knowledge Base API listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Server failed to start.");
  console.error(error);
  process.exit(1);
});
