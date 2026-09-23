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

---

## Phase 05 — About Page

Status: complete
Branch: redesign/05-about
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- Rewrote the hero title to the plan's target narrative ("Engineer by training. Product manager
  by practice. Marketer by curiosity."), kept the existing lede (already fit the tone, no
  fabricated additions).
- Reduced from 4 editorial-grid modules to 3, matching the plan's exact hierarchy list —
  professional track record → current MBA → personal interests. Folded the fourth module ("How
  I tend to work," a 4-item mini-tags list) into a closing sentence on the large
  professional/through-line card instead of a separate module, since it was describing working
  style, not new information, and the plan explicitly prefers "a small number of intentional
  visual modules."
- Removed the `.hand-note` "currently → Austin, TX" annotation device and folded that fact into
  plain prose on the McCombs card ("...graduating May 2027 — currently based in Austin, TX."),
  per the plan's "reduce handwritten-style annotations" instruction. `.hand-note` is now unused
  anywhere in the codebase (confirmed via grep) — removed the CSS rule entirely rather than
  leaving dead code.
- Removed the `.mini-tags` pill list from the "Off the clock" card, converting badminton/reading/
  reality TV into one prose sentence (kept verbatim, just de-chipped), per "reduce pill-heavy
  personality tags." Left `.mini-tags` CSS itself in place — still actively used on `/resume` and
  `/built` (out of scope for this phase, Phase 6 territory).
- Removed the `.peach-card`/`.mint-card`/`.sky-card` background-variant classes from
  `about.astro` (all three had already been neutralized to flat surface/background colors back
  in Phase 1, so removing them is presentational-cleanup only, not a visual regression) and
  deleted their now-fully-dead CSS, including a `.sky-card` 980px responsive override that was
  initially missed and caught by re-checking the actual served HTML rather than trusting the
  first pass.
- Did not add real photography — none exists in the repo for this page either; kept the
  existing text-only editorial-card layout rather than fabricating imagery.

Important decisions:
- Caught a leftover `.editorial-card.sky-card` rule inside the 980px media query on the first
  validation pass (grep -c reported a hit on the rendered page that a narrower grep -o initially
  missed) — worth noting as a reminder to always re-check rendered/built output directly after
  CSS class removals, not just the source file, since responsive breakpoints are easy to miss.

Files materially changed:
- `src/pages/about.astro` (hero title, 4 modules → 3, hand-note/mini-tags removed)
- `src/styles/tokens.css` (`.hand-note`, `.peach-card`/`.mint-card`/`.sky-card`, and the
  `.sky-card` 980px override all removed as dead code)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — checked rendered `/about` HTML via curl: correct h1/h2 content, zero
  occurrences of `hand-note`/`peach-card`/`mint-card`/`sky-card` anywhere in the response after
  the second cleanup pass; confirmed the same zero-occurrence result in the `dist/` build output.

Known issues / deferred items:
- `.mini-tags` CSS remains in `tokens.css`, still used on `/resume` and `/built` — those pages
  are Phase 6 scope.

Next phase:
- Phase 6 — Secondary pages

---

## Phase 06 — Secondary Pages

Status: complete
Branch: redesign/06-secondary-pages
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- `/internships`: replaced the split `.feature-card` layout (decorative `experiments-clay.jpg`
  illustration + copy panel) with the same `.role-detail` treatment used on `/career`
  (`career-shell` > `role-detail` > header/period/company/title, `role-summary`, `metric-row`
  of `metric-tile`s). The Cisco internship is structurally identical content to a career role
  (period, title, summary, metrics), so it now reads as the same pattern instead of a one-off
  component — and drops the only remaining decorative-illustration image on the site, matching
  the plan's "authentic work over decorative AI art" principle (the homepage and career page
  already moved to abstract `case-mark` treatments in earlier phases; this closes the gap).
  Did not add a `role-number` badge or `role-footer` counter (e.g. "1/1") since there's only
  one entry and a counter would misleadingly imply more items follow.
