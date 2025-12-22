import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { pool } from "./db.js";

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());

app.get("/health", async (req, res) => {
  try {
    const r = await pool.query("select 1 as ok");
    res.json({ ok: true, db: r.rows[0].ok });
  } catch (err) {
    console.error("DB health check failed:", err);
    res.status(500).json({ ok: false, db: false });
  }
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`\nShutting down (${signal})...`);
  server.close(async () => {
    try {
      await pool.end();
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));


