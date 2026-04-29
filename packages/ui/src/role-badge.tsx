import type { ProfileRole } from "@goal-connect/shared";

const styles: Record<ProfileRole, string> = {
  player: "border-emerald-200 bg-emerald-50 text-emerald-900",
  scout: "border-violet-200 bg-violet-50 text-violet-900",
};

export function RoleBadge({ role }: { role: ProfileRole }) {
  const label = role === "player" ? "Player" : "Scout";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[role]}`}
    >
      {label}
    </span>
  );
}
