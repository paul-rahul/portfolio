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