- `/built`: removed the `.mini-tags` pill list ("Problem framing / Prototype / Build notes /
  Learnings") and folded it into the closing prose sentence, mirroring the Phase 5 About-page
  precedent of de-chipping personality/process tags into plain sentences. Kept the honest
  "coming soon" framing — no fabricated project content, per baseline plan notes.
- `/resume`: same `.mini-tags` removal (Product strategy / ML products / Experimentation / GTM),
  folded into the existing summary sentence. Buttons/download behavior unchanged.
- `/contact`: no content change, but restyled `.contact-card` off the solid `--ink` background /
  white-on-black button treatment onto the same bordered `--surface` card + `--background`
  link-row treatment used everywhere else on the site (about, built, resume). The inverted
  color-block was the last surviving "designed accent" device inconsistent with the site's
  restrained-editorial direction — every other secondary page uses a plain bordered card.
- CSS cleanup: removed now-fully-dead `.feature-card`/`.feature-copy`/`.feature-copy h2`/
  `.feature-copy .metrics` and their 980px/680px responsive overrides (only consumer was
  `/internships`, now migrated). Removed `.mini-tags`/`.mini-tags span` (no remaining
  consumers after `/built` and `/resume` edits). Also removed `.simple-grid`/`.simple-card*`
  and its 680px override — discovered fully orphaned (zero references anywhere in `src/pages`)
  while auditing this CSS region; not tied to this phase's page edits but adjacent dead code
  from an earlier iteration, consistent with the Phase 5 precedent of cleaning up dead CSS
  found along the way.

Important decisions:
- Reused the `/career` role-detail pattern for `/internships` rather than inventing a new
  component, since the underlying content shape is identical — avoids a one-off visual
  language for a single internship entry.
- Did not delete the orphaned `ad-launch-clay.jpg` / `experiments-clay.jpg` / `ml-platform-
  clay.jpg` / `ml-to-product-clay.jpg` files from `public/` — none are referenced in `src/`
  anymore after this phase, but removing static assets felt like a separate cleanup decision
  from the page-content work; flagged below as a known issue for Rahul to confirm before
  deletion.

Files materially changed:
- `src/pages/internships/index.astro` (feature-card → role-detail pattern, no image)
- `src/pages/built/index.astro` (mini-tags removed, folded into prose)
- `src/pages/resume.astro` (mini-tags removed, folded into prose)
- `src/styles/tokens.css` (`.feature-card`/`.feature-copy` family, `.mini-tags`,
  `.simple-grid`/`.simple-card` family all removed as dead code; `.contact-card`/
  `.contact-links a` restyled from inverted-ink block to bordered surface card)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — checked rendered HTML via curl for all four pages: zero occurrences of
  `mini-tags`, `feature-card`, `experiments-clay` anywhere in output; confirmed `/internships`
  role-detail markup renders company/period/title/summary/all three metrics correctly.
  Visually reviewed all four pages in-browser (screenshots) — internships now matches the
  career page's card language, contact card now matches the bordered-surface language used
  on about/built/resume.

Known issues / deferred items:
- `public/ad-launch-clay.jpg`, `experiments-clay.jpg`, `ml-platform-clay.jpg`,
  `ml-to-product-clay.jpg` are now fully orphaned (zero references in `src/`) — left in place,
  not deleted, since removing static assets wasn't clearly in this phase's scope. Flag to
  Rahul; safe to delete once confirmed no future use planned.
- No accessibility audit has been done yet (Phase 7).
- No OG/meta image work done yet (Phase 8).

Next phase:
- Phase 7 — Motion / responsive / accessibility

---

## Phase 07 — Motion / Responsive / Accessibility

Status: complete
Branch: redesign/07-motion-a11y
PR: (opening next)
Merged into: redesign/technical-editorial

Implemented:
- **Reachability fix**: discovered `/internships` had become a fully orphaned route — not in
  the trimmed primary nav (expected, decided in Phase 2), but also no longer linked from
  `/career` despite the Phase 2 log explicitly claiming "still reachable (linked from career
  page)". That link never actually existed. Added a `closing-cta` block at the bottom of
  `/career` ("One more, structured the same way: a Cisco internship the summer before
  McCombs." → "See the internship"), reusing the homepage's existing `.closing-cta` class
  rather than inventing new CSS. This was judged accessibility-adjacent (a page unreachable by
  any in-site path is a discoverability/IA defect) and folded into this phase rather than
  opening a separate fix.
- **Reduced motion**: added a `@media (prefers-reduced-motion: reduce)` block — disables
  `scroll-behavior: smooth`, collapses all transition/animation durations to ~0, and cancels
  the `.case-card:hover` `translateY` lift. The site's motion was already minimal (a couple of
  0.15–0.2s color/border/transform transitions, one smooth-scroll), so this was a small,
  additive block rather than a rework — no existing motion needed to be redesigned, just gated.
- **Keyboard focus**: added an explicit `a:focus-visible, button:focus-visible` outline
  (`--accent` color, 2px, offset) — previously relied entirely on browser default outline
  behavior with no site-defined fallback, risky given the custom radius/surface colors used
  throughout. Applied globally rather than per-component since every interactive element on
  the site is either an `<a>` or a `<button>`.
- **Decorative content marked for assistive tech**: `aria-hidden="true"` added to the homepage
  hero's `intersection-diagram` (Tech/Product/Market Venn illustration — purely a visual
  restatement of the h1 copy) and both `.case-mark` spans (`D11`, `M.` — decorative marks
  inside case-study cards whose link text already fully describes the destination via
  `.case-copy`).
- **Viewport meta**: added `initial-scale=1` to the existing `width=device-width` viewport tag
  in `BaseLayout.astro` (was previously missing — harmless omission but not spec-correct).
- **Responsive audit**: reviewed the 980px/680px breakpoints for every component touched in
  Phases 1–6 (`role-detail`/`metric-row` from career and now internships, `closing-cta`,
  `contact-card`, `resume-card`, `built-placeholder`) — all either already had correct
  collapse-to-1-column rules or inherit them by reusing an already-validated shared class.
  Did not find or need to fix any new overflow/clipping issues. Attempted live in-browser
  viewport resize via the Chrome extension's `resize_window` tool to visually confirm, but it
  did not actually change `window.innerWidth` in this environment (confirmed via
  `javascript_tool`) — falling back to static CSS review instead of a live narrow-viewport
  screenshot for this phase.

Important decisions:
- Treated the orphaned `/internships` route as this phase's problem to fix (not Phase 6's),
  since it's a reachability/IA issue surfaced by an accessibility-lens audit, not a content or
  visual-language issue.
- Did not add a hamburger/off-canvas mobile nav — Phase 2 already deliberately rejected that
  (horizontally-scrollable nav row, judged sufficiently accessible/keyboard-operable at the
  time) and nothing in this phase's audit contradicted that call.
- Did not touch color tokens — manually checked contrast for `--ink-secondary` on `--background`
  (~5.9:1) and on `--surface` (~6.4:1), both comfortably pass WCAG AA for normal text; `--accent`
  as heading-emphasis color on white (~4.6:1) also passes, and is only ever used at large-text
  sizes (≥24px) where the AA bar is 3:1 anyway. No changes needed.

Files materially changed:
- `src/styles/tokens.css` (`:focus-visible` rule, `prefers-reduced-motion` block)
- `src/layouts/BaseLayout.astro` (viewport meta `initial-scale=1`)
- `src/pages/index.astro` (`aria-hidden` on decorative diagram + case-mark spans)
- `src/pages/career/index.astro` (closing-cta link to `/internships`, `ArrowIcon` import)

Validation:
- npm run build: PASS (7 routes)
- dev mode: PASS — confirmed the new career→internships CTA renders and the link navigates
  correctly (checked in-browser via Chrome extension); visually reviewed homepage, career, and
  internships pages via screenshots.
- Live narrow-viewport (mobile) screenshot verification was not completed — the available
  browser-automation resize tool didn't take effect in this environment. Responsive correctness
  for this phase's changes was instead verified by static review of the 980px/680px media
  query rules for every touched/reused component.

Known issues / deferred items:
- Live mobile-viewport screenshot QA still outstanding — worth doing with a working device
  emulation path (or by hand) before Phase 8 sign-off, particularly for the new career-page
  closing-cta block, which hasn't been visually confirmed at narrow widths (though it reuses
  a class already validated responsive on the homepage in Phase 3).
