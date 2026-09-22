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

---

## Phase 02 — Global Shell / Navigation

Status: complete
Branch: redesign/02-navigation
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- Trimmed primary nav from `[Home, Career, Internships, Built, About, Résumé, Contact]` to the
  plan's target set: `Work → /career`, `Built → /built`, `About → /about`, `Résumé → /resume`,
  with `Contact` moved out of the link row entirely and re-expressed as the existing
  `.header-cta` pill-turned-rectangle ("Contact" + arrow icon), matching the plan's
  `Work / Built / About / Résumé / Contact →` target exactly.
- `/internships` route is untouched and still reachable (linked from the career page), just no
  longer a top-level nav item, per the plan's explicit allowance.
- Updated brand signature from `Product · AI · ML` to `AI · Product · GTM` in `Nav.astro`.
- Footer left materially as-is (brand block + one positioning line + email link) — already a
  minimal 3-element row with no pills/rotation, judged to already satisfy "simplify footer"
  without further trimming.
- Fixed a mobile-nav gap: the pre-existing `@media (max-width: 680px)` rule hid `.header-cta`
  entirely (`display: none`), which — now that Contact lives only in `.header-cta` and no longer
  has a separate nav-row link — would have made Contact unreachable on small screens, violating
  the phase's explicit "contact remains easy to reach" acceptance criterion. Changed that rule to
  shrink the CTA's padding/font-size instead of hiding it.
- Verified via built HTML (`curl` against dev server, not screenshots): current-route
  `aria-current="page"` correctly applied per-route (checked `/` and `/career`), nav links are
  plain `<a>` tags (native keyboard/tab order, no custom JS needed), desktop/tablet/mobile CSS
  breakpoints at 980px/680px all still resolve correctly after the header-cta fix.

Important decisions:
- Did not add a hamburger/off-canvas mobile menu. The existing pattern (nav row becomes a
  horizontally-scrollable strip under 980px, full-width) was already keyboard/functionally
  sound and matches the plan's minimal/editorial direction; introducing a JS-driven mobile menu
  wasn't asked for and would add interaction surface the plan doesn't call for in this phase.

Files materially changed:
- `src/components/Nav.astro` (nav items, brand signature, Contact merged into header-cta)
- `src/styles/tokens.css` (680px breakpoint: header-cta shrinks instead of disappearing)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — checked rendered header HTML on `/` and `/career` directly (bypassing the
  known Chrome-automation forced-dark-mode issue from Phase 1) for correct nav items, active
  state, and Contact CTA markup.

Known issues / deferred items:
- None carried forward from this phase.

Next phase:
- Phase 3 — Homepage

---

## Phase 03 — Homepage

Status: complete
Branch: redesign/03-home
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- Rewrote the hero headline/lede to the plan's target concept: "I build at the intersection of
  technology, product & market." + the preferred supporting copy ("AI/ML engineer turned product
  manager and product marketer. I turn technical complexity into products customers understand,
  adopt, and businesses can measure."), lightly polished, meaning preserved.
- Removed the clay illustration (`/ml-to-product-clay.jpg`) as the hero device and the two
  `.float-note` pill callouts that sat on top of it. No authentic photography exists in the repo
  yet (`public/` only has the four `*-clay.jpg` illustration assets), so per the plan's fallback
  order (real photo > real work imagery > restrained abstract composition, no fabricated
  screenshots, no AI-art) built a restrained abstract editorial composition instead: a CSS-only
  three-circle "Tech / Product / Market" intersection diagram inside the existing `.image-frame`
  panel, echoing the headline. Left an HTML comment on how to drop a real portrait in later
  without touching layout — swap the `<img>` in, delete `.intersection-diagram`'s children.
- Added the Career Progression module (`01 Engineer / 02 Product / 03 Market`) as a new 3-column
  section directly below the quick-facts strip, using the plan's exact labels/sublines/tag rows.
