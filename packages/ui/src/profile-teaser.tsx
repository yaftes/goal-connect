import type { ProfileSummary } from "@goal-connect/shared";
import { RoleBadge } from "./role-badge";

export function ProfileTeaser({ profile }: { profile: ProfileSummary }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-neutral-900">
          {profile.displayName}
        </h3>
        <RoleBadge role={profile.role} />
      </div>
      {profile.city ? (
        <p className="text-sm text-neutral-600">{profile.city}</p>
      ) : null}
      {profile.bio ? (
        <p className="text-sm leading-relaxed text-neutral-700">{profile.bio}</p>
      ) : null}
    </article>
  );
}
