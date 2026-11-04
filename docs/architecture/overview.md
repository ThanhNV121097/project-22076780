# Architecture — Trà Sen Hồ Tây

## Shape: `static`

Frontend only. No Go backend, no database, no migrations, no `/healthz`.
The owner does not sell online and reads contact-form messages in Agent
Team through a pre-provisioned endpoint (`src/site.json`'s `api`/`key`) —
there is nothing for this project's own server to do. Confirmed by
`report_shape_ide` at assessment time; `docs/site/SRS.md` §7 and
`docs/contact/SRS.md` §4.3 both describe the same static shape.

## Stack

| Part | Choice |
|---|---|
| Frontend | Vite 6 + React 18 + TypeScript + Tailwind 3 — already scaffolded, already approved by the owner in preview. Not touched by this task. |
| Backend | none — this shape has none |
| Database | none — this shape has none |
| Data | `code/frontend/src/data/*.json` (teas, pots, gallery, story, team, testimonials), read through `src/data/index.ts`'s `useCollection`/`useRecord` hooks — never imported directly by a page |
| Contact delivery | `src/site.ts`'s `sendEnquiry`, posting to the pre-provisioned Agent Team endpoint named in `src/site.json` |

## Folder structure

```
code/frontend/
  src/App.tsx          router — every story adds its own <Route>
  src/theme.css         design tokens — frozen, never edited by a story
  src/content.json      every word on the site
  src/site.json          pre-provisioned contact endpoint (api, key)
  src/site.ts            sendEnquiry(), canSend, PageViews
  src/data/*.json        the six record collections
  src/data/index.ts       useCollection/useRecord — the only way pages read data
  src/pages/{Page}.tsx    one per screen
  src/components/{Component}.tsx
  src/lib/mock/{story}.ts     a story's mock, if any (none needed here — data/*.json already is the mock)
```

No `code/backend/` in this project — the shape has none.

## Key decisions

| Decision | Rejected alternative | Why |
|---|---|---|
| No backend/database | A Go API serving `teas`/`pots`/etc. | SRS §7 (site module) says data stays in `src/data/*.json` for this static shape; nothing here needs persistence or write access the owner controls — adding one is a day saved now, a server to run forever |
| Contact form posts to the pre-provisioned Agent Team endpoint, not a route this repo builds | A Go handler forwarding to Agent Team | `contact` module SRS explicitly scopes this out: "Any backend the team builds — there is none to build" |
| Pages read `src/data/*.json` through `useCollection`/`useRecord`, never by importing the file | Importing JSON directly in each page | `src/data/index.ts`'s own header: when a backend lands later, only this one module changes to call an API — pages do not |

## Naming conventions

- Pages: `src/pages/{PascalCase}.tsx`, one route each (Home, Teas, TeaDetail, Gallery, About, Visit, NotFound).
- Components: `src/components/{PascalCase}.tsx`, named after the story (e.g. `ContactForm.tsx`, `CallButtons.tsx`, `ContactDock.tsx`).
- Every visual value in a component is a Tailwind utility naming a token already in `src/theme.css` (`bg-ground`, `text-ink`, `bg-accent`, …) — no raw hex, no `rgb()`, no arbitrary-value class. CI's token job enforces this.

## Env vars

| Service | Key | Required | Notes |
|---|---|---|---|
| frontend | — | — | No `VITE_*` variable is read by the code today. The contact endpoint's address and key live in the committed `src/site.json`, not in env. `src/data/index.ts`'s header documents `VITE_API_URL` as the key a *future* backend migration would read — not used now; do not add it speculatively. |

Root `.env.example` lists the compose-level overrides (`FRONTEND_PORT`,
`FRONTEND_MEM_LIMIT`, `IMAGE_REPO`, `IMAGE_TAG`) — all optional, all already
defaulted in `docker-compose.yml`.

## How to run

```
docker compose --profile local up --build
```

Serves the frontend at `http://localhost:3000` (override with `FRONTEND_PORT`).
No database to provision, no backend to boot — `docker-compose.yml` already
reflects that (frontend service only).

## CI

`.github/workflows/ci.yml` (committed, not edited by this task): frontend job
runs `npm ci`, `npm run lint`, `npm run build`, `npm test --if-present`; the
`tokens` job rejects hardcoded colours/lengths outside `theme.css`/`index.css`
and checks every used token is defined. `.github/workflows/container.yml`
builds and boots `docker-compose.yml` on every PR. Backend job in `ci.yml`
skips itself (`guard` finds no `code/backend/go.mod`) — expected for this shape.