- Rebuilt quick facts to the plan's 4-item target: `6+ years — Engineering → Product`,
  `$135M+ — Revenue influenced` (reused, unchanged — this figure was already reviewed/accepted
  during the PR #8 merge per prior session memory), `5 industries — AI · Ads · Consumer ·
  GovTech · Hardware`, `McCombs '27 — MBA`. `.fact-strip` grid went from 3 to 4 columns.
- Replaced the two clay-illustration featured-work case images (`/ad-launch-clay.jpg`,
  `/ml-platform-clay.jpg`) and the `.lilac`/`.mint` pastel card variants with a plain
  `.case-visual` panel showing a large mono employer mark (`D11`, `M.`) on a neutral background —
  same "no authentic imagery, so abstract not fabricated/AI-generated" reasoning as the hero.
  Added an explicit "Read case study" link row to each card (previously only the metrics row and
  card-level link existed) per the plan's featured-work bullet list.
- All facts/metrics reused verbatim from `src/data/roles.ts` (Dream11, Media.net) — no numbers
  invented.

Important decisions:
- No new imagery was fabricated or AI-generated anywhere on the page — both instances where the
  plan allowed a fallback (hero, case cards) used plain CSS/typographic devices instead, per the
  plan's explicit "do not fabricate fake product screenshots" / "do not introduce generic
  AI-generated robot/brain imagery" rules and the core design principle "authentic work over
  decorative AI art."
- Left `roles.ts`'s `color` field and Phase-1-flagged dead `--surface` inline style untouched —
  still deferred to Phase 4 (career page) per the Phase 1 note, out of scope here since this
  phase only touched `index.astro` and `tokens.css`.

Files materially changed:
- `src/pages/index.astro` (hero copy/art, progression module, quick facts, featured work cards)
- `src/styles/tokens.css` (`.intersection-diagram`/`.intersection-circle`, `.progression*`,
  `.case-visual`/`.case-mark`/`.case-link` added; `.case-image` and `.case-card.lilac/.mint`
  removed; `.fact-strip` grid-template-columns 3 → 4)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — checked rendered homepage HTML directly via curl (hero, fact-strip,
  progression, case cards all present with correct content/classes) and confirmed the new CSS
  classes exist in the built stylesheet output.

Known issues / deferred items:
- Hero and featured-work imagery are still placeholder-abstract, not real photography/product
  screenshots — swap in real assets whenever Rahul provides them; layout already supports it
  without restructuring (see HTML comment in `index.astro`).

Next phase:
- Phase 4 — Career page

---

## Phase 04 — Career Page

Status: complete
Branch: redesign/04-career
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- Replaced the tab-based career explorer (one role visible at a time, click to switch, JS
  show/hide script) with a stacked executive case-study list — every role fully visible on
  page load, in the same reverse-not-quite-chronological order the data already defines. This
  directly targets the plan's "do not bury core achievements behind accordions" and "key
  outcomes must be visible without requiring excessive interaction" acceptance criteria, which
  the previous tabbed UI violated (4 of 5 roles were hidden behind a click).
- Removed the `role="tablist"`/`role="tab"`/`role="tabpanel"` ARIA machinery and the
  `<script>` block entirely — no longer needed since nothing is hidden/toggled.
- Kept each role's anchor addressable at the same URL fragment (`id={role.id}` directly on the
  `<article>`, e.g. `/career#dream11`) so the homepage's existing "Read case study" links
  (added in Phase 3) still land on the right role without a page-load flash of a wrong
  tab/scroll-to-hidden-panel bug.
- Information hierarchy per role now equivalent to the plan's `COMPANY / ROLE / DATES → THE
  PROBLEM / WHAT I OWNED / WHAT WE BUILT / OUTCOME` structure without introducing new label
  text not backed by real data: period + company + title in the header, a "role-summary"
  paragraph (context + ownership, already-verified copy, unchanged), a metrics row, and the
  existing outcome bullets (each already phrased as action → result, functionally "what we
  built" + "outcome" combined). Did not fabricate a distinct "problem statement" field that
  doesn't exist in `roles.ts`.
- Employer typography given real presence: `.role-detail h2` bumped from 34px to 40px,
  uppercase, tighter tracking — reads as "DREAM11 / MEDIA.NET / SAMSUNG RESEARCH / SAMAGRA"
  per the plan's explicit example. No pastel color varies by employer (see below).
- Removed the now-fully-dead `color` field from the `Role` interface and every entry in
  `src/data/roles.ts`, plus the inline `style="--surface: ${role.color}"` attribute in the
  page template — this was flagged as dead code back in Phase 1 (metric-tile/role-number had
  already stopped reading it) and explicitly deferred to this phase for cleanup.
- Added one shared "reading frame" line above the case-study list — `Problem → System / product
  → User → Business impact` — as the plan's lightweight technical-credibility diagram. Kept it
  as a single page-level framework rather than a per-role diagram, since a per-role version
  would require inventing role-specific "problem" and "system" phrasing not present in the
  verified data; this satisfies "where useful" and "only where supported by real experience"
  without adding unverified claims.
- Updated the `PageHero` lede on `/career` to describe the new non-interactive stacked layout
  instead of the old "select a role" instruction.
- Removed the two-column `career-shell` grid (`300px 1fr` sidebar + detail) and all
  `.role-list`/`.role-tab` CSS, including their 980px/680px responsive overrides, since the
  sidebar tab list no longer exists in the markup.

Important decisions:
- Did not add per-role architecture/system diagrams — plan explicitly forbids inventing
  architecture details or confidential internals, and the existing data doesn't include that
  level of detail. The single shared reading-frame line covers the "technical credibility"
  requirement without overreaching.

Files materially changed:
- `src/pages/career/index.astro` (full rewrite: stacked list, no tabs/script, reading-frame line)
- `src/styles/tokens.css` (career-shell restacked, role-list/role-tab removed, role-detail h2 +
  role-title added, corresponding 980px/680px cleanup)
- `src/data/roles.ts` (removed dead `color` field from interface and all 5 entries)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — checked rendered `/career` HTML via curl: all 5 `id="..."` anchors present
  (dream11, medianet, medianet-sde, samagra, samsung), no `hidden` attributes left on role
  articles (only unrelated `aria-hidden` on decorative SVG icons), all 5 `.role-detail` articles
  present in one response, employer `<h2>` headings render as expected, reading-frame renders.

Known issues / deferred items:
- None carried forward from this phase.

Next phase:
- Phase 5 — About page
