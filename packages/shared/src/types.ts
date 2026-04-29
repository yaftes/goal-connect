export const PROFILE_ROLES = ["player", "scout"] as const;
export type ProfileRole = (typeof PROFILE_ROLES)[number];

export type ProfileSummary = {
  id: string;
  role: ProfileRole;
  displayName: string;
  city: string | null;
  bio: string | null;
  birthYear: number | null;
};

export type ConnectionRequestInput = {
  playerProfileId: string;
};
