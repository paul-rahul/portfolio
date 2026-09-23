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
| R001 | global (all routes) | ≤320px | P1 | Page-level horizontal overflow (~21px at 320px); `.site-header` `scrollWidth` (341px) exceeds viewport (320px) | `.site-header` grid is `grid-template-columns: auto 1fr` below 980px; `.brand` (logo + "AI · Product · GTM" subtitle) has no shrink constraint, so its column claims its full natural content width (~181px at 320px), leaving too little room for `nav` and forcing overall header wider than the viewport | Give `.brand` column a `minmax(0, auto)` (or similar) track / `min-width: 0` on the brand so it can shrink below content width; consider hiding or truncating the subtitle below ~360px | Fixed (Stage 2) |
| R002 | `/` (homepage) | 320–430px | P1 | Homepage overflows horizontally — 119px at 320px, 49px at 390px, 9px at 430px | The Engineer → Product → Market progression module (`.progression-step`) does not have an intentional narrow-mobile layout; content forces width beyond viewport | Build the explicit mobile vertical flow described in the plan's Stage 3 (stacked steps with connector, no forced horizontal min-width) rather than shrinking the desktop layout | Fixed (Stage 3) |

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
