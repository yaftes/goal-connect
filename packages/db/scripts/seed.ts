import { db } from "../src/index.js";
import { profiles, users } from "../src/schema.js";

const PLAYER_USER = "user-demo-player";
const SCOUT_USER = "user-demo-scout";
const PLAYER_PROFILE = "profile-demo-player";
const SCOUT_PROFILE = "profile-demo-scout";

function main() {
  const existing = db.select().from(users).limit(1).all();
  if (existing.length > 0) {
    console.log("seed skipped: users already exist");
    return;
  }

  db.insert(users)
    .values([
      {
        id: PLAYER_USER,
        email: "player@demo.goal-connect.local",
        createdAt: Date.now(),
      },
      {
        id: SCOUT_USER,
        email: "scout@demo.goal-connect.local",
        createdAt: Date.now(),
      },
    ])
    .run();

  db.insert(profiles)
    .values([
      {
        id: PLAYER_PROFILE,
        userId: PLAYER_USER,
        role: "player",
        displayName: "Kidus Bekele",
        bio: "Winger · Addis Ababa",
        city: "Addis Ababa",
        birthYear: 2008,
        createdAt: Date.now(),
      },
      {
        id: SCOUT_PROFILE,
        userId: SCOUT_USER,
        role: "scout",
        displayName: "Selam Tadesse",
        bio: "Regional scout · youth pipeline",
        city: "Hawassa",
        birthYear: null,
        createdAt: Date.now(),
      },
    ])
    .run();

  console.log("seed complete");
}

main();
