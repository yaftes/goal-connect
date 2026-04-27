import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile =
  process.env.GOAL_CONNECT_DB_PATH ??
  path.join(__dirname, "..", "goal-connect.db");

const sqlite = new Database(dbFile);
export const db = drizzle(sqlite, { schema });

export { profiles } from "./schema.js";
export { sql } from "drizzle-orm";
