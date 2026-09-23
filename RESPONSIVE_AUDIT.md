# Responsive Audit

Historical QA record for the responsive audit/remediation project (see
`~/Downloads/CLAUDE_RESPONSIVE_AUDIT_PLAN.md`). Do not delete after project completion.

## Methodology note — Stage 1

This browser automation profile's `resize_window` tool does not actually change
`window.innerWidth` (verified: after resizing to 375×667, `window.innerWidth` still read the
real screen width, ~1470px). That makes direct viewport-resize + screenshot testing
unreliable for this audit.

Instead, Stage 1 used same-origin `<iframe>` elements sized to each target width — iframes get
their own real layout viewport, so CSS media queries and `scrollWidth` measurements inside them
are accurate. This reliably catches **horizontal overflow** (the most common structural
responsive failure) across the full width matrix, but does not produce visual screenshots.
Visual-only issues (clipped text, awkward stacking, dense typography, tap-target size) were not
exhaustively screenshot-audited this pass and should get a visual pass once real window-resize
or device emulation tooling is available, or manually by Rahul.

Browser zoom (100–200%) and orientation testing were **not performed** this stage for the same
tooling-limitation reason — page-zoom keyboard shortcuts are explicitly unsupported by the
available browser-automation tools. Deferred to Stage 7 or a manual pass.

## Widths tested (horizontal-overflow sweep)

320, 390, 430, 768, 820, 1024, 1280, 1440, 1728, 1920 — all 7 routes (`/`, `/career`,
`/internships`, `/built`, `/about`, `/resume`, `/contact`) at each width, on `main`
(commit `4a9b7e3`, post day/night-theme merge).

Result: **no horizontal overflow at 768px and above, on any route.** Two overflow issues found
below 768px, detailed below. Structural overflow does not depend on Day/Night theme (theme only
changes color tokens, not layout), so these are not theme-specific.

## Issues

| ID | Route | Width | Severity | Issue | Likely Cause | Proposed Fix | Status |
|----|-------|-------|----------|-------|--------------|--------------|--------|
| R001 | global (all routes) | ≤320px | P1 | Page-level horizontal overflow (~21px at 320px); `.site-header` `scrollWidth` (341px) exceeds viewport (320px) | `.site-header` grid is `grid-template-columns: auto 1fr` below 980px; `.brand` (logo + "AI · Product · GTM" subtitle) has no shrink constraint, so its column claims its full natural content width (~181px at 320px), leaving too little room for `nav` and forcing overall header wider than the viewport | Give `.brand` column a `minmax(0, auto)` (or similar) track / `min-width: 0` on the brand so it can shrink below content width; consider hiding or truncating the subtitle below ~360px | FIXED (Stage 2) |
| R002 | `/` (homepage) | 320–430px | P1 | Homepage overflows horizontally — 119px at 320px, 49px at 390px, 9px at 430px | The Engineer → Product → Market progression module (`.progression-step`) does not have an intentional narrow-mobile layout; content forces width beyond viewport | Build the explicit mobile vertical flow described in the plan's Stage 3 (stacked steps with connector, no forced horizontal min-width) rather than shrinking the desktop layout | FIXED (Stage 3) |
| R003 | `/career` | 681–980px | P2 | `.role-detail` squeezed to ~370px usable width; `.tl-year`/`.tl-dot` sticky offsets risked tucking under the taller wrapped tablet header | `.tl-row`'s sticky-year column kept its full 220px desktop width through tablet; sticky `top` offsets were tuned for the 66px desktop header, not the ~126-138px wrapped tablet header | Narrow the sidebar column, raise sticky offsets to clear the actual measured tablet header height, add an intermediate `.metric-row` 2-column step | FIXED (Stage 4, offsets re-tuned again in Stage 7) |
| R004 | `/resume` | 681–980px | P2 | "Download PDF"/"Open" buttons stretched to ~149px tall (should be 44px) | `.resume-card`'s 2-column grid defaulted to `align-items: stretch`; the flex `.actions` container and its button children (also default-stretch) matched the taller paragraph column's height | Add `align-items: center` to `.resume-card` | FIXED (Stage 5) |
| R005 | global (mobile/tablet nav) | ≤980px | P2 | Primary nav tap targets ~35.7px tall, under the ~44px comfortable-touch guideline | `.site-header nav a` used a tight 6px vertical padding tuned for desktop mouse use, unchanged at the breakpoint where nav becomes a touch-scrollable row | Add `padding-block: 12px` + flex centering inside `≤980px` only (desktop nav stays compact) | FIXED (Stage 7) |
| R006 | global (mobile/tablet nav) | ≤980px | P3 | Focus-visible ring could clip against the nav row's scroll-container edge on the first/last item | `.site-header nav`'s `overflow-x: auto` row had no horizontal padding to accommodate the outline + offset | Add `padding-inline: 5px` (matches 2px outline + 3px offset) | FIXED (Stage 7) |
| R007 | global (header, all widths) | all | P3 | `.site-header` used a fixed `height: 66px`; couldn't grow if a user's browser/OS text-size settings increased independent of page zoom | Fixed `height` instead of `min-height` on a text-holding container | Change to `min-height: 66px` | FIXED (Stage 7) |

