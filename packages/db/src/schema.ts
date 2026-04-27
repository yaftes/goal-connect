import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** App validates `role` as `"player"` | `"scout"` before insert. */
export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  role: text("role").notNull(),
  displayName: text("display_name").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});
