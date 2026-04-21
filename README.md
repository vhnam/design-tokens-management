# Design Tokens Management

A TanStack Start app for managing multi-layer design tokens with SQLite persistence, Better Auth authentication, and Park UI components powered by Panda CSS.

## Tech Stack

- TanStack Start + TanStack Router
- React 19 + Vite
- Park UI + Panda CSS
- Better Auth
- Drizzle ORM + Drizzle Kit
- SQLite (via `better-sqlite3`)

## Prerequisites

- Node.js 20+
- pnpm 9+

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create local environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Fill required values in `.env.local`:
   - `BETTER_AUTH_URL` (for local dev: `http://localhost:3000`)
   - `BETTER_AUTH_SECRET` (generate with `npx -y @better-auth/cli secret`)
   - `DATABASE_URL` (for local SQLite: `dev.db`)
   - `MAILER_TOKEN` (required for verification emails)
   - `TURSO_DATABASE_URL` (optional, used by cloud sync flows)
   - `TURSO_AUTH_TOKEN` (optional, used by cloud sync flows)

4. Run Better Auth migrations:

   ```bash
   pnpm dlx auth@latest migrate
   ```

   This creates/updates Better Auth tables (`user`, `session`, `account`, `verification`).

5. Run Drizzle migrations:

   ```bash
   pnpm db:migrate
   ```

   This applies app-specific schema changes from `src/db/schema.ts`.

6. Start development server:

   ```bash
   pnpm dev
   ```

App runs at `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Start local development server on port `3000`
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build locally
- `pnpm test`: Run tests with Vitest
- `pnpm lint`: Run ESLint
- `pnpm format`: Check formatting with Prettier
- `pnpm check`: Auto-fix formatting and lint issues
- `pnpm db:generate`: Generate Drizzle migration files from schema
- `pnpm db:migrate`: Apply pending migrations
- `pnpm db:push`: Push schema changes directly to database
- `pnpm db:push:cloud`: Push schema using the Turso config
- `pnpm db:pull`: Pull schema from existing database
- `pnpm db:studio`: Open Drizzle Studio
- `pnpm db:sync`: Sync local and cloud database state

## Authentication

- Better Auth is configured in `src/lib/auth.ts`.
- Auth API handlers are exposed at `src/routes/api/auth/$.ts`.
- Client helpers live in `src/lib/auth-client.ts`.
- UI auth flows live under `src/routes/auth/` (`login`, `register`, `verify-email`).

## Database

- Drizzle schema: `src/db/schema.ts`
- Drizzle config: `drizzle.config.ts`
- Migration output: `drizzle/`
- Database client: `src/db/index.ts`

Current schema models token layers and workspaces, including:

- `primitive_tokens`
- `semantic_tokens`
- `brand_overrides`
- `component_tokens`
- `workspaces`

## Routing

This project uses file-based routing with TanStack Router:

- Root shell/layout: `src/routes/__root.tsx`
- Home route: `src/routes/index.tsx`

## UI System

- Panda config: `panda.config.ts`
- Theme source: `src/theme/`
- UI components: `src/components/ui/`
- Global styles entry: `src/styles.css`

## Notes

- Do not commit real secrets in `.env.local`.
- Keep `.env.example` as the source of truth for required environment variables.
