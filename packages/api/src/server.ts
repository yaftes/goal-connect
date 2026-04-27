import cors from "cors";
import express from "express";
import { db, sql } from "@goal-connect/db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  try {
    db.all(sql`select 1`);
    res.json({
      ok: true,
      service: "goal-connect-api",
      database: true,
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      service: "goal-connect-api",
      database: false,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
});

const PORT = Number(process.env.PORT ?? 3005);
app.listen(PORT, () => {
  console.log(`goal-connect-api http://localhost:${PORT}/health`);
});
