import { Router } from "express";
import { z } from "zod";
import {
  createConnectionRequest,
  getProfileById,
  listProfiles,
} from "../services/profiles.js";

const connectionRequestBody = z.object({
  playerProfileId: z.string().min(1),
});

export const v1Router = Router();

v1Router.get("/profiles", (_req, res) => {
  res.json(listProfiles());
});

v1Router.get("/profiles/:id", (req, res) => {
  const profile = getProfileById(req.params.id);
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }
  res.json(profile);
});

v1Router.post("/connection-requests", (req, res) => {
  const scoutHeader = req.headers["x-dev-scout-profile-id"];
  const scoutProfileId =
    typeof scoutHeader === "string" ? scoutHeader.trim() : "";

  if (!scoutProfileId) {
    res.status(401).json({
      error: "Missing X-Dev-Scout-Profile-Id (dev auth placeholder)",
    });
    return;
  }

  const parsed = connectionRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const result = createConnectionRequest(
      scoutProfileId,
      parsed.data.playerProfileId,
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Bad request",
    });
  }
});