No other structural overflow found in the 320–1920px sweep. This is a partial inventory (overflow-focused, per the methodology note above) — Stage 1 should be revisited with a visual pass (clipped text, overlaps, dense layouts, tap targets, CTA misalignment) before Stage 2 fixes are considered complete for sign-off.

## Screenshots

None captured this stage — see methodology note.

## Stage 2 — Global shell / navigation / page frame

Fixed R001. In `src/styles/tokens.css`:

- `.brand` gained `min-width: 0` so the flex item can shrink below its content's natural
  width instead of forcing the grid column wider than the viewport.
- `.brand div` and `.brand small` gained `min-width: 0` / `overflow: hidden; text-overflow:
  ellipsis;` so the name/subtitle truncate gracefully instead of blowing out their container.
- The `≤980px` `.site-header` grid track changed from `auto 1fr` to `minmax(0, auto)
  minmax(0, 1fr)` so the brand column is actually allowed to shrink below min-content width.
- The `≤680px` breakpoint now hides `.brand small` (the "AI · Product · GTM" subtitle)
  entirely — at that width there isn't room for it next to the logo lockup and nav without
  either truncating the name itself or overflowing.

Re-verified via same-origin iframe technique (per Stage 1 methodology) across all 7 routes at
320px: `.site-header` `scrollWidth` now equals viewport width on every route (0px overflow).
Footer checked at 320px on all routes: no overflow. No blanket `overflow-x: hidden` used
anywhere in `tokens.css`.

Remaining overflow at 320–430px is homepage-body-specific (R002, the Engineer→Product→Market
module) — out of scope for global shell, deferred to Stage 3 as planned.

## Stage 3 — Homepage responsiveness

Fixed R002. Root cause (confirmed via re-inspection): `.progression-grid` (`tokens.css`) was a
fixed `repeat(3, 1fr)` grid with no responsive override anywhere in the stylesheet. Grid's
default `auto` min-sizing function keeps a track at least as wide as its content's min-content
size — and at narrow widths, unbreakable words in the tag line ("infrastructure", "economics")
exceeded each column's available share, forcing all three tracks wider than the viewport. This
is exactly the "desktop layout shrunk to mobile" anti-pattern the plan calls out.

Fix, in `src/styles/tokens.css`:

- Added `.progression-grid { grid-template-columns: 1fr; gap: 14px; }` inside the existing
  `≤680px` breakpoint — an intentional single-column mobile stack (matches the pattern already
  used for `.editorial-grid`/`.fact-strip` at `≤980px`), not a shrunk 3-column layout.
- Added `min-width: 0` to `.progression-step` as a general grid-item safety net.
- Left the 3-column layout untouched from 681px up — Stage 1's audit already confirmed no
  overflow at 768px+, and this was verified again below.

