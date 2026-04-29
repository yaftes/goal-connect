# Goal Connect

Monorepo for **Goal Connect**: helping young Ethiopian football players connect with scouts and academies through shared profiles and messaging-oriented workflows (under active development).

This repository uses **pnpm** workspaces and **Turborepo** so multiple apps share packages (`@goal-connect/ui`, `@goal-connect/db`, etc.) from one codebase.

## Repository layout

| Path | Description |
|------|-------------|
| [`apps/player-web`](apps/player-web) | Next.js app for the player-facing experience (port **3000**). |
| [`apps/scout-web`](apps/scout-web) | Next.js app for scouts (port **3001**). |
| [`packages/ui`](packages/ui) | Shared React components and global styles (Tailwind CSS v3). |
| [`packages/db`](packages/db) | Drizzle ORM schema, SQLite (`better-sqlite3`), migrations via Drizzle Kit. |
| [`packages/api`](packages/api) | Express HTTP API (default port **3005**). |
| [`packages/shared`](packages/shared) | Shared TypeScript types and constants. |

API routes are versioned under **`/api/v1`** (for example `GET /api/v1/profiles`).

## Prerequisites

- **Node.js** 18+ (20+ recommended for tooling parity with Next.js).
- **pnpm** 10 ([install](https://pnpm.io/installation)); the repo pins `packageManager` in [`package.json`](package.json).

## Setup

From the repository root:

```bash
pnpm install
```

Create a SQLite database from the Drizzle schema and apply it:

```bash
pnpm db:push
```

Seed demo users and profiles (optional but useful for local UI):

```bash
pnpm db:seed
```

If you change the schema in a breaking way, remove the existing DB file and run `db:push` again:

```bash
rm -f packages/db/goal-connect.db
pnpm db:push
pnpm db:seed
```

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` in each Next app as needed, and/or export variables for the API.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for the browser (defaults to `http://localhost:3005` in code if unset). |
| `PORT` | API listen port (default **3005**). |
| `GOAL_CONNECT_DB_PATH` | Override path to the SQLite file used by `@goal-connect/db`. |

## Running locally

Start **API + both Next apps** via Turborepo:

```bash
pnpm dev
```

Typical ports:

| Service | URL |
|---------|-----|
| Player web | http://localhost:3000 |
| Scout web | http://localhost:3001 |
| API | http://localhost:3005 |

Health check: `GET http://localhost:3005/health`

### Scout API demo

`POST /api/v1/connection-requests` expects JSON `{ "playerProfileId": "<id>" }` and a development header **`X-Dev-Scout-Profile-Id`** set to a scout profile id (see seed output / [`packages/db/scripts/seed.ts`](packages/db/scripts/seed.ts)).

## Building

```bash
pnpm exec turbo run build
```

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Runs `turbo run dev` (persistent dev servers where defined). |
| `pnpm build` | Runs `turbo run build`. |
| `pnpm lint` | Runs `turbo run lint`. |
| `pnpm db:push` | Applies schema to SQLite via Drizzle Kit (`packages/db`). |
| `pnpm db:seed` | Inserts demo data (`packages/db`). |

## License

Add a license file when you are ready to publish or collaborate.