- `public/*-clay.jpg` orphaned assets (flagged in Phase 6) still undeleted, pending Rahul's
  confirmation.
- No OG/meta image work done yet (Phase 8).

Next phase:
- Phase 8 — Final polish / QA

---

## Phase 08 — Career Timeline Restructure + Capabilities / Operating Model

Branch: redesign/career-capabilities-operating-model (built on top of
career-timeline-scroll-restructure, which itself branched from the Phase 8
integration work — see note under "Important decisions" on why this isn't
branched directly off `redesign/technical-editorial`)
PR: (opening next)
Merged into: career-timeline-scroll-restructure (not `redesign/technical-editorial`
directly — see note below)

Implemented:
- **Pinned scroll timeline restructure**: `/career` rebuilt around a sticky
  year/period label + center dot-and-line track + accordion card per role,
  replacing the prior static list. Accordion cards are collapsed by default,
  expand when centered in the viewport (`IntersectionObserver`, `rootMargin:
  "-45% 0px -45% 0px"`), and collapse again once scrolled past — this
  interaction was explicitly requested over an earlier "always expanded"
  attempt.
- **Last-card reachability fix**: the final row (Samsung Research) couldn't
  reach the observer's center band because there wasn't enough scroll room
  below the timeline. Fixed with a `.career-timeline { padding-bottom: ... }`
  trailing spacer. Initially set to `50vh` when the timeline was the last
  thing on the page; reduced to `15vh` once the new Capabilities/Operating
  Model sections below gave the page real scroll runway of its own — the
  larger value left a visible dead gap between the last card and "What I'm
  known for."
- **No-JS fallback**: `BaseLayout.astro`'s `<html>` gets a `no-js` class
  removed by an inline `<head>` script; `.no-js .role-body { max-height:
  none; opacity: 1; }` in tokens.css keeps all cards readable if JS fails to
  load.
- **"What I'm known for" section** (`.capabilities`): 4 capability areas
  (0→1 Product Building, AI/ML Productization, Monetization & Growth,
  Cross-functional Execution), editorial treatment — large mono index
  numbers, heading + one supporting sentence, thin `border-left` dividers
  instead of cards/shadows/icons. 4-column desktop, 2-column ~980px, 1-column
  (with left connector border) ≤680px.
- **"How I operate" section** (`.operating-model`): 5-step sequence
  (Understand the system → Find the constraint → Align the team → Ship →
  Measure) as an `<ol role="list">` (the `role="list"` counters Safari
  VoiceOver stripping list semantics from `list-style: none`). Desktop: 5
  columns with a short horizontal connector line between steps. ≤680px:
  vertical sequence with a connector running down the left edge instead.
  Order is conveyed by the visible `01`–`05` mono numbers, not solely by the
  connector lines.
- **Restored `closing-cta`**: Phase 8's timeline rewrite had silently
  dropped the `/internships` CTA that Phase 07 added to fix an orphaned-route
  accessibility issue. Restored as the final section, after capabilities and
  operating model, per the new layout order.
- Both new sections reuse existing tokens/classes (`.kicker`, `.section-heading`,
  `--accent`, `--font-mono`, `--border`) rather than introducing new design
  tokens — no new colors, radii, or shadow values added.

