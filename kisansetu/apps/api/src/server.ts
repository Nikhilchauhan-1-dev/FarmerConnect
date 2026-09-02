import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { healthRouter } from "./routes/health";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

// Foundation phase: only the health-check route is mounted.
// Business routes (auth, marketplace, offers, orders, logistics, etc.)
// are added incrementally in later tasks — see project spec section 25.
app.use("/health", healthRouter);

app.use((_req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.listen(env.port, () => {
  console.log(`[kisansetu-api] listening on http://localhost:${env.port}`);
  console.log(`[kisansetu-api] health check: http://localhost:${env.port}/health`);
});
