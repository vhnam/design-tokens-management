# Design Tokens Management

A TanStack Start frontend for managing multi-layer design tokens across workspaces, brands, and themes. Connects to an external backend API for data persistence and authentication.

## Tech Stack

- **Framework**: TanStack Start + TanStack Router (file-based routing)
- **UI**: React 19 + Vite 8 + Tailwind CSS v4 + Base UI + Shadcn/ui
- **State**: TanStack Query v5 + Zustand
- **Forms**: React Hook Form + Zod
- **Auth**: better-auth client (backend-driven)
- **HTTP**: Axios (with 401 auto sign-out)

## Prerequisites

- Node.js 22+
- pnpm 9+
- A running [design-tokens-management-api](https://github.com/vhnam2504/design-tokens-management-api) backend

## Quick Start

```bash
pnpm install
cp .env.example .env.local
# Fill in VITE_API_ENDPOINT (see below)
pnpm dev
```

App runs at `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable            | Description                          | Example                   |
| ------------------- | ------------------------------------ | ------------------------- |
| `VITE_API_ENDPOINT` | Base URL of the backend API          | `http://localhost:4000`   |

## Scripts

| Script               | Description                                   |
| -------------------- | --------------------------------------------- |
| `pnpm dev`           | Start development server at `localhost:3000`  |
| `pnpm build`         | Production build                              |
| `pnpm preview`       | Preview production build locally              |
| `pnpm test`          | Run tests with Vitest                         |
| `pnpm lint`          | Run ESLint                                    |
| `pnpm format`        | Check formatting with Prettier                |
| `pnpm check`         | Auto-fix lint and formatting issues           |

## Features

**Token layers:**
- **Primitive tokens** — raw values (colors, dimensions, font sizes, etc.)
- **Semantic tokens** — named design decisions (e.g. `color.text.primary`)
- **Component tokens** — component-specific overrides

**Supported token types:** Color, Dimension, FontFamily, FontWeight, Duration, CubicBezier, Number, Typography, Shadow, Border, Gradient

**Workspaces:** Isolated environments per design system, each with their own brands and light/dark themes.

## Authentication

Auth is handled by the backend via `better-auth`. The client (`src/integrations/better-auth/auth-client.ts`) points to `VITE_API_ENDPOINT`.

Auth flows (under `src/routes/_public/auth/`):
- Email/password login and registration
- Email verification
- Forgot password / reset password

## Project Structure

```
src/
├── components/
│   ├── primitives/        # Base UI components
│   └── composites/        # Complex form components
├── config/
│   └── env.ts             # Environment variable validation (t3-env)
├── features/              # Feature modules by domain
│   ├── auth/
│   ├── primitive-tokens/
│   ├── semantic-tokens/
│   ├── component-tokens/
│   ├── workspaces/
│   └── settings/
├── integrations/
│   ├── axios/             # Configured API client
│   ├── better-auth/       # Auth client
│   └── tanstack-query/    # React Query setup
├── queries/               # TanStack Query hooks and mutations
├── routes/                # File-based routes (TanStack Router)
│   ├── _protected/        # Requires authentication
│   └── _public/auth/      # Login, register, password flows
├── schemas/               # Zod validation schemas
├── stores/                # Zustand client state
└── types/                 # TypeScript type definitions
```

## Notes

- Do not commit real secrets in `.env.local`.
- Keep `.env.example` as the source of truth for required environment variables.
