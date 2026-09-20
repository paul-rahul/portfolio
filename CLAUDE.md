# Portfolio Project

Personal portfolio website for Rahul Paul.

## Status

Scaffolding only — stack, structure, and content are not yet decided.
This file is scoped to this directory; it does not affect other projects
and is separate from the global `~/.claude/CLAUDE.md` communication-style
rules (which still apply on top of this).

## Resuming work — read this first, every session

Before doing anything else in this project, read the project's own memory
index at `~/.claude/projects/-Users-rahulpaul-Downloads-portfolio/memory/MEMORY.md`
and follow its links. This memory store is separate from the global
session memory — it only applies here. Read order:

1. **`portfolio_open_questions.md`** first, always — it states exactly
   what's undecided and what was being discussed when the last session
   ended. Treat it as the entry point, not an afterthought.
2. Then whichever of these are relevant to the current ask:
   `experience_data_reconciled.md` (authoritative career/metric facts —
   use these over any resume file or earlier draft if they conflict),
   `portfolio_ia_decisions.md` (site structure decisions), `portfolio_
   content_menu_and_voice.md` (section list + writing voice, with
   reasoning), `portfolio_inspiration_findings.md` (patterns from 5
   reviewed portfolio sites), `feedback_plan_file_scope.md` (how to handle
   planning continuity on this project specifically).
3. Also check for a plan file at
   `~/.claude/plans/there-are-a-bunch-shimmying-hickey.md` — it may hold
   more granular working notes than memory, but it's task-scoped and can
   go stale or get superseded once real implementation starts; memory is
   the more durable source if the two conflict.

Do not re-ask the user questions already answered in memory (e.g. Media.net
split, writing voice) — check first. Do surface what's still genuinely
open per `portfolio_open_questions.md` rather than guessing.

## Decided

- **Tech stack**: Astro (static output). Chosen over plain HTML/CSS/JS
  (repeated structured content — Career entries, metric cards, Built
  project cards — needs a content-collection model) and over Next.js
  (no need for SSR/API routes; fighting Next into static export is
  the wrong tradeoff for a content-first site).
- **Hosting**: Cloudflare Pages, not GitHub Pages. Driven by the
  wildcard-subdomain plan for Built projects (each project addressable
  at its own subdomain once the domain is purchased) — GitHub Pages
  has no wildcard subdomain/SSL support, Cloudflare Pages + Cloudflare
  DNS does. GitHub remains the source repo; Cloudflare Pages deploys
  from it via CI on push, with per-branch deploy previews.
- **Local dev loop**: `npm run dev` (Astro dev server, HMR) for
  day-to-day work, `npm run build` + `npm run preview` to sanity-check
  the real static output before pushing, Cloudflare Pages branch
  previews as the last check before merging to main.
- **Directory layout**: `src/content/{career,internships,built}` as
  typed content collections (one entry per role/project), shared
  layouts per section type, `src/components/` for reusable pieces
  (MetricCard, DesignDecisions block, QuickFactStrip). Full proposed
  tree is in memory — see below.

## To be filled in once decided

- Content for the Built section (Rahul hasn't listed actual
  vibe-coding projects yet — do not invent placeholders)
- Whether Built uses a Products/Prototypes/Projects split or a flat
  list (depends on the above)
- Any conventions (naming, formatting, linting)

## Relevant skills

Narrowed from the full installed skill catalog to what actually applies to
this project. Revisit if the stack or scope changes.

- **Primary**: `impeccable` — design direction, critique, and polish loop for
  the site's UI. Covers what `design-taste-frontend` and `emil-design-eng`
  would otherwise cover separately — use this instead of those two.
- **Supporting**: `design-system` (color/spacing/type tokens), `apple-design`
  + `animate` (motion). `ui-styling` also applies, but only if the stack ends
  up being React/Tailwind — irrelevant for a static HTML/CSS build.
- **Once code exists**: `code-review` / `simplify` for reviewing diffs, `run`
  for launching and verifying the site in-browser after changes.
- **Situational**: `imagegen-frontend-web` — AI-generated reference imagery
  during the design phase, if wanted.
- **Growth-triggered (soft threshold, not a scheduled job)**:
  `understand-anything:*` — not useful yet, there's no codebase to map. Once
  the project's file count or structural complexity grows enough that
  navigating it gets hard (rough guide: file count crosses ~25, or a new
  major section/feature area is added), proactively suggest running it
  during an active session. This is a check-when-working threshold, not a
  cron/schedule — CLAUDE.md notes have no clock of their own.
- **Explicitly dropped** (don't re-litigate): `design-taste-frontend`,
  `emil-design-eng` (superseded by `impeccable` above), `brandkit`, `brand`,
  `design` (the umbrella skill — overkill for a solo portfolio). Also note:
  `promptive-sentry` does not exist as an installed skill (checked, not
  found under `~/.claude`).
