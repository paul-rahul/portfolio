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
| R002 | `/` (homepage) | 320–430px | P1 | Homepage overflows horizontally — 119px at 320px, 49px at 390px, 9px at 430px | The Engineer → Product → Market progression module (`.progression-step`) does not have an intentional narrow-mobile layout; content forces width beyond viewport | Build the explicit mobile vertical flow described in the plan's Stage 3 (stacked steps with connector, no forced horizontal min-width) rather than shrinking the desktop layout | Open |

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