This stage only addressed the one structural overflow item (R002) inherited from Stage 1. The
rest of the Stage 3 checklist (hero typography scaling, hero media order, CTA wrap behavior,
quick facts layout, featured-work card density) has not been independently reviewed — Stage 1's
overflow-only sweep found no additional structural overflow on the homepage, but that is not the
same as a visual pass. A visual pass (clipped text, awkward stacking, dense typography, one-word
heading wraps) is still deferred to Stage 7 or a manual pass by Rahul, per the Stage 1
methodology note (no reliable viewport-resize/screenshot tooling available this session; the
iframe scrollWidth technique used instead catches overflow but not visual polish issues).

Re-verified via same-origin iframe technique: homepage `bodyOverflow` (document.scrollWidth −
viewport width) is 0 at every width in the full required matrix — 320, 390, 430, 768, 820,
1024, 1280, 1440, 1728, 1920.

## Stage 4 — Career page responsiveness

`/career` had **no horizontal overflow at any width** in the full required matrix (320–1920px)
going into this stage — much of the plan's intended composition already existed from the
original redesign: `.tl-row` (pinned-scroll timeline) restructures to a stacked layout below
680px, `.metric-row` collapses 3→1 column below 680px, `.capability-grid` ("What I'm known
for") already goes 4→2→1 at 980px/680px, and `.operating-steps` ("How I operate") already
collapses from 5 columns to an intentional vertical flow with a left-border connector below
680px (no horizontal scroll, no broken connectors).

The one real gap found: **the tablet range (681–980px) squeezed the sticky pinned-scroll
timeline.** `.tl-row`'s first column (`.tl-year`, the sticky year/company label) stayed at its
desktop width (220px) all the way down to 680px, leaving `.role-detail` as little as ~370px of
usable width once padding is subtracted — cramped but not overflowing, which is why Stage 1's
overflow-only sweep didn't catch it. Additionally, `.tl-year`/`.tl-dot`'s sticky `top` offsets
(108px/114px) were tuned for the 66px desktop header; at ≤980px the header wraps to a taller
~126px (measured), which would let the sticky label tuck partially under the header — the exact
"sticky headers must not obscure anchored content" anti-pattern the plan calls out.

Fix, in `src/styles/tokens.css` — new `@media (max-width: 980px) and (min-width: 681px)` block:

- `.tl-row` first column narrowed from `220px` to `150px` (frees ~70px for `.role-detail`)
- `.tl-year`/`.tl-dot` sticky `top` raised to `138px`/`144px` — measured the actual tablet
  header height (126px) via the iframe technique rather than guessing, so the sticky label now
  reliably clears the wrapped header
- `.metric-row` set to 2 columns at tablet width (previously jumped straight from 3→1 only at
  680px, with no intermediate step)

Verified `.role-detail` usable width across the new tablet band: 446px (700px viewport) → 726px
(980px viewport) — no longer squeezed, and `bodyOverflow` remains 0 at every width tested (681,
700, 768, 820, 900, 979, 980, 981, plus the full required matrix).

Visual-only concerns (line-length feel, capability/operating-step density, exact spacing
rhythm) were not screenshot-audited this stage — same tooling limitation noted since Stage 1,
deferred to Stage 7 or a manual pass.

## Stage 5 — Secondary page responsiveness

Reviewed `/about`, `/internships`, `/built`, `/resume`, `/contact`. No horizontal overflow at
any width in the full required matrix (320-1920px) on any of the 5 routes. Fluid typography via
`clamp()` was already in place on `.contact-card h2` and `.built-placeholder h2` — no
oversized-text issue on small phones for either.

One real issue found via computed-style inspection (not overflow-visible, so missed by the
sweep): `.resume-card` used a 2-column CSS Grid (`1fr auto`) with the default
`align-items: stretch`. At tablet widths where the paragraph column is taller than the actions
column's natural content, the `.actions` flex container — and the `<a class="button">` elements
inside it, since flex also defaults to `align-items: stretch` — stretched to match, producing
149px-tall "Download PDF"/"Open" buttons at 820px width (should be 44px). Visible tap targets
technically still worked but looked broken.

Fix, in `src/styles/tokens.css`: added `align-items: center` to `.resume-card`. Re-verified
button height is a consistent 44px at every tested width (320, 680, 768, 820, 980, 1280, 1920)
with 0 overflow at each.

Spot-checked tap target sizes at 320px via computed `getBoundingClientRect()`: resume actions
44px tall, contact-card links 58.8px tall — both comfortable. Primary nav items measured ~35.7px
tall at 320px, which is under the ~44px comfortable-touch-target guideline — this is a
site-wide nav concern (not secondary-page-specific), so it's logged here but deferred to Stage 7
(cross-theme/accessibility/interaction QA) rather than fixed in this stage.

No other structural or visual issues found on About, Internships, Built, or Contact this pass —
these were reviewed via the same overflow-sweep + spot computed-style technique, not a full
screenshot visual audit (same tooling limitation as prior stages).

## Stage 6 — Typography / spacing / media system

Audited every major heading selector (`.hero h1`, `.page-hero h1`, `.section-heading h2`,
`.editorial-title`, `.editorial-card h2`, `.capability-item h3`, `.operating-step h3`, body/lede
text, nav text, labels/captions) for fluid vs. fixed sizing, and checked media/image handling.

Found the exact anti-pattern the plan calls out ("avoid dozens of breakpoint-specific font
overrides"): three headings — `.hero h1`, `.page-hero h1`, `.editorial-title` — already used
`clamp()` for fluid sizing, but then had a **second, redundant fixed `font-size` override**
inside the `≤680px` breakpoint. Since each clamp's own minimum already floors the size well
above 680px's natural `vw` value, the override was the only thing actually setting the mobile
size — meaning the fluid clamp was dead weight below ~700-870px, and the page snapped abruptly
from the clamp curve to the fixed value exactly at 680px.

Fix, in `src/styles/tokens.css`: folded each override's intended value into the clamp's own
floor, then deleted the now-redundant breakpoint override:

- `.hero h1`: `clamp(40px, 5vw, 64px)` → `clamp(38px, 5vw, 64px)` (was overridden to 38px at
  ≤680px)
- `.page-hero h1`: `clamp(34px, 4.6vw, 54px)` → `clamp(40px, 4.6vw, 54px)` (was overridden to
  40px at ≤680px)
- `.editorial-title`: `clamp(32px, 4.4vw, 48px)` → `clamp(36px, 4.4vw, 48px)` (was overridden to
  36px at ≤680px)

No visual change at either extreme (320px or 1920px) — same floor/ceiling values as before, just
expressed as one continuous curve instead of a curve-then-snap. Verified via computed
`getBoundingClientRect`/`getComputedStyle` on live iframes that each heading now holds its floor
value flat through the low end and transitions smoothly with no discontinuity at 680px (e.g.
homepage h1: 38px flat 320-760px, 45px at 900px, 54px at 1080px, 64px at 1440px+).

Other findings:
- Base `img { width: 100%; height: 100%; object-fit: cover }` already bounds all images to their
  container — no image-overflow risk found.
- Body/lede copy max-widths (640-760px) were already well within a comfortable reading measure
  at every checked selector — no line-length fix needed.
- `.brand div`/`.brand small` (Stage 2) and other text-overflow guards were left as-is; no
  further typography-scale rework needed beyond the three clamp consolidations above.

Re-verified full required matrix (320-1920px) overflow-free on all 7 routes after these changes.

Spacing-scale and SVG/diagram-legibility items on the plan's Stage 6 checklist were not deeply
re-audited this pass (existing spacing already uses a consistent set of values across the
stylesheet, and no diagram-heavy components were found needing mobile-specific treatment) — if
Rahul spots a specific spacing inconsistency during manual review, it should be logged as a new
row in this table rather than assumed fixed by this stage.

## Stage 7 — Cross-theme / accessibility / interaction QA

**Touch targets.** Fixed the primary-nav tap-target gap logged in Stage 5 (~35.7px measured at
320px, under the ~44px comfortable-touch guideline). Scoped the fix to the `≤980px` breakpoint
only, where nav becomes a horizontally-scrollable touch row — desktop nav stays visually
unchanged (compact editorial style, mouse target). `.site-header nav a` gained
`padding-block: 12px` + `display: inline-flex; align-items: center` inside that breakpoint;
measured height is now 47.7px at 320-980px, unchanged 35.7px at 1024px+.

**Focus states.** A global `a:focus-visible, button:focus-visible { outline: 2px solid
var(--accent); outline-offset: 3px }` already existed and uses the same accent token in both
themes (so it's high-contrast in both). Found one clipping risk: the mobile/tablet nav row
(`overflow-x: auto`, no horizontal padding) could clip the focus ring on the first/last nav item
against the scroll container edge. Fixed by adding `padding-inline: 5px` to `.site-header nav`
in the `≤980px` breakpoint (matches the 2px outline + 3px offset).

**Fixed-height text container.** `.site-header` used a fixed `height: 66px` on desktop. If a
user increases browser/OS text size (not page zoom — independent text scaling), the header
can't grow to fit larger nav text, risking clipping — the exact anti-pattern the plan names
("do not use fixed heights that clip text when font size increases"). Changed to `min-height:
66px` — no visual change at default sizes, but the header can now grow if needed.

**Regression from the nav padding change.** Increasing nav-link height also grew the tablet
header from ~126px to ~138.4px (measured). This meant Stage 4's `.tl-year`/`.tl-dot` sticky
offsets (138px/144px, tuned for the pre-Stage-7 header height) were now nearly flush with the
new header edge. Caught via the same iframe-measurement technique and fixed by raising the
offsets to 150px/156px, re-verified against the actual 138.4px header height across the full
681-980px tablet band.

**Day/Night.** Toggled the theme live (not just inspected computed styles) and confirmed
`data-theme` flips light↔dark and persists to `localStorage`. All fixes this stage are
layout/spacing-only (no color-token changes), consistent with every prior stage's
theme-independence finding.

**Reduced motion.** An existing `@media (prefers-reduced-motion: reduce)` block already zeroes
`animation-duration`/`transition-duration` globally and sets `scroll-behavior: auto` — confirmed
still present and untouched. The pinned-timeline scroll-fill (`.tl-track::after`) is
scroll-position-driven via a CSS custom property, not an autoplaying animation, so it isn't a
reduced-motion concern.

**Not verified this stage** (tooling limitation, consistent with every prior stage): actual
keyboard tab-order walkthrough, real browser zoom at 125/150/200%, and screen-reader behavior
were not exercised — the session's browser-automation profile can't reliably drive
viewport-independent zoom or keyboard focus traversal. Re-verified the full required matrix
(320-1920px) overflow-free on all 7 routes after all Stage 7 changes.

## Stage 9 — Final regression QA

Full required-matrix sweep after all Stages 2-8 landed: **91/91 route × width combinations**
(7 routes × 13 widths: 320, 375, 390, 430, 680, 768, 820, 980, 1024, 1280, 1440, 1728, 1920) —
**zero overflow found anywhere.** `npm run build` and dev mode both pass.

Interaction spot-checks (top-level page, not iframes):
- Nav links (`/career`, `/built`, `/about`, `/resume`) resolve correctly
- Resume PDF link (`/Rahul_Paul_Resume.pdf`) returns HTTP 200
- Contact page `mailto:` and LinkedIn links have correct hrefs
- Theme toggle clicked live twice across this audit (Stage 7 and again this stage): `data-theme`
  flips and persists to `localStorage` reliably both directions
- Career page: all 5 `.tl-row`/`.tl-dot` timeline rows render

**Known tooling limitation, not a site defect:** programmatic `window.scrollTo`/`scrollTop`
assignment did not move the automated tab's scroll position in this session (`scrollY` stayed 0
despite a 2459px-tall document) — likely no user-activation on the extension-driven tab. This is
the same category of limitation already documented since Stage 1 (`resize_window` not changing
real `innerWidth`, no keyboard/zoom automation available). It means the pinned-timeline's
scroll-driven `IntersectionObserver`/`--fill` JS (documented in `DESIGN.md`'s "Pinned scroll
timeline" section) was not exercised via a real scroll gesture this session — it was previously
verified by code review only (see Stage 07/08 `REDESIGN_MEMORY.md` entries predating this audit).
**Recommend Rahul manually verify scroll-driven career-timeline behavior** (dot/period color
change, connector fill) during the local review — this is the one interactive behavior this
audit could not exercise end-to-end.

## Audit status summary

All 7 structural/polish issues found during this audit (R001-R007) are FIXED and merged into
`feature/responsive-audit`. No P0/P1 issue remains open. Deferred items, with reasons, are:

| Item | Reason deferred |
|---|---|
| Full visual screenshot audit (clipped text, dense layouts, exact spacing rhythm) | No reliable viewport-resize/screenshot tooling available in this session's browser-automation profile (documented since Stage 1) |
| Real keyboard tab-order walkthrough | Same tooling limitation — no keyboard-focus-traversal automation available |
| Real browser zoom at 125/150/200% | Page-zoom keyboard shortcuts explicitly unsupported by available browser-automation tools |
| Screen-reader behavior | No screen-reader automation available in this session |
| Scroll-driven career-timeline interaction (dot/period highlight, connector fill) | Programmatic scroll did not register in the automated tab this session (see above) — needs a manual check |

None of these are P0/P1 — every P0/P1 structural issue found (R001, R002) is fixed and
re-verified. The deferred items are all either visual-polish or interaction-verification items
that need human eyes/hands rather than automated tooling. Recommend Rahul spend a few minutes on
a manual pass covering these before final sign-off, particularly the career-timeline scroll
interaction.

## Review fixes 01 — /code-review findings on the merged responsive-audit diff

Ran `/code-review` against the full `feature/responsive-audit` diff. Two findings; one real, one
false positive (verified, not assumed):

| ID | Finding | Verdict | Resolution |
|---|---|---|---|
| RF01 | `.brand small` gets `overflow: hidden; text-overflow: ellipsis` but no explicit `display` override, and `<small>` defaults to `display: inline` — reviewer flagged that `text-overflow` only applies to block containers, so the ellipsis wouldn't render | **False positive** | No change. Verified: `.brand small` is a CSS Grid item (child of `.brand div { display: grid }`), and per CSS Display Level 3 "blockification," an inline-level box that's a grid item is automatically promoted to `display: block`. Confirmed via computed style (`display: block`) and a live screenshot with forced overflow content — the ellipsis renders correctly (`AI · PRO…`). |
| RF02 | `.tl-year`/`.tl-dot` sticky `top` offsets (150px/156px tablet, 108px/114px desktop) were hardcoded against a header height snapshot, while Stage 7's own change (`.site-header` fixed `height` → `min-height`) specifically made that height variable — if a viewer's text-size settings grow the header past the hardcoded buffer, the sticky label scrolls to a position still under the header (no `z-index` on `.tl-year`, header at `z-index: 50`) | **Real, fixed** | Replaced the hardcoded offsets with `calc(var(--header-h, <fallback>) + <gap>px)`. Added a small script in `Nav.astro` that measures the real `.site-header` height and sets `--header-h` on page load (confirmed correct: 66px desktop, 138px tablet, matching prior measurements), plus a `resize`/`ResizeObserver` listener to keep it current if the header's height changes after load. |

**Tooling limitation on RF02's verification:** this session's browser-automation profile does not
fire `ResizeObserver` callbacks at all — confirmed with a minimal isolated repro (a bare
`ResizeObserver` on a plain `<div>` never fired, not even its spec-guaranteed initial callback).
This is the same class of limitation already documented for `resize_window` (doesn't change real
`innerWidth`) and `scrollTo` (doesn't register) since Stage 1. It means the *initial* header-height
sync (which resolves the actual reported bug — the offset not matching the real height at load)
was verified correct across all breakpoints, but the *live update* path (`resize` event /
`ResizeObserver` firing again if the header grows after load) could not be exercised end-to-end
in this session. Both are standard, widely-supported browser APIs and should work correctly in a
real browser — but this is flagged for Rahul to spot-check manually (e.g. bump the browser's
text-size/zoom setting on `/career` at a tablet width and confirm the sticky year label still
clears the header) rather than assumed.

Re-verified the full required matrix (320-1920px) overflow-free on all 7 routes after these
changes.
