# Visa — online eVisa service

Landing page and API for an online eVisa service. English UI, destination pages, and a backend with authentication and applications.

## Stack

**Frontend** (`frontend/`)

- React 19 + TypeScript, React Router
- Vite 6
- Tailwind CSS 4
- Lucide React, flag-icons

**Backend** (`backend/`)

- Express 4 + TypeScript (`tsx`)
- Prisma ORM + SQLite (`backend/prisma/dev.db`)

## Getting started

Requires Node.js 22+.

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Backend (separate terminal):

```bash
cd backend
npm install
npm run db:setup     # migrate + seed
npm run dev          # http://localhost:3001 (`predev` also applies migrations)
```

Or from the repo root, after `npm install` in `frontend/`, `backend/`, and the root:

```bash
npm run dev          # frontend + backend together
```

Vite proxies `/api/*` to the backend (`frontend/vite.config.ts`), so the browser talks to one origin in development.

## Scripts

| Command | Where | Description |
|---|---|---|
| `npm run dev` | root | Start frontend and backend together |
| `npm run typecheck` | root | Typecheck both apps |
| `npm run lint` | frontend | Lint the UI |
| `npm run build` | frontend | Production build |
| `npm run db:setup` | backend | Apply migrations and seed destinations |
| `npm run db:migrate` | backend | Apply Prisma migrations |
| `npm run db:seed` | backend | Seed destinations |

## Environment

See `backend/.env.example` and `frontend/.env.example`.

| Variable | App | Purpose |
|---|---|---|
| `PORT` | backend | API port (default `3001`) |
| `CORS_ORIGIN` | backend | Allowed frontend origin |
| `DATABASE_URL` | backend | SQLite path for Prisma |
| `JWT_SECRET` | backend | Required in production |
| `VITE_API_BASE_URL` | frontend | API prefix (default `/api`) |
| `API_PROXY_TARGET` | frontend | Vite proxy target in `npm run dev` |

Auth uses a JWT in an httpOnly cookie. Set `JWT_SECRET` in production.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Create an account (sets auth cookie) |
| POST | `/api/auth/login` | Sign in (sets auth cookie) |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user or 401 |
| GET | `/api/destinations` | List destinations |
| GET | `/api/destinations/:code` | Destination by country code |
| POST | `/api/applications` | Submit an application |
| GET | `/api/applications/mine` | Applications of the signed-in user |
| GET | `/api/applications` | List applications |

## Structure

```
frontend/src/
  app/                 App shell and routing
  config/              Site copy, nav, routes, env
  features/            Domain modules (auth, applications, countries, destinations)
  components/layout    Header, footer, contact widget
  components/ui        Shared form and display primitives
  pages/               Route screens (home lives in pages/home)
  lib/                 HTTP client
backend/src/
  config/              Environment
  app.ts               Express app factory
  index.ts             HTTP server and shutdown
  modules/             auth, users, destinations, applications
  middleware/          Errors and 404
  lib/                 Prisma, validation, HttpError
```

- `frontend/src/pages/home/HomePage.tsx` — landing page
- `frontend/src/pages/DestinationPage.tsx` — `/destinations/:code` and `/destinations/:code/:citizenshipCode`
- `frontend/src/features/destinations/visaPolicies.ts` — nationality-specific requirement placeholders
- `backend/prisma/schema.prisma` — `User`, `Destination`, `Application`

## Design tokens (Tailwind `@theme`)

| Token | Value | Usage |
|---|---|---|
| `primary` | `#0F766E` | teal |
| `primary-light` | `#F0FDFA` | light background |
| `accent` | `#0D9488` | CTA buttons |
| `ink` | `#0F172A` | headings |
| `muted` | `#64748B` | secondary text |
