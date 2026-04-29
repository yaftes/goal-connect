import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

/** `role` is enforced as `"player"` | `"scout"` in application code and API. */
export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  role: text("role").notNull(),
  displayName: text("display_name").notNull(),
  bio: text("bio"),
  city: text("city"),
  birthYear: integer("birth_year"),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const connectionRequests = sqliteTable("connection_requests", {
  id: text("id").primaryKey(),
  scoutProfileId: text("scout_profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  playerProfileId: text("player_profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});
