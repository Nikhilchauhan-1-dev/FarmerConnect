import { Router } from "express";
import { checkDatabaseConnection } from "../config/db";

export const healthRouter = Router();

// Basic liveness check — does not touch the database.
healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "kisansetu-api",
    timestamp: new Date().toISOString(),
  });
});

// Readiness check — verifies the API can actually reach PostgreSQL.
healthRouter.get("/db", async (_req, res) => {
  const dbConnected = await checkDatabaseConnection();
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "unavailable",
    database: dbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});
