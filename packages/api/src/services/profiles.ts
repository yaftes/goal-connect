import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db, connectionRequests, profiles } from "@goal-connect/db";

export function listProfiles() {
  return db.select().from(profiles).all();
}

export function getProfileById(id: string) {
  const row = db
    .select()
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1)
    .all();
  return row[0] ?? null;
}

export function createConnectionRequest(
  scoutProfileId: string,
  playerProfileId: string,
) {
  const scout = getProfileById(scoutProfileId);
  const player = getProfileById(playerProfileId);
  if (!scout || scout.role !== "scout") {
    throw new Error("Invalid scout profile");
  }
  if (!player || player.role !== "player") {
    throw new Error("Invalid player profile");
  }

  const id = randomUUID();
  db.insert(connectionRequests)
    .values({
      id,
      scoutProfileId,
      playerProfileId,
      status: "pending",
      createdAt: Date.now(),
    })
    .run();

  return { id };
}
