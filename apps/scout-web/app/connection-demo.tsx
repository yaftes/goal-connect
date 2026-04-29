"use client";

import { useState } from "react";
import { Button } from "@goal-connect/ui/button";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

/** Matches seeded demo scout in `pnpm db:seed`. */
const DEMO_SCOUT_PROFILE_ID = "profile-demo-scout";

export function ConnectionDemo() {
  const [playerProfileId, setPlayerProfileId] = useState(
    "profile-demo-player",
  );
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    setStatus(null);
    const res = await fetch(`${API_BASE}/api/v1/connection-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Dev-Scout-Profile-Id": DEMO_SCOUT_PROFILE_ID,
      },
      body: JSON.stringify({ playerProfileId }),
    });
    const body = await res.json().catch(() => ({}));
    setStatus(
      res.ok
        ? `Created (${res.status}): ${JSON.stringify(body)}`
        : `Error (${res.status}): ${JSON.stringify(body)}`,
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
      <p className="text-sm font-medium text-neutral-900">
        Dev: send a connection request (scout auth placeholder header)
      </p>
      <label className="flex flex-col gap-1 text-sm text-neutral-700">
        Player profile id
        <input
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900"
          value={playerProfileId}
          onChange={(e) => setPlayerProfileId(e.target.value)}
        />
      </label>
      <Button type="button" onClick={() => void submit()}>
        POST /connection-requests
      </Button>
      {status ? (
        <pre className="whitespace-pre-wrap text-xs text-neutral-700">{status}</pre>
      ) : null}
    </div>
  );
}
