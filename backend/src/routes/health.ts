import { Router } from "express";
import { env } from "../config/env.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "knowledge-base-api",
    database: {
      host: env.dbHost,
      port: env.dbPort,
      name: env.dbName,
    },
  });
});

export default router;
