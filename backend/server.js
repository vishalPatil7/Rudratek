import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projects.js";
import { config } from "./config/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware — Request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// CORS and body parsing
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/projects", projectRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Not found",
  });
});

// Global error handler — catches unhandled errors from async controllers
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.listen(config.PORT, () => {
  console.log(`API running on http://localhost:${config.PORT}`);
});
