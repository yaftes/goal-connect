import { Card } from "@goal-connect/ui/card";
import { ProfileTeaser } from "@goal-connect/ui/profile-teaser";
import type { ProfileSummary } from "@goal-connect/shared";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

async function fetchProfiles(): Promise<ProfileSummary[]> {
  const res = await fetch(`${API_BASE}/api/v1/profiles`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to load profiles (${res.status})`);
  }
  return (await res.json()) as ProfileSummary[];
}

export default async function Page() {
  let profiles: ProfileSummary[] = [];
  let error: string | null = null;

  try {
    profiles = await fetchProfiles();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
          Goal Connect
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900">Player hub</h1>
        <p className="mt-2 text-neutral-600">
          Same UI components power every Goal Connect surface—profiles load from the
          central API.
        </p>
      </header>

      <Card title="Profiles">
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : profiles.length === 0 ? (
          <p className="text-sm text-neutral-600">
            No profiles yet. Run{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
              pnpm db:seed
            </code>{" "}
            from the repo root, ensure the API is running, then refresh.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {profiles.map((p) => (
              <li key={p.id}>
                <ProfileTeaser profile={p} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
}
