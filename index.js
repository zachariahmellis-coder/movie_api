import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("common"));
app.use(express.json());

// Health check route
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true, db: result.rows[0].ok });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({ ok: false });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("\nShutting down server...");
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
