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

---

## Phase 01 — Foundation / Design System

Status: complete
Branch: redesign/01-foundation
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- Rewrote `src/styles/tokens.css` end to end onto the Technical Editorial palette
  (`--background:#f6f6f3`, `--surface:#fff`, `--ink:#111`, `--ink-secondary:#5f5f5f`,
  `--border:#ddddda`, `--accent:#4f63ff`, `--accent-soft:#eef0ff`, `--success:#1f8a5b`), a
  3-tier radius scale (`--radius-sm:8px / --radius-md:12px / --radius-lg:16px`), and a
  restrained shadow token. No selectors renamed — every component/page keeps working against
  the same class names, only the values changed.
- New type system: headings in Instrument Sans (weight 600, tighter but not extreme tracking),
  body in Inter, metrics/labels/mono accents in JetBrains Mono. Added Google Fonts `<link>`
  tags to `BaseLayout.astro` (preconnect + stylesheet) since no web fonts were actually loaded
  before — the old DM Sans/Arial Rounded/Comic Sans stack was silently falling back to system
  fonts already.
- Removed the banned fonts everywhere: Arial Rounded MT Bold → Instrument Sans on all
  headings/metrics; Comic Sans MS (`.hand-note`, used on the About page's "currently → Austin"
  callout) → JetBrains Mono uppercase accent label, no more rotation.
- Removed/neutralized playful devices per the plan's explicit list: rainbow `.top-ribbon` →
  solid 3px accent line; rotated `.image-frame` / `.case-card` hover → flat, hover is a plain
  border-color + small translateY lift, no rotation anywhere; pill-shaped nav links → underline
  on hover/active; pill `.header-cta` / `.button` → 8px-radius rectangles; floating `.float-note`
  pills → small bordered mono tags (kept, de-styled — still present in current hero markup,
  Phase 3 will replace/rewrite that markup); per-section/per-card pastel backgrounds
  (`.lilac`/`.mint`/`.peach`/`.sky`/`.butter` card variants, `.built-placeholder`,
  `.page-chip`) → neutral surface/background with hairline borders; oversized radii (22–44px)
  → capped at 16px site-wide, hero image frame down from 44px to 16px.
- Added `color-scheme: light` (CSS on `html`) and `<meta name="color-scheme" content="light">`
  to explicitly declare this as a light-only site.
- `npm run build`: PASS (7 routes) both before and after the color-scheme addition.

Important decisions:
- Left `src/data/roles.ts`'s per-role `color` field and the `career/index.astro` inline
  `style="--surface: ${role.color}"` in place for now, but `.metric-tile` and `.role-number`
  no longer read `var(--surface, ...)` — they use flat `var(--background)` / `var(--border)`
  directly. So the per-employer pastel coding is already visually neutralized; the inline style
  attribute and `color` field are now dead code. Flagged for cleanup in Phase 4 (career page
  restructure) rather than touched here, to keep this phase CSS-token-only per the plan
  ("do not rewrite page content yet").
- Verified the design visually via the `claude-in-chrome` browser tools, but this specific
  Chrome automation profile has Chrome's "Auto Dark Mode for web contents" forced on
  (`window.matchMedia('(prefers-color-scheme: dark)').matches` → `true`, computed
  `body` background comes back as Chrome's own dark repaint color rgb(24,26,27) instead of the
  real `#f6f6f3`). Confirmed this is a browser-profile setting, not a site bug, by reading the
  actual built CSS output directly (`dist/**/*.css` has the correct `#f6f6f3`/`#111` values).
  `color-scheme: light` + the meta tag did not override it, and chrome://flags isn't reachable
  through the automation tool to disable it. Screenshots taken through that tool for the rest of
  this project will show inverted/approximated colors — trust the CSS source and layout/spacing
  shown in the screenshot, not the literal pixel colors, unless cross-checked against the
  stylesheet.

Files materially changed:
- `src/styles/tokens.css` (full rewrite)
- `src/layouts/BaseLayout.astro` (font `<link>` tags, color-scheme meta)

Validation:
- npm run build: PASS
- dev mode: PASS (ran on port 4322, all checked routes returned 200 and rendered with correct
  structure/typography/spacing per the browser-profile caveat above)

Known issues / deferred items:
- `roles.ts` `color` field + inline `--surface` style now unused in practice — clean up in
  Phase 4.
- Hero `.float-note` floating tags still present in homepage markup (de-styled but not yet
  redesigned/removed) — Phase 3.
- Chrome automation profile forces dark mode; can't disable via available tools. Future phases
  should keep cross-checking actual CSS/computed styles (via `javascript_tool` computed-style
  queries or reading built CSS) rather than trusting screenshot colors at face value.

Next phase:
- Phase 2 — Global shell / navigation
