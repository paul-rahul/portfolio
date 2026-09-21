# Redesign Global Decisions

Integration branch:
redesign/technical-editorial

Production branch:
main

Main branch rule:
Never merge into main without Rahul's explicit approval.

Design direction:
Technical Editorial

Primary positioning:
AI/ML Engineer → Product Manager → Product Marketer

Core design principles:
- recruiter-first
- metric-forward
- technically credible
- business-oriented
- restrained
- editorial
- authentic work over decorative AI art
- real photography/products over generic generated visuals
- minimal but intentional motion

---

## Phase 00 — Baseline and Isolation

Status: complete
Branch: redesign/technical-editorial
PR: n/a (root of the redesign; no phase branch to merge)
Merged into: n/a

Implemented:
- Resolved pre-existing uncommitted state on `ui-rehaul` (deleted component/layout files,
  untracked assets) — this was unrelated leftover WIP from a prior session, not part of this
  redesign. Stashed it on `ui-rehaul` rather than discarding (`git stash push -u -m "WIP on
  ui-rehaul before starting technical-editorial redesign"`), so it is recoverable later.
- Created `redesign/technical-editorial` from latest `main` (includes PR #7 UI rehaul, PR #8
  simplify pass, PR #9 canonical domain) in an isolated git worktree at
  `.claude/worktrees/redesign-technical-editorial` (branched fresh from `origin/main`, then
  renamed to `redesign/technical-editorial`).
- Pushed integration branch to origin with upstream tracking.
- `npm install` — clean, 0 vulnerabilities.
- `npm run build` — PASS, 7 static routes generated.

Important decisions:
- Working in a dedicated git worktree rather than the primary checkout, because another
  background job already had `main` checked out in a locked worktree
  (`.claude/worktrees/ui-rehaul`). This isolates redesign work from that job and from the
  user's own working copy.
- Every phase below will get its own branch off `redesign/technical-editorial`, its own PR
  back into it, and a squash merge — per the plan's non-negotiable git workflow. No commits
  land directly on `main` at any point in this project.

### Baseline inventory

Routes (Astro static, `src/pages/`):
- `/` — `index.astro` (hero, career-progression-ish quick facts, featured work cards, closing CTA)
- `/about` — `about.astro`
- `/career` — `career/index.astro` (tabbed role list + role detail panel)
- `/internships` — `internships/index.astro`
- `/built` — `built/index.astro` (placeholder state, no real projects yet)
- `/resume` — `resume.astro`
- `/contact` — `contact.astro`

Components / layouts:
- `src/layouts/BaseLayout.astro` — shell: top ribbon, header, `<slot />`, footer
- `src/components/Nav.astro` — desktop nav (Home, Career, Internships, Built, About, Résumé, Contact)
- `src/components/PageHero.astro` — shared secondary-page hero (chip + h1 + lede)
- `src/components/ArrowIcon.astro` — inline SVG arrow used in CTAs/links
- `src/data/roles.ts` — career role content (Dream11, Media.net, Samsung, Samagra) — authoritative,
  do not touch facts, only presentation

Design tokens (`src/styles/tokens.css`, single global stylesheet, ~1060 lines):
- Palette: `--ink:#241338`, `--cream:#fffaf1`, `--paper:#fffdf8`, `--blue:#3659e3`,
  `--peach:#ffd9c4`, `--mint:#d9f5de`, `--sky:#dcecff`, `--lilac:#e9dcff`, `--butter:#ffe788`
- Typography: body `"DM Sans"`; headings/metrics `"Arial Rounded MT Bold"`; `.hand-note` uses
  `"Comic Sans MS"` (per earlier decision this was *intentional* for hand-note callouts — the
  redesign plan explicitly bans both fonts, so hand-note callouts will be redesigned or removed
  in Phase 1, not just reskinned)
- Geometry: heavy use of large radii (22–44px), rotated cards (`rotate(2deg)` / `rotate(-0.3deg)`
  on hover), floating pill notes (`.float-note`), rainbow `.top-ribbon` gradient, pastel section
  backgrounds per card (`.lilac`, `.mint`, `.peach`, `.sky`, `.butter`)
- No CSS framework — hand-written cascade, no component-scoped styles (all global)

Known TODOs / gaps at baseline:
- `/built` has no real project content yet (honest placeholder) — must stay honest per plan,
  Phase 6 gives it a deliberate "coming soon" editorial state rather than fabricated projects
- Font stack is mid-transition per prior session (`portfolio_font_update` memory: Roboto/Fredoka/
  Caveat was tried, then Fredoka reverted to Poppins) — none of that shows up in the current
  `tokens.css` on this fresh `main`-based branch, so treat DM Sans/Arial Rounded/Comic Sans in
  `tokens.css` above as the actual current baseline, not memory of an in-flight font PR
- No accessibility audit has been done yet (Phase 7)
- No OG/meta image work done yet (Phase 8)

Validation:
- npm run build: PASS
- dev mode: not yet started this session (will validate at first phase needing visual check)

Known issues / deferred items:
- Unrelated in-progress work on `ui-rehaul` (component/layout deletions, new asset files) is
  stashed, not part of this redesign — flag to Rahul separately, do not resolve here.

Next phase:
- Phase 1 — Foundation / design system tokens