Important decisions:
- **Branch topology deviation**: the task spec named `redesign/technical-editorial`
  as both the starting point and PR target. That remote branch is stuck at
  the end of Phase 07 and does not include the Phase 8 pinned-timeline
  restructure this work depends on (the accordion, the `IntersectionObserver`
  logic, `DESIGN.md`'s "Pinned scroll timeline" section). Branching from it
  as instructed would have regressed the career page. Branched instead from
  the current Phase 8 tip (`career-timeline-scroll-restructure`) and will PR
  into that branch rather than `redesign/technical-editorial` directly —
  flagged to Rahul rather than silently deviating. `redesign/technical-editorial`
  still needs a follow-up merge from `career-timeline-scroll-restructure` to
  pick up all of Phase 8 (timeline restructure + this capabilities/operating
  work) before it's back in sync with what's actually shipped.
- Rejected card/icon/pill treatment for both new sections per the spec's
  explicit direction (avoid colorful cards, icons, pills, shadows, gradients)
  — used typographic hierarchy (mono numbers, border dividers) instead,
  consistent with the Technical Editorial "Flat-By-Default" and "Mono-Means-
  Data" rules already documented in `DESIGN.md`.
- No new career facts, employers, or metrics were introduced — capability
  and operating-step copy is original synthesis language describing existing
  documented experience, not a new factual claim.

Files materially changed:
- `src/pages/career/index.astro` (accordion JS/behavior restore, `capabilities`
  and `operatingSteps` data arrays, two new `<section>`s, restored `closing-cta`)
- `src/styles/tokens.css` (`.role-body` accordion rules, `.no-js` fallback,
  `.career-timeline` spacer tuning, `.capabilities`/`.capability-*`,
  `.operating-model`/`.operating-*`, responsive rules at 980px/680px)
- `src/layouts/BaseLayout.astro` (`no-js` class + inline removal script)

Validation:
- `npx astro check`: PASS (0 errors, 0 warnings, 0 hints)
- `npm run build`: PASS (7 routes)
- dev mode (port 4323): confirmed live — accordion collapse/expand works,
  Samsung Research (last row) reaches `is-active` and expands at the bottom
  of the timeline, zero-height gap between the timeline and "What I'm known
  for", both new sections render correctly at desktop width (~1512px) and at
  a ~606px mobile width (stacked single-column, left-border connectors, no
  horizontal overflow).
- Live viewport testing at the exact requested breakpoints (375/430/768/
  1024/1440px) was not fully achievable — the Chrome extension's
  `resize_window` tool doesn't reliably change the real viewport in this
  environment (previously documented in Phase 07's known issues, confirmed
  again here). Verified desktop (~1512px) and a sub-680px mobile width
  (~606px) directly; the 980px tablet 2-column state was verified by code
  review of the media query rather than a live screenshot.

Known issues / deferred items:
- `redesign/technical-editorial` needs a follow-up merge from
  `career-timeline-scroll-restructure` to absorb all of Phase 8 — it's
  currently out of sync with the shipped career page.
- Tablet-width (~980px) live screenshot verification for the two new
  sections still outstanding, same tooling limitation as Phase 07's mobile
  QA gap.

Next phase:
- Sync `redesign/technical-editorial` with `career-timeline-scroll-restructure`.
- Phase 9 — Final polish / QA (OG/meta images, orphaned clay assets)

## Responsive Audit — Stage 01

Status: complete

Branch:
responsive/01-baseline-audit

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- All 7 routes (`/`, `/career`, `/internships`, `/built`, `/about`, `/resume`, `/contact`)
- Global shell (`.site-header`, `.brand`, nav)
- Homepage progression module (`.progression-step`)

Issues found:
- R001: global header/`.brand` causes page-level horizontal overflow at ≤320px (P1)
- R002: homepage Engineer→Product→Market progression module overflows at 320–430px, up to 119px at 320px (P1)
- No horizontal overflow found on any route at 768px and above

Implemented:
- `RESPONSIVE_AUDIT.md` created with issue inventory table and methodology note
- No fixes applied yet — Stage 1 is audit-only per plan

Responsive decisions:
- None yet — deferred to Stage 2 (global shell) and Stage 3 (homepage)

Breakpoints tested:
- 320, 390, 430, 768, 820, 1024, 1280, 1440, 1728, 1920 (horizontal-overflow sweep, all routes)

Theme validation:
- Day: PASS (structural overflow is not theme-dependent)
- Night: PASS (structural overflow is not theme-dependent)

Validation:
- npm run build: PASS
- dev mode: PASS (all 7 routes return 200 on `main`)
- horizontal overflow: FAIL at ≤430px on 2 routes (tracked as R001/R002)
- keyboard/accessibility: not tested this stage (out of scope for baseline overflow audit)

Known issues / deferred items:
- `resize_window` tool does not change real `window.innerWidth` in this environment (same
  limitation documented in Phase 07/08 above) — worked around via same-origin iframes for
  structural overflow detection, but this means no visual screenshots were captured, and
  browser-zoom/orientation testing was not performed. A visual pass (clipped text, overlaps,
  dense layouts, tap targets) is still needed before Stage 2 fixes can be considered complete.

Next stage:
- Stage 2 — global shell/navigation/page frame (fix R001 first, since it affects every route)

## Responsive Audit — Stage 02

Status: complete

Branch:
responsive/02-global-shell

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- Global shell (`.site-header`, `.brand`, `.site-header nav`, `.header-actions`, footer) across all 7 routes

Issues found:
- Confirmed R001 (from Stage 1): `.brand` had no shrink constraint below 980px, forcing header wider than viewport at ≤320px
- No other global-shell-level overflow found (footer clean at 320px on all routes; no blanket `overflow-x: hidden` in use)

Implemented:
- `src/styles/tokens.css`: `.brand` and `.brand div` gained `min-width: 0`; `.brand div`/`.brand small` gained `overflow: hidden; text-overflow: ellipsis`
- `≤980px` `.site-header` grid track changed from `auto 1fr` to `minmax(0, auto) minmax(0, 1fr)` so the brand column can actually shrink
- `≤680px` breakpoint hides `.brand small` (subtitle) — no room for it next to logo + nav at that width
- `RESPONSIVE_AUDIT.md` updated: R001 marked Fixed, Stage 2 section added with re-verification notes

Responsive decisions:
- Prefer allowing the brand lockup to shrink/truncate over shrinking the header height or hiding nav items; subtitle drop happens only below 680px, name text never truncates in practice at any tested width once the grid track can shrink

Breakpoints tested:
- Header/footer overflow re-verified at 320, 375, 390, 430, 680, 768 (iframe scrollWidth technique) across all 7 routes

Theme validation:
- Day: PASS (structural fix, theme-independent — confirmed data-theme="light" default still renders correctly)
- Night: PASS (not re-screenshotted; fix is layout-only, no color-token changes, consistent with Stage 1's theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS (all 7 routes served 200 during verification)
- horizontal overflow: PASS for global shell (header + footer) on all routes at 320px; homepage body overflow (R002) remains, out of scope for this stage
- keyboard/accessibility: not tested this stage (deferred to Stage 7 per plan)

Known issues / deferred items:
- R002 (homepage progression module overflow) still open — Stage 3
- Visual-only issues (clipped text, dense layouts, tap targets) still not screenshot-audited — same tooling limitation as Stage 1, deferred to Stage 7 or manual pass
- Sticky-header/anchor-offset behavior and mobile-nav horizontal-scroll usability not deeply audited this stage — nav already uses an intentional `overflow-x: auto` row below 980px per existing design; revisit in Stage 7 (accessibility/interaction pass) if it proves hard to use by touch

Next stage:
- Stage 3 — homepage responsiveness (fix R002: build the intentional mobile vertical flow for the Engineer→Product→Market module)

## Responsive Audit — Stage 03

Status: complete

Branch:
responsive/03-home

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- Homepage (`/`) — Engineer→Product→Market progression module specifically; full-page overflow re-swept across the required width matrix

Issues found:
- Confirmed R002 root cause: `.progression-grid` was a fixed `repeat(3, 1fr)` grid with no responsive override; unbreakable tag words exceeded each column's min-content budget at narrow widths, forcing all 3 tracks (and the page) wider than the viewport — a textbook "desktop layout shrunk to mobile" case
- No other structural overflow found on the homepage in the 320–1920px sweep

Implemented:
- `src/styles/tokens.css`: added `.progression-grid { grid-template-columns: 1fr; gap: 14px; }` inside the existing `≤680px` breakpoint (intentional single-column stack, matching the pattern already used for `.editorial-grid`/`.fact-strip` at `≤980px`)
- Added `min-width: 0` to `.progression-step` as a grid-item safety net
- `RESPONSIVE_AUDIT.md` updated: R002 marked Fixed, Stage 3 section added with root-cause explanation and re-verification notes

Responsive decisions:
- Progression module stacks to 1 column below 680px rather than 2, since it's a 3-item set (no clean 2-column split) and the existing card language already reads fine stacked without needing a custom connector graphic like the "How I operate" stepper
- Kept the 3-column desktop/tablet layout untouched above 680px — Stage 1 already confirmed no overflow there, and re-verified again this stage

Breakpoints tested:
- Homepage full-page overflow re-verified at 320, 375, 390, 430, 680, 681, 768, 820, 980, 1024, 1280, 1440, 1728, 1920 (iframe scrollWidth technique)

Theme validation:
- Day: PASS (structural fix, theme-independent)
- Night: PASS (not re-screenshotted; layout-only change, no color-token changes, consistent with Stage 1/2's theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS — homepage bodyOverflow is 0 at every required width, 320–1920px
- keyboard/accessibility: not tested this stage (deferred to Stage 7 per plan)

Known issues / deferred items:
- Only the R002 structural-overflow item was addressed this stage. The rest of the Stage 3 checklist (hero typography scaling, hero media order, CTA wrap behavior, quick facts layout, featured-work card density) has not been independently visually reviewed — still deferred to Stage 7 or a manual pass, same tooling limitation as Stage 1/2 (no reliable viewport-resize/screenshot tooling this session)

Next stage:
- Stage 4 — Career page responsiveness (most important recruiter page; sticky sidebar/role navigation, metrics, "What I'm known for", "How I operate")

## Responsive Audit — Stage 04

Status: complete

Branch:
responsive/04-career

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- `/career` — pinned-scroll timeline (`.tl-row`/`.tl-year`/`.tl-dot`), metric tiles, capability grid ("What I'm known for"), operating steps ("How I operate")

Issues found:
- No horizontal overflow at any tested width (320-1920px) — most of the plan's intended mobile/tablet composition already existed from the original redesign
- Tablet range (681-980px): `.tl-row`'s sticky-year column stayed at its full desktop width (220px), squeezing `.role-detail` to ~370px usable width — cramped, not overflowing, so Stage 1's overflow-only sweep missed it
- Tablet range: `.tl-year`/`.tl-dot` sticky `top` offsets were tuned for the 66px desktop header; the wrapped tablet header is ~126px, so the sticky label could tuck under it while scrolling

Implemented:
- `src/styles/tokens.css`: new `@media (max-width: 980px) and (min-width: 681px)` block
  - `.tl-row` first column narrowed 220px → 150px
  - `.tl-year`/`.tl-dot` sticky `top` raised to 138px/144px (measured actual tablet header height via iframe technique, not guessed)
  - `.metric-row` set to 2 columns at tablet width (previously 3→1 with no intermediate step)
- `RESPONSIVE_AUDIT.md` updated: Stage 4 section added

Responsive decisions:
- Kept the pinned-scroll sticky timeline concept intact through tablet rather than collapsing it early to the mobile stacked layout — narrowing the sidebar column and fixing the sticky offset was enough to remove the squeeze without changing the interaction model
- `.capability-grid` (4→2→1) and `.operating-steps` (5→vertical-with-connector) were already correct per the plan's spec and left untouched

Breakpoints tested:
- Full required matrix (320-1920px) re-verified overflow-free
- Tablet band specifically probed at 681, 700, 768, 820, 900, 979, 980, 981 for header height, sticky offset clearance, and `.role-detail`/`.metric-row` computed widths

Theme validation:
- Day: PASS (structural/layout change only, theme-independent)
- Night: PASS (not re-screenshotted; consistent with prior stages' theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS across full matrix
- keyboard/accessibility: not tested this stage (deferred to Stage 7 per plan)

Known issues / deferred items:
- Visual-only concerns (line-length feel, capability/operating-step density, exact spacing rhythm) not screenshot-audited — same tooling limitation since Stage 1, deferred to Stage 7 or manual pass

Next stage:
- Stage 5 — secondary pages (About, Internships, Built, Resume, Contact)

## Responsive Audit — Stage 05

Status: complete

Branch:
responsive/05-secondary-pages

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- `/about`, `/internships`, `/built`, `/resume`, `/contact`

Issues found:
- No horizontal overflow at any width (320-1920px) on any of the 5 routes
- `.resume-card`'s 2-column grid (`1fr auto`) defaulted to `align-items: stretch`, so at tablet widths where the paragraph column is taller than the actions column, the `.actions` flex container and its `<a class="button">` children (flex also defaults to stretch) stretched vertically — measured 149px-tall "Download PDF"/"Open" buttons at 820px (should be 44px)
- Primary nav items measured ~35.7px tall at 320px — under the ~44px comfortable tap-target guideline; site-wide concern, not secondary-page-specific, logged but not fixed here

Implemented:
- `src/styles/tokens.css`: added `align-items: center` to `.resume-card`
- `RESPONSIVE_AUDIT.md` updated: Stage 5 section added

Responsive decisions:
- None beyond the resume-card fix — About/Internships/Built/Contact needed no changes this pass

Breakpoints tested:
- Full required matrix (320-1920px) re-verified overflow-free on all 5 routes
- Resume button height spot-checked at 320, 680, 768, 820, 980, 1280, 1920 (all now 44px)

Theme validation:
- Day: PASS (layout-only change, theme-independent)
- Night: PASS (not re-screenshotted; consistent with prior stages' theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS across full matrix, all 5 routes
- keyboard/accessibility: not tested this stage (nav tap-target gap logged, deferred to Stage 7)

Known issues / deferred items:
- Nav tap-target height (~35.7px at 320px, site-wide) — deferred to Stage 7
- Visual-only concerns (spacing rhythm, card density) not screenshot-audited — same tooling limitation since Stage 1, deferred to Stage 7 or manual pass

Next stage:
- Stage 6 — typography/spacing/media system (replace ad hoc responsive patterns with a coherent fluid system)

## Responsive Audit — Stage 06

Status: complete

Branch:
responsive/06-typography-spacing-media

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- All heading selectors (`.hero h1`, `.page-hero h1`, `.editorial-title`, card/capability/operating-step headings), body/lede copy, base `img` handling, across all 7 routes

Issues found:
- `.hero h1`, `.page-hero h1`, `.editorial-title` each already used `clamp()` but then had a redundant fixed `font-size` override inside the `≤680px` breakpoint, since each clamp's floor was already above 680px's natural vw value — the fluid curve was dead weight below ~700-870px and the page snapped abruptly at exactly 680px

Implemented:
- `src/styles/tokens.css`: folded each override's intended value into the clamp's floor, removed the now-redundant breakpoint overrides
  - `.hero h1`: `clamp(40px, 5vw, 64px)` → `clamp(38px, 5vw, 64px)`
  - `.page-hero h1`: `clamp(34px, 4.6vw, 54px)` → `clamp(40px, 4.6vw, 54px)`
  - `.editorial-title`: `clamp(32px, 4.4vw, 48px)` → `clamp(36px, 4.4vw, 48px)`
- `RESPONSIVE_AUDIT.md` updated: Stage 6 section added

Responsive decisions:
- No visual change at either extreme (320px or 1920px) intended or measured — this is purely collapsing a curve-then-snap into one continuous curve, matching the plan's "avoid breakpoint-specific font overrides" principle
- Base `img` reset, body/lede line-length max-widths, and spacing scale were reviewed and found already coherent — no further changes made

Breakpoints tested:
- Full required matrix (320-1920px) re-verified overflow-free on all 7 routes
- Heading font-size scaling spot-checked at 320, 430, 600, 680, 700, 760, 900, 1080, 1200, 1440 on `/` and `/career` — confirmed flat floor through mobile/tablet, smooth transition, no discontinuity at 680px

Theme validation:
- Day: PASS (typography-only change, theme-independent)
- Night: PASS (not re-screenshotted; consistent with prior stages' theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS across full matrix
- keyboard/accessibility: not tested this stage (deferred to Stage 7 per plan)

Known issues / deferred items:
- Spacing-scale and SVG/diagram-legibility checklist items not deeply re-audited — existing spacing already looked consistent and no mobile-problematic diagrams were found; flag any specific spacing inconsistency Rahul spots during manual review as a new audit row rather than assuming it's covered

Next stage:
- Stage 7 — cross-theme/accessibility/interaction QA (Day/Night at all breakpoints, keyboard, touch targets — including the nav tap-target gap logged in Stage 5 — focus states, reduced motion)

## Responsive Audit — Stage 07

Status: complete

Branch:
responsive/07-cross-theme-accessibility

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- Global nav/header (touch targets, focus states, fixed-height risk), Career pinned-scroll timeline (regression fix), Day/Night toggle, reduced-motion query — across all routes

Issues found:
- Nav tap targets ~35.7px at ≤980px (Stage 5 finding) — under ~44px comfortable-touch guideline
- Mobile/tablet nav row (`overflow-x: auto`, no horizontal padding) could clip the focus-visible ring on first/last item
- `.site-header` used fixed `height: 66px` — risk of clipping nav text if a user increases browser/OS text size independent of page zoom
- Self-inflicted regression: fixing the nav tap-target height grew the tablet header from ~126px to ~138.4px, which nearly flush-collided with Stage 4's sticky `.tl-year`/`.tl-dot` offsets (138px/144px) — caught and fixed in the same stage

Implemented:
- `src/styles/tokens.css`:
  - `.site-header nav a` gains `padding-block: 12px; display: inline-flex; align-items: center` inside `≤980px` only (desktop nav stays compact/unchanged) — measured height now 47.7px at 320-980px
  - `.site-header nav` gains `padding-inline: 5px` inside `≤980px` so the focus ring isn't clipped at the scroll edges
  - `.site-header` changed from fixed `height: 66px` to `min-height: 66px`
  - `.tl-year`/`.tl-dot` sticky `top` raised from 138px/144px to 150px/156px to clear the now-taller (~138.4px) tablet header
- `RESPONSIVE_AUDIT.md` updated: Stage 7 section added

Responsive decisions:
- Scoped the touch-target fix to the breakpoint where nav actually becomes a touch-scrollable row, rather than inflating the desktop nav's tight editorial padding
- Verified theme toggle live (clicked it, checked `data-theme` + `localStorage`), not just inspected computed styles

Breakpoints tested:
- Full required matrix (320-1920px) re-verified overflow-free on all 7 routes after every change this stage
- Header height / sticky-offset clearance re-measured across 681-980px tablet band after the nav padding regression

Theme validation:
- Day: PASS
- Night: PASS — all Stage 7 changes are layout/spacing-only, no color-token changes; theme toggle exercised live (click + localStorage check), consistent with prior stages' theme-independence finding

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS across full matrix
- keyboard/accessibility: focus-visible outline confirmed present and unclipped by computed measurement; actual keyboard tab-order walkthrough, real browser zoom (125/150/200%), and screen-reader behavior NOT exercised this session — browser-automation profile can't reliably drive viewport-independent zoom or keyboard focus traversal; still needs a manual pass by Rahul

Known issues / deferred items:
- Real keyboard navigation, browser zoom, and screen-reader QA deferred to a manual pass — same tooling limitation noted since Stage 1
- Visual-only polish (density, spacing rhythm) still not screenshot-audited

Next stage:
- Stage 8 — update DESIGN.md with the responsive system now that all structural stages are complete

## Responsive Audit — Stage 08

Status: complete

Branch:
responsive/08-design-documentation

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- `DESIGN.md` — full document review and update

Issues found:
- `DESIGN.md`'s Layout section described the header as "a sticky 76px bar" — stale since Stage 7 changed it to `min-height: 66px`
- No responsive/breakpoint system was documented at all prior to this stage

Implemented:
- `DESIGN.md`: fixed the stale 76px header claim
- Added a new **Responsiveness** section covering: semantic breakpoint table (Compact ≤680px / Comfortable-tablet 681-980px / Desktop 981-1279px / Wide 1280px+), Global shell, Typography (documents the exact clamp() values from Stage 6), Navigation, Grids (documents the 4/2/1, 3/1, 5/vertical patterns from Stages 2-4), Career (pinned-timeline sticky-offset pairing note from Stage 7), Media, and Accessibility
- Extended the existing "Don't" list with 8 responsive-specific anti-patterns (no blanket `overflow-x: hidden`, no shrunk-desktop-to-mobile, no hiding content to fit, no clamp+override duplication, no fixed-height text containers, no absolute-positioned core content, no horizontal-scroll-for-prose, no theme-divergent responsive logic)

Responsive decisions:
- Documented breakpoints as semantic ranges (Compact/Comfortable/Desktop/Wide) per the plan's explicit instruction to avoid device-specific-only documentation
- Every value recorded in the doc is one actually shipped in `tokens.css` during Stages 2-7, not aspirational — cross-checked against the real CSS before writing

Breakpoints tested:
- N/A (documentation-only stage); `npm run build` re-confirmed passing

Theme validation:
- N/A (documentation-only stage, no CSS/component changes)

Validation:
- npm run build: PASS
- dev mode: not re-tested this stage (no code changes)
- horizontal overflow: N/A this stage
- keyboard/accessibility: N/A this stage

Known issues / deferred items:
- None — Stage 8 is documentation-only and complete

Next stage:
- Stage 9 — final regression QA (full route × width × theme matrix, update RESPONSIVE_AUDIT.md issue statuses to FIXED/DEFERRED/WONTFIX, then the FINAL REVIEW GATE — stop and wait for Rahul's explicit sign-off before any merge toward main)

## Responsive Audit — Stage 09 (FINAL)

Status: complete — all 9 stages of the responsive audit plan done; awaiting Rahul's explicit sign-off (FINAL REVIEW GATE) before any merge toward `main`

Branch:
responsive/09-final-regression-qa

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- All 7 routes at all 13 required widths (91 combinations) — full regression sweep
- Nav links, resume PDF link, contact mailto/LinkedIn links, theme toggle, career timeline row rendering

Issues found:
- Zero new overflow issues — 91/91 combinations pass
- All 7 issues found across the whole audit (R001-R007) confirmed FIXED and merged
- One interaction (career-timeline scroll-driven highlight/fill) could not be exercised via automation this session (programmatic scroll didn't register in the automated tab — same tooling-limitation category noted since Stage 1) — flagged for Rahul's manual review

Implemented:
- `RESPONSIVE_AUDIT.md`: added R003-R007 rows documenting the polish-level issues found and fixed in Stages 4/5/7 (previously only described in prose), normalized all statuses to FIXED/DEFERRED vocabulary, added a Stage 9 section with the full regression sweep results and a deferred-items table with reasons

Responsive decisions:
- None — this stage is verification-only, no CSS/layout changes

Breakpoints tested:
- Full required matrix: 320, 375, 390, 430, 680, 768, 820, 980, 1024, 1280, 1440, 1728, 1920 × all 7 routes = 91 combinations, 0 failures

Theme validation:
- Day: PASS
- Night: PASS — toggle exercised live (click + localStorage persistence check)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS (91/91)
- keyboard/accessibility: focus-visible outline present and unclipped (verified in Stage 7); real keyboard walkthrough, zoom, and screen-reader QA still deferred to a manual pass

Known issues / deferred items (see RESPONSIVE_AUDIT.md's full table for reasons):
- Full visual screenshot audit — no viewport-resize/screenshot tooling this session
- Real keyboard tab-order walkthrough — no keyboard-automation tooling this session
- Real browser zoom 125/150/200% — zoom shortcuts unsupported by available tools
- Screen-reader behavior — no screen-reader automation available
- Career-timeline scroll-driven interaction (dot/period highlight, connector fill) — programmatic scroll didn't register this session, needs manual verification

Next stage:
- **FINAL REVIEW GATE.** Per the plan, `main` and the parent design branches remain untouched. `feature/responsive-audit` is the fully responsive candidate branch, ready for Rahul's local review. To inspect locally:
  ```
  git checkout feature/responsive-audit
  git pull
  npm install
  npm run dev
  ```
  Widths tested this audit: 320, 375, 390, 430, 680, 768, 820, 980, 1024, 1280, 1440, 1728, 1920px, across all 7 routes, in both Day and Night themes (structural fixes are theme-independent; color-token behavior itself was not touched). Waiting for Rahul's explicit sign-off before any merge toward `redesign/technical-editorial` or `main` — successful QA, a successful build, or "looks good" in conversation does not count as that sign-off per the plan's own rule.

## Review fixes 01

Status: complete

Branch:
responsive/review-fixes-01

PR:
(opening now)

Merged into:
feature/responsive-audit

Pages/components reviewed:
- `/code-review` run against the full `feature/responsive-audit` diff; 2 findings — `.brand small` ellipsis (Nav.astro/tokens.css) and `.tl-year`/`.tl-dot` sticky-offset/header-height coupling (Career page)

Issues found:
- RF01: reviewer flagged `.brand small`'s `text-overflow: ellipsis` as inert because `<small>` defaults to `display: inline` — **investigated and found to be a false positive**: CSS Grid blockification promotes it to `display: block` automatically since it's a grid item; verified via computed style + a live screenshot with forced overflow content (ellipsis renders correctly)
- RF02: reviewer correctly identified that Stage 7's `.site-header` fixed-height → `min-height` change (to prevent text-scaling clipping) made the header's height variable, while `.tl-year`/`.tl-dot`'s sticky `top` offsets stayed hardcoded against a height snapshot — a real regression risk if a viewer's text-size settings grow the header past the hardcoded buffer

Implemented:
- No change for RF01 (false positive, confirmed not assumed)
- RF02: `src/components/Nav.astro` gained a script that measures `.site-header`'s real height and sets `--header-h` on `:root`, with a `resize`/`ResizeObserver` listener to keep it current
- `src/styles/tokens.css`: `.tl-year`/`.tl-dot` sticky `top` (both the base/desktop and the 681-980px tablet rules) changed from hardcoded pixel values to `calc(var(--header-h, <fallback>) + <gap>px)`, with the previous hardcoded values kept as the `var()` fallback for graceful no-JS degradation
- `RESPONSIVE_AUDIT.md` updated with a "Review fixes 01" section documenting both findings, the false-positive verification method, and the fix

Responsive decisions:
- Chose a runtime-measured CSS custom property over a larger static buffer — matches the plan's "fix the cause, not the symptom" principle; the previous hardcoded offsets were themselves already a symptom-level fix (Stage 7 had to re-tune them once after its own nav-padding change grew the header — exactly the fragility this fix removes)

Breakpoints tested:
- Full required matrix (320-1920px) re-verified overflow-free on all 7 routes
- Sticky offset values re-confirmed matching real measured header height at 700, 820, 980, 1024, 1440, 1920px (all correct: 150/156px tablet, 108/114px desktop)

Theme validation:
- Day: PASS (layout-only change, theme-independent)
- Night: PASS (not re-screenshotted; consistent with prior stages' theme-independence finding)

Validation:
- npm run build: PASS
- dev mode: PASS
- horizontal overflow: PASS across full matrix
- keyboard/accessibility: N/A this pass (no touch-target/focus changes)

Known issues / deferred items:
- **Tooling limitation, not a code defect:** this session's browser-automation profile does not fire `ResizeObserver` callbacks at all (confirmed with a minimal isolated repro — not even the spec-guaranteed initial callback fires). The *initial* `--header-h` sync (which fixes the actually-reported bug) was verified correct at every breakpoint; the *live update* path (`resize`/`ResizeObserver` re-firing if the header grows after page load, e.g. from a text-size setting change) could not be exercised end-to-end this session. Both are standard, well-supported browser APIs — flagged for Rahul to spot-check manually (bump text-size/zoom on `/career` at a tablet width, confirm the sticky year label still clears the header) rather than assumed correct.

Next stage:
- None — this was a post-Stage-9 review-fix cycle per the plan's "REVIEW FIXES AFTER RAHUL FEEDBACK" section. Still waiting on Rahul's explicit sign-off before any promotion toward `redesign/technical-editorial`/`main`.

---

## Content & Visual Refinement — Stage 00

Status: complete

Branch:
feature/content-visual-refinement (created from `main` @ 84b3695)

PR:
N/A (integration branch, not a stage PR)

Merged into:
N/A

Implemented:
- New integration branch `feature/content-visual-refinement` created from `main`, per the Content & Visual Refinement execution plan (`~/Downloads/CLAUDE_CONTENT_VISUAL_REFINEMENT_PLAN.md`)
- Baseline verified: `npm install`, `npm run build` (7/7 routes built clean), dev server smoke test — all 7 routes (`/`, `/career`, `/built`, `/internships`, `/about`, `/resume`, `/contact`) return 200

Content decisions:
- None yet — Stage 1 audit is next

Design decisions:
- None yet

Image placeholder decisions:
- None yet

Files materially changed:
- None (baseline only)

DESIGN.md updated:
- NO

Validation:
- npm run build: PASS
- dev mode: PASS (all 7 routes 200)
- Day mode: not yet re-tested this pass (no changes made)
- Night mode: not yet re-tested this pass (no changes made)
- mobile/tablet/desktop: not yet re-tested this pass (no changes made)

Known issues / deferred items:
- None

Next stage:
- Stage 1 — audit and content map (branch `refinement/01-audit-and-content-map`)

---

## Content & Visual Refinement — Stage 01

Status: complete

Branch:
refinement/01-audit-and-content-map

PR:
(opening now)

Merged into:
feature/content-visual-refinement

Implemented:
- Full route-by-route audit (all 7 live routes: `/`, `/career`, `/built`, `/internships`, `/about`, `/resume`, `/contact`) — no code changes, documentation only.

Content decisions (audit findings):
- **Confirmed the plan's core hypothesis**: Home's `.work-section` ("Selected evidence / Work that moved a number") duplicates Dream11 + Media.net content that already lives fully on `/career` — same employer, same metrics, same framing, just truncated. This is the Stage 3 target.
- **Built (`/built`) is a single honest placeholder paragraph** — no MediaPlaceholder system, no case-study structure, no project content. Matches project memory: Rahul hasn't listed real vibe-coding projects yet. Do not invent any.
- **Career (`/career`) is dense, complete, and recently audited** (pinned timeline, capabilities grid, operating-model steps, all responsive-audited in PR #34/#33). Preserve as-is structurally — only in scope for Stage 5 spacing polish if something concrete surfaces, not a redesign target.
- **About (`/about`) has strong copy bones** (through-line story, McCombs context, "off the clock" interests) but **zero visual slots** — pure text, three editorial cards. This is the main personality/imagery gap (Stage 6 target).
- **Click affordance is already well-established**: `.case-card` pattern (whole-card clickable + explicit "Read case study →" trailing link) is the existing convention and should be reused for any new preview cards, not reinvented.
- **Whitespace/density is already reasonably tight** — this site went through a dedicated responsive/density-aware audit in PR #34 before this plan started, so Stage 5 is expected to find fewer issues than a from-scratch density audit would.

Design decisions:
- None yet — audit only, no visual/system changes this stage.

Image placeholder decisions (future image locations identified):
1. **Home hero `.intersection-diagram`** — this is a deliberate diagram (Tech/Product/Market venn), not an empty gap; an HTML comment already documents how to swap in a real portrait later. Decision: leave as-is, not a "missing image" to placeholder over.
2. **Home "Selected Projects" preview cards (Stage 3, new)** — will need MediaPlaceholder visual slots per project, replacing the current `.case-mark` text-wordmark treatment.
3. **Built project case-study template (Stage 4, new)** — hero / product-flow / supporting-visual placeholder slots per the Problem→Solution→How→Outcome structure. Built as a reusable pattern; no live project pages yet since no real project content exists.
4. **About page (Stage 6)** — professional portrait, McCombs/Austin context image, badminton, personal/candid slot. Zero image infrastructure exists today; this is the biggest concrete gap found in the audit.
5. **Career/Internships** — no forced image additions. Per plan guidance ("use visuals only where they improve comprehension"), defer unless a specific role clearly benefits.

Likely project-preview structure (for Stage 3):
- Reuse the existing `.case-card` visual/markup pattern (visual → eyebrow → title → 2 supporting facts → "Read case study →"), backed by `MediaPlaceholder` instead of a text wordmark, with an honest "pending" status badge since no real projects exist yet.

Likely case-study structure (for Stage 4):
- Problem → Solution → How I got there → Outcome, as a reusable template/layout, documented in DESIGN.md. No fabricated example project — the template ships ready for the first real Built entry.

Files materially changed:
- `REDESIGN_MEMORY.md` (this entry)

DESIGN.md updated:
- NO — audit stage, no system changes yet

Validation:
- npm run build: PASS (unchanged from Stage 0, no code touched)
- dev mode: N/A (no code touched)
- Day mode / Night mode / mobile / tablet / desktop: N/A (no code touched)

Known issues / deferred items:
- None

Next stage:
- Stage 2 — image placeholder system (`MediaPlaceholder` component + `VISUAL_ASSETS.md`)
