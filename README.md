# Visa — online visa service

A landing page and API for an online visa, passport and travel declaration service (iVisa.com analog). English UI, destination pages for popular countries, and a backend foundation with a database.

## Stack

**Frontend** (root)

- React 19 + TypeScript, React Router
- Vite 6
- Tailwind CSS 4 (custom theme in `src/index.css`)
- Lucide React (icons), flag-icons (SVG country flags)

**Backend** (`server/`)

- Express 4 + TypeScript (run with tsx)
- Prisma ORM + SQLite (`server/prisma/dev.db`)

## Getting started

Frontend:

```bash
npm install
npm run dev          # http://localhost:5173
```

Backend (in a separate terminal):

```bash
cd server
npm install
npx prisma migrate dev   # create/update the database
npm run db:seed          # seed destinations
npm run dev              # http://localhost:3001
```

Vite proxies `/api/*` requests to the backend (see `vite.config.ts`), so the frontend talks to the API without CORS setup.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Create an account (sets auth cookie) |
| POST | `/api/auth/login` | Sign in (sets auth cookie) |
| POST | `/api/auth/logout` | Sign out (clears auth cookie) |
| GET | `/api/auth/me` | Current user or 401 |
| GET | `/api/destinations` | List all destinations |
| GET | `/api/destinations/:code` | Destination by country code |
| POST | `/api/applications` | Submit a visa application (linked to the user when signed in) |
| GET | `/api/applications/mine` | Applications of the signed-in user |
| GET | `/api/applications` | List submitted applications |

Auth uses a JWT stored in an httpOnly cookie (`bcryptjs` password hashing). Set `JWT_SECRET` in the environment for production.

## Structure

- `src/pages/HomePage.tsx` — landing page (hero, how it works, benefits, destinations, testimonials, FAQ)
- `src/pages/DestinationPage.tsx` — country page (`/destinations/:code`) with details and an application form
- `src/components/ApplicationForm.tsx` — form that POSTs to `/api/applications`
- `src/data/destinations.ts` — destination content shared with the seed script
- `server/prisma/schema.prisma` — `Destination` and `Application` models
- `server/src/routes/` — API route handlers

## Design tokens (Tailwind `@theme`)

| Token | Value | Usage |
|---|---|---|
| `primary` | `#1D4ED8` | main blue |
| `primary-light` | `#EFF6FF` | light background |
| `accent` | `#F97316` | CTA buttons |
| `ink` | `#0F172A` | headings |
| `muted` | `#64748B` | secondary text |
