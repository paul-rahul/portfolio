---
name: Rahul Paul Portfolio
description: A metric-first, credential-forward portfolio for a post-MBA PM candidate
colors:
  ink: "#111111"
  ink-secondary: "#5f5f5f"
  background: "#f6f6f3"
  surface: "#ffffff"
  border: "#ddddda"
  accent: "#4c5ff5"
  accent-soft: "#eef0ff"
  success: "#1f8a5b"
typography:
  display:
    fontFamily: "Instrument Sans, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 64px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, IBM Plex Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0 18px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  metric-tile:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  media-placeholder:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
    border: "1px dashed {colors.border}"
---

Design System: Rahul Paul Portfolio

## Overview

**Creative North Star: "The Technical Editorial"**

The system reads like an engineering-run publication: an off-white newsprint background, restrained typographic hierarchy, and a single cobalt accent used with discipline. Content is presented as evidence — metrics, outcomes, timeline entries — laid out with the precision of a spec sheet rather than the theatrics of a marketing site. Mono type marks anything numeric or systemic (labels, periods, metrics, role numbers), signaling "measured fact," while Instrument Sans carries the human-authored headlines and body copy stays in Inter for long-form legibility.

This direction replaced an earlier "clay" pastel-illustration system (see prior `portfolio_ui_rehaul` era). The rejection was explicit: no chips-as-decoration, no pastel fills, no playful illustration devices. Everything visual either encodes information (accent color = interactive/notable, mono type = data) or gets removed.

**Key Characteristics:**
- Off-white paper background, not pure white — newsprint, not app-chrome
- One accent color (cobalt `#4c5ff5`), used sparingly: links, active states, the single top ribbon, metric highlights
- Mono type as a structural signal for anything numeric, dated, or systemic
- Flat surfaces — no shadows beyond one soft ambient shadow token, borders do the separating

## Colors

The palette is almost monochrome by design; color is a signal, not decoration.

### Primary
- **Cobalt** (`#4c5ff5`): the only saturated color in the system. Used for the top ribbon, active nav underline, links inside headlines (`<em>`), timeline dots, arrows/icons, and hover states on primary buttons. Never used as a large fill.

### Neutral
- **Ink** (`#111111`): primary text color and the fill for primary buttons/badges (near-black, not pure black).
- **Ink Secondary** (`#5f5f5f`): all secondary/supporting text — ledes, metadata, captions.
- **Background** (`#f6f6f3`): page background (warm off-white, "paper").
- **Surface** (`#ffffff`): card and panel background, sits one step lighter than the page.
- **Border** (`#ddddda`): all dividers, card outlines, table rules.

### Named Rules
**The One Accent Rule.** Cobalt is the only saturated hue in the system. If a new element needs emphasis, reach for ink-on-background contrast or mono type before reaching for a second color.

## Typography

**Display Font:** Instrument Sans (with Inter Tight, Inter, system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with IBM Plex Mono, ui-monospace fallback)
**Hand/Script Font:** Caveat, weight 600 (with cursive fallback) — reserved for the homepage hero's "This is me" annotation only, loaded at a single weight to keep payload minimal

**Character:** Instrument Sans headlines are tight and confident (negative letter-spacing, line-height near 1), Inter body copy stays relaxed and readable at 1.55 line-height, JetBrains Mono marks anything that is data rather than prose, and Caveat supplies the one deliberately handwritten moment in the whole system.

### Hierarchy
- **Display / H1** (600 weight, `clamp(40px, 5vw, 64px)`, line-height 1.04, letter-spacing -0.02em): hero and page-hero headlines.
- **Section heading / H2** (600 weight, `clamp(30px, 3.4vw, 42px)`): section titles like "Work that moved a number."
- **Body / lede** (400 weight, 16–18px, line-height 1.55): paragraph copy, role summaries.
- **Label / eyebrow / mono** (600–700 weight, 11–13px, letter-spacing 0.06–0.1em, uppercase): kickers, chips, periods, metric captions — always mono, always uppercase.

### Named Rules
**The Mono-Means-Data Rule.** JetBrains Mono is reserved for anything numeric, dated, or systemic (metrics, periods, role numbers, nav-brand mark). It never appears in prose copy.

**The Script-Means-One-Moment Rule.** Caveat is reserved for the hero "This is me" annotation and nowhere else — it is not a general accent font.

## Layout

Content is constrained to a `min(1180px, calc(100% - 40px))` wrap, centered. The header is a sticky bar, `min-height: 66px` on desktop (allowed to grow, never clipped, if a user's text-size settings need more room). Sections use generous block padding (48–60px) with tighter internal card padding (18–44px depending on density). The career page introduces a two-column timeline grid (`28px` dot track + flexible content column) that collapses to `18px` + content under 680px. Below 980px the header nav wraps under the brand row; below 680px most multi-column grids (fact-strip, case-grid, editorial-grid, contact-card) collapse to a single column. See **Responsiveness** below for the full breakpoint system.

## Responsiveness

Established by a dedicated responsive audit/remediation pass (see `docs/RESPONSIVE_AUDIT.md` for the
QA record). The system uses two structural breakpoints plus one narrow tablet-only refinement
band — semantic ranges, not device presets:

| Range | Width | Role |
|---|---|---|
| **Compact** | ≤680px | Phones. Single-column grids, sticky elements drop pinning, nav becomes a horizontally-scrollable touch row with 44px+ tap targets. |
| **Comfortable / tablet** | 681–980px | Tablets and small laptops. Header nav has already wrapped under the brand row (see Navigation below); a narrow `(max-width: 980px) and (min-width: 681px)` band exists specifically to ease density in components that would otherwise inherit desktop spacing untouched (Career's pinned timeline, metric grid). |
| **Desktop** | 981–1279px | Full desktop layout, header returns to its compact single-row form. |
| **Wide** | 1280px+ | Content stays capped at the `min(1180px, calc(100% - 40px))` wrap — wide screens get more margin, not infinitely stretched content. |

### Global shell
- Max content width: `min(1180px, calc(100% - 40px))`, centered.
- Horizontal gutters: `max(24px, calc((100vw - 1180px) / 2))` on the header; `min(100% - 28px, 1180px)` on the wrap below 680px.
- Header: `min-height: 66px` (not fixed `height`) so it can grow rather than clip if text size increases; wraps to a two-row layout (brand row + scrollable nav row, ~138px measured) below 980px.
- No page uses `overflow-x: hidden` as a blanket fix — every overflow source found during the audit was traced to its actual layout cause (a grid track, a flex item, a fixed dimension) and fixed at that cause.

### Typography
- Headings that need to shrink on mobile use a single `clamp(floor, Nvw, ceiling)` — never a `clamp()` plus a separate breakpoint override for the same property. (Stage 6 found and removed three cases of exactly that duplication.)
- Current heading clamps: hero H1 `clamp(38px, 5vw, 64px)`, page-hero H1 `clamp(40px, 4.6vw, 54px)`, editorial title `clamp(36px, 4.4vw, 48px)`, section H2 `clamp(30px, 3.4vw, 42px)`.
- Body line length: paragraph/lede `max-width` values sit in the 640–760px range — a comfortable reading measure at any viewport, never allowed to stretch edge-to-edge on wide screens.

### Navigation
- **Desktop (>980px):** single-row header, nav centered between brand and header actions, compact 6px-padding links (mouse target, no touch-target inflation needed).
- **Compact/tablet (≤980px):** nav wraps to its own full-width row below the brand, `overflow-x: auto` for horizontal scroll rather than wrapping links onto multiple lines; links get `padding-block: 12px` + `padding-inline: 5px` on the row so both the tap target (~47.7px tall) and the focus-visible ring stay clear of the scroll-container edge.
- Theme toggle lives in `.header-actions`, to the right of nav, unchanged across all breakpoints — always reachable without opening a menu.

### Grids
- 4-column → 2-column → 1-column: `.capability-grid` ("What I'm known for") — 4 columns desktop, 2 at ≤980px, 1 at ≤680px.
- 3-column → 1-column: `.progression-grid` (homepage) and `.metric-row` — 3 columns desktop, straight to 1 at ≤680px; `.metric-row` gets an intermediate 2-column step in the 681–980px tablet band.
- 5-column → vertical flow: `.operating-steps` ("How I operate") — 5 columns desktop/tablet, collapses to a single vertical column with a left-border connector (no arrows, no horizontal scroll) at ≤680px.
- Card stacking principle: collapse to fewer columns before content is forced to shrink below a readable minimum — never let a grid track's `auto` min-sizing silently force the page wider than the viewport (the root cause behind both P1 overflow issues found in the Stage 1 baseline audit).

### Career
- Career uses a **firm/role/project explorer** (see **Firm/role/project explorer** below), replacing the earlier pinned-scroll timeline pattern (still in use on `/internships`, a single-entry page where a scroll-driven reveal still fits).
- Desktop layout is a 30/70 split: sticky `.firm-pane` (min 260px, 30% width) + `.firm-detail-pane` (70%). Below 980px it collapses to a single column and the firm pane stops being sticky.
- Metric layout: 3 columns desktop, 2 columns in the 681–980px tablet band, 1 column at ≤680px (same `.metric-row` component used elsewhere).
- Capability/"How I operate" behavior: see Grids above.

### Media
- Base `img { width: 100%; height: 100%; object-fit: cover }` bounds every image to its container by default — no per-component overrides needed for the common case.
- No diagram/SVG component in the current site needs mobile-specific treatment (none found during the Stage 6 audit); if one is added, it must scale without clipping or forcing horizontal scroll, per the anti-patterns below.

### Accessibility
- Minimum practical tap target: ~44px tall, enforced on all interactive elements in the touch-scrollable mobile/tablet nav row and on all button components (`.button` is already 44px min-height at every breakpoint).
- Focus-visible: `outline: 2px solid var(--accent); outline-offset: 3px` globally, in both themes (same accent token). Any scrollable/clipped container (e.g. `overflow-x: auto` nav) must carry enough `padding-inline` to keep that outline from being clipped at its edges.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` zeroes all `animation-duration`/`transition-duration` and sets `scroll-behavior: auto`. The pinned-timeline scroll-fill is scroll-position-driven (not autoplaying), so it isn't a reduced-motion concern on its own.
- Zoom/text scaling: prefer `min-height` over fixed `height` on any container that holds text (the header was the one fixed-height case found and fixed in Stage 7) — a fixed height can't grow if a user's text-size settings increase, even though page-level browser zoom scales proportionally and isn't itself a risk.

## Elevation & Depth

The system is flat by default — no drop shadows on cards or buttons at rest. Depth is conveyed through a single soft ambient `--shadow` token (`0 1px 2px rgba(17,17,17,.04), 0 8px 24px rgba(17,17,17,.05)`) reserved for rare floating elements, and otherwise through border + background-step separation (surface sits above background, one border-width apart).

### Named Rules
**The Flat-By-Default Rule.** Cards and buttons rest without shadow. Separation comes from a 1px border and a background-color step, not elevation.

## Motion

A restrained, purposeful motion system, added across the site without introducing a JS animation library — vanilla CSS transitions/animations plus a handful of `IntersectionObserver` reveals, on top of the existing Astro + CSS + vanilla-JS stack.

### Motion principles
- Motion explains hierarchy, state change, progression, causality, or interactivity — it never exists just to feel "dynamic."
- No parallax, floating/bobbing loops, particles, cursor trails, glow-follow effects, 3D tilt, marquee, typing/scramble text, animated gradients, scroll-jacking, or large page wipes.
- Works identically in Day and Night — motion tokens are theme-independent; only color tokens change.
- `prefers-reduced-motion: reduce` is mandatory and already handled globally (see Reduced motion below) — no per-component opt-out was needed.

### Motion tokens
Defined in `src/styles/tokens.css` `:root`, alongside the existing color/spacing tokens:

```css
--motion-fast: 150ms;
--motion-base: 220ms;
--motion-enter: 420ms;
--motion-slow: 650ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

`--motion-fast`/`--motion-base` cover hover and state-toggle micro-interactions; `--motion-enter` covers page-load entrance sequences; `--motion-slow` is reserved for the one deliberately slower moment (the homepage intersection-diagram convergence). `--ease-out` is used for anything entering or growing; `--ease-standard` for state toggles (accordion height, icon rotation, nav underline).

### Component rules
- **Page-hero entrance:** every page using the shared `PageHero`/`.page-hero` component (Career, About, Built, Internships, Contact) fades its chip → h1 → lede up in sequence on load (~90–150ms stagger). This is the "standard page-heading entrance" — no page adds its own variant.
- **Homepage hero — Venn diagram:** headline, lede, CTA buttons, then the intersection diagram fade up in sequence (`--motion-enter`, ~90ms stagger). Within the diagram, the Engineering/Design/Business circles converge from slightly offset starting positions into their resting overlap, once, over `--motion-slow` (staggered 300/480/660ms). Once the circles settle (~2.4s in), the center dot fades in (`--motion-base`), then the curved arrow draws in via a `stroke-dashoffset` animation (`--motion-enter`), then "This is me" fades up last — matching the plan's circles → dot → arrow → annotation sequence. No bounce, spring overshoot, looping pulse, or letter-by-letter animation is used anywhere in this sequence.
- **Homepage reveals:** the quick-fact strip and capability grid reveal with a light stagger the first time they scroll into view (`IntersectionObserver`, run once, progressive enhancement — content is fully visible without JS).
- **Career firm/project switching:** the newly active panel fades up (`--motion-base` for firm switch, `--motion-fast` for project switch, since it's the finer-grained navigation); metric tiles get a light `scale(.98→1)` with a 2-step stagger riding on the project-switch entrance. The previously active panel is hidden immediately rather than exit-animated — a deliberate simplification to keep the swap robust and avoid `hidden`-attribute/animation timing races.
- **Career accordions:** the abrupt `hidden`-attribute toggle was replaced with a CSS-grid `0fr → 1fr` height transition (no fixed/measured heights), and the `+`/`–` glyph swap was replaced with a single "+" that rotates 45°. Collapsed panels get `inert` (not just `hidden`) so they drop out of the tab order without needing extra ARIA.
- **Career "How I operate":** the five steps reveal once via `IntersectionObserver` with a ~70ms stagger, progressive enhancement (visible by default without JS).
- **Nav active/hover state:** the old instant `border-bottom-color` swap was replaced with a `scaleX(0→1)` underline on a `::after` pseudo-element, `hover` and `focus-visible` both trigger it.
- **Theme toggle:** the sun/moon icons cross-fade with a `scale + rotate` instead of a `display: none/block` swap — both icons are always in the DOM, absolutely centered, opacity/transform driven by the `data-theme` attribute selector.
- **Arrow icons:** any `ArrowIcon` inside `.button`, `.header-cta`, `.section-heading > a` or `.case-link` shifts 3px on hover/focus-visible — transform only, so it never affects layout width or causes text reflow.
- **Card hover:** `.case-card` keeps its existing `translateY(-3px)` + border-color hover, now on shared tokens, plus a `scale(1.015)` on its visual (clipped by the card's own `overflow: hidden`) and a 3px arrow shift.
- **About page:** the intro portrait slides in from -8px horizontal, the copy from +8px, staggered after the page-hero settles. Editorial card images get a `scale(1.02)` hover rule wired to a real `<img>` selector — inert today (the cards only hold `MediaPlaceholder`s) and activates automatically once real photos replace them, per the placeholder-vs-real-image distinction in the MediaPlaceholder section above.
- **Built page:** intentionally uses only the shared page-hero entrance — no extra motion was added while the section's content is still a single placeholder block.

### Responsive motion rules
- No motion pattern changes shape across breakpoints — the same opacity/transform treatments run everywhere; only layout (columns → stack) changes, per the existing Responsiveness rules above.
- No pointer-tracking or hover-only effects are relied on for content on touch devices — every motion pairs with a tap-equivalent state (`:focus-visible` alongside `:hover` throughout) or is a load/scroll-triggered reveal that doesn't depend on hover at all.
- The optional desktop-only pointer-response idea for the intersection diagram (2–4px shift per circle on mouse move) was evaluated and omitted — it didn't clearly improve the result over the convergence entrance alone.

### Reduced motion
Handled by one existing global rule in `tokens.css`, unmodified by this work:

```css
@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
	* {
		animation-duration: 0.001ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.001ms !important;
		scroll-behavior: auto !important;
	}
}
```

Every animation and transition added by the motion system — entrances, reveals, accordion height, icon rotation, nav underline, hover treatments — routes through `animation-duration`/`transition-duration`, so this single rule resolves all of them to effectively instant without any per-component reduced-motion code. Content that uses `IntersectionObserver` progressive enhancement (homepage reveals, "How I operate") stays visible without JS or `IntersectionObserver` support, independent of the reduced-motion rule.

## Shapes

Three radius steps cover the whole system: `8px` (sm — buttons, small badges), `12px` (md — metric tiles), `16px` (lg — cards, panels, image frames). Pills (`999px`) were previously reserved for the career page's reading-frame chips; that component was removed (Review fixes 01) and the pill radius is currently unused — kept in the scale for any future chip need.

## Brand Mark & Favicon

The favicon/app icon follows the Technical Editorial identity: a dark charcoal (`#111214`) rounded-square base, a white editorial serif `R`, and a cobalt (`#4c5ff5`) accent dot and underline — restrained, premium, legible in both light and dark browser chrome.

The same asset is used across Day and Night modes; the favicon does not theme-swap.

Primary assets, served from `public/`:
- `favicon.ico` — multi-size ICO (legacy browser tab fallback)
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` — standard PNG tab icons
- `apple-touch-icon.png` (180×180) — iOS home screen / Safari
- `android-chrome-192x192.png`, `android-chrome-512x512.png` — Android/Chromium installable icons, referenced from `site.webmanifest`
- `site.webmanifest` — PWA manifest (`theme_color: #111214`, `background_color: #F6F6F3`)

### Named Rules
**The One-Mark Rule.** The favicon does not theme-swap between Day and Night — one asset, designed to read cleanly in both browser chrome themes.

## Components

### Buttons
- **Shape:** 8px radius (`--radius-sm`), 44px min-height, `0 18px` padding.
- **Primary:** ink background, white text; hovers to cobalt background.
- **Ghost:** surface background, ink text, border; hovers to ink-colored border.

### Chips / Pills
- No pill-radius chip is in current use (the career page's reading-frame pill was removed — Review fixes 01). The `--radius-pill` token remains defined for any future chip need.

### Cards / Containers
- **Corner Style:** 16px radius (`--radius-lg`) for cards/panels; 12px for metric tiles.
- **Background:** surface (`#ffffff`) on background (`#f6f6f3`), or background-on-surface for nested tiles (metric tiles sit on `--background` inside a surface card).
- **Shadow Strategy:** none at rest (see Elevation & Depth); `.case-card` gets a subtle `translateY` + border-color shift on hover instead of shadow.
- **Border:** 1px solid `--border` on all cards.
- **Internal Padding:** 18–44px depending on card density (metric tile 18px, contact-card 44px).

### Homepage hero — Engineering/Design/Business Venn diagram
- **Meaning:** three overlapping circles — Engineering (upper-left), Design (upper-right), Business (lower-center) — with a shared three-way overlap, marked by a small accent dot, a curved arrow, and a handwritten "This is me" annotation pointing at it. The diagram is `aria-hidden="true"`: the hero H1 ("I build at the intersection of technology, product & market") already communicates the same idea in words, so nothing unique is exposed to assistive tech and no decorative SVG path is announced or focusable.
- **Ring treatment:** all three circles share one accent-colored (`--accent`) 1.5px outline, no fill, no shadow. `mix-blend-mode: multiply` (light mode only, reset to `normal` in dark) darkens the overlaps the way real overlapping circles would.
- **Label treatment:** ENGINEERING / DESIGN / BUSINESS use the standard mono label system (`--font-mono`, uppercase, tracked, `clamp(10px, 1.6vw, 12px)`) in primary ink (`--ink`) — not accent-colored, unlike the pre-redesign version where the Business label used the accent color.
- **Label placement:** Engineering sits at its own circle's center and is the anchor other labels are placed relative to. Design is nudged inward (`transform: translate(-14%, 6%)` off its circle's center) so it visually mirrors Engineering instead of crowding the diagram's outer-right edge. Business is nudged up (`transform: translateY(-18%)`) so it sits above its circle's literal vertical center, leaving room below and clear of the center annotation.
- **Center dot + arrow + annotation:** an inline SVG (`viewBox="0 0 100 100"`, matching the container's percentage coordinate system 1:1) draws a small accent-filled dot at the diagram's true three-way overlap and a single curved, accent-colored path with an SVG marker arrowhead running from the lower-right toward it. "This is me" sits past the arrow's tail in Caveat (script/hand font, see Typography), accent-colored, `clamp(18px, 2.4vw, 24px)`.
- **Day/Night:** every diagram color (rings, dot, arrow, arrowhead, labels) is a semantic token (`--accent`, `--ink`) that already flips per theme — there is no diagram-specific dark/light branch, and the geometry is identical in both themes.
- **Responsive:** all circle, dot, and arrow positioning is percentage-based against the square `.intersection-diagram` container (itself `width: 100%; max-width: 600px` under the existing ≤980px hero-stack rule), and label/annotation type sizes use `clamp()` — so the diagram scales continuously from desktop down to the smallest supported width without a dedicated per-breakpoint override.
- **Motion:** see Motion → Component rules and Reduced motion above; the entrance sequence and reduced-motion fallback are identical to the rest of the site's conventions, nothing diagram-specific was added to the reduced-motion rule.

### MediaPlaceholder

- **Purpose:** a reusable placeholder for any future image/visual slot — used everywhere a real photo, screenshot, or diagram is planned but doesn't exist yet. Introduced by the Content & Visual Refinement plan's image policy: placeholders everywhere, never stock/AI/fabricated imagery.
- **Component:** `src/components/MediaPlaceholder.astro`. Props: `id` (string, e.g. `IMG-04`), `label` (e.g. "Portrait"), `description` (e.g. "Professional portrait / candid"), `aspectRatio` (one of `16:9`/`16:10`/`3:2`/`4:3`/`4:5`/`1:1`, default `16:10`), optional `class`.
- **Styling:** sits on `--background` (not `--surface`, so it reads as "recessed/pending" rather than a populated card), **1px dashed** `--border` — a deliberate, intentional deviation from the system's solid-border rule for real cards/panels, so a placeholder is visually distinguishable from real content at a glance. No shadow (Flat-By-Default rule still applies). Content is centered: mono `id`, mono uppercase `label`, secondary-color `description`, small mono ratio indicator.
- **Theme behavior:** uses semantic tokens only (`--background`, `--border`, `--ink-secondary`) — verified in both Day and Night.
- **Replacement process:** when a real asset exists, swap the `MediaPlaceholder` for a real `<img>` (or a wrapping `.image-frame` if crop/radius treatment is needed) and remove its row from `docs/VISUAL_ASSETS.md`, or mark it `Retained`/fulfilled.
- **Relationship to `docs/VISUAL_ASSETS.md`:** every placeholder instance in the codebase must have a corresponding row there (page, placement, asset needed, ratio, status). `docs/VISUAL_ASSETS.md` is the authoritative inventory; this section is the component spec.

### Status chip

- **Purpose:** an honest, unmissable "this isn't real/finished yet" signal — used for Built project preview cards (Home) and the `ProjectCaseStudy` header, wherever content is legitimately pending rather than shipped.
- **Structure:** a small colored dot + mono uppercase label, e.g. `● IN PROGRESS`, `● QUEUED`. Same visual language as the existing hero `.eyebrow` dot, generalized into a reusable class.
- **Classes:** `.status-chip` (base) + a tone modifier — `.status-active` (dot = `--success`, "shipped/in-progress" tone) or `.status-queued` (dot = `--ink-secondary`, neutral/pending tone). Add new tones the same way if a third state is ever needed.
- **Rule:** never used to imply something is live/shipped when it isn't — pair only with placeholder-backed content, never with real screenshots presented as finished.

### Project case-study template

- **Purpose:** the standard structure for any Built project's dedicated page — Problem → Solution → How I got there → Outcome, per the site's product principle of scannable, evidence-led storytelling extended to personal projects.
- **Component:** `src/components/ProjectCaseStudy.astro`. Renders: status chip + title → hero `MediaPlaceholder` (16:9) → "The problem" → "The solution" → product/flow `MediaPlaceholder` (16:10) → "How I got there" → supporting `MediaPlaceholder` (3:2) → "The outcome" → footer CTAs (Back to Built, optional Next project / Live / GitHub — each rendered only if a real URL is supplied, never fabricated).
- **Section labels** use the existing `.kicker` mono-uppercase convention (the career page previously had a separate `.reading-frame`/`.frame-pill` pattern for this same kind of framing; it was removed in Review fixes 01, so `.kicker` is now the only section-label convention in the system).
- **Status as of this plan:** the component exists and is verified (via a temporary, fully-reverted test route) but is **not wired to any live page** — no real Built project content exists yet. It's ready to back the first real entry.

### Pinned scroll timeline (internships page)
- **Structure:** a three-column row per role — sticky year/period label (mono period + Instrument Sans company name), a center dot-and-line track, and an always-expanded card. Cards are never collapsed; the scroll itself reveals content, so there is no toggle/trigger element.
- **Pin behavior:** the year label and its track dot use `position: sticky` (same `top` offset, pinned just below the site header) so they hold position while that role's card scrolls past underneath; they release once the row's content clears.
- **Progress feedback:** the connecting line fills from `--border` to cobalt as the user scrolls through a row (JS sets a `--fill` custom property on scroll, `requestAnimationFrame`-throttled); the active row's dot and period label switch to cobalt via an `IntersectionObserver` watching a band around viewport center. Both effects are skipped for `prefers-reduced-motion`, leaving the row highlight as the only active-state signal.
- **Mobile (≤680px):** sticky pinning is dropped — year label sits inline above its card, non-sticky, with the dot-and-line rail continuing at the row's left edge.
- **Status:** this pattern now backs only `/internships` (a single-firm, single-role deep dive where continuous scroll narration still fits). The multi-firm Career page uses the **Firm/role/project explorer** below instead — its `.tl-*` classes are shared with, but independent from, the explorer's markup.

### Firm/role/project explorer (career page)
- **Purpose:** supports multiple firms, multiple roles within a firm, and multiple projects within a role/firm, each with detailed accordion content — the structure a `.tl-row`-per-firm timeline couldn't hold once a firm had more than one role or more than one project worth showing separately.
- **Hierarchy:** Firm → Role(s) → Project(s) → accordion detail. Data lives in `src/data/career.ts` (`Firm[]`, each with `roles: FirmRole[]` and `projects: Project[]`); nothing here is a content collection.
- **Desktop structure (`.career-explorer`):** `.firm-pane` (30%, sticky) lists every firm as a `.firm-card` button (`aria-pressed` marks the selected one); `.firm-detail-pane` (70%) holds one `.firm-detail` panel per firm (`hidden` on all but the selected one).
- **Firm detail panel:** name + period header, then — only for firms with more than one role — a `.role-history` block (dot-marked list, title/period/summary per role; single-role firms skip this and go straight to projects, so a role history never appears for a firm that doesn't need one). Then `.project-nav`, a list of `.project-chip` buttons (title, descriptor, and — only when the firm has multiple roles — the project's role label) driving the same `aria-pressed`/`hidden` pattern as firm selection.
- **Project detail (`.project-detail`):** title + summary, a `.metric-row` of verified metrics, then `.accordion` with exactly six sections in a fixed order — The problem, How I approached it, How the product works, Tools and product decisions, Impact to users, What I learned. "The problem" and "Impact to users" default open (`aria-expanded="true"`, `hidden` absent on their panel); the other four default collapsed.
- **Accordion markup:** each section is a `<button class="accordion-trigger" aria-expanded aria-controls>` inside an `<h4>`, controlling a `role="region" aria-labelledby` panel. Content is a mix of `<p>` paragraphs and/or a `<ul>` of short claims (per-section, whichever fits the underlying fact — never both forced into every section).
- **Interaction (vanilla JS, no framework):** firm selection, project selection and accordion toggling are all click-driven `aria-pressed`/`aria-expanded` + `hidden` toggles — no animation, so there's nothing to gate behind `prefers-reduced-motion`. Firm selection also syncs `location.hash` (`#cisco`, `#dream11`, …) via `history.replaceState`, and reads an incoming hash on load — preserving the old timeline's deep-link behavior without a full router.
- **Responsive:** ≥981px is the 30/70 split above. ≤980px, `.career-explorer` drops to a single column and `.firm-pane` stops being sticky (`position: static`) — firm cards, project chips and the project detail all stack full-width in document order (firm list → selected firm → role history → project list → selected project → accordion). No breakpoint hides or horizontally scrolls any of this content.
- **Content rule:** every project's sections and every firm/role fact are restructured only from confirmed source content (the current career content-population source, tracked against `CAREER_CONTENT_GAPS.md`) — no invented projects, metrics, tools, or personal "lessons learned." A project with only one or two real metrics shows only those; empty metric slots are never invented to fill a row.
- **Blank accordion section rule:** `project.sections` is always the full six canonical sections, in fixed order (problem → approach → how it works → tools → impact → learned) — never a subset. A section with no confirmed content still renders its row, numbered in sequence, fully clickable/expandable via the same `aria-expanded`/`hidden` mechanics as a populated one; its expanded panel is simply empty (no paragraphs, no bullets) rather than hidden or omitted. The panel gets a `.accordion-panel-inner--empty` modifier that trims padding to a near-zero compact block, so an expanded blank section doesn't leave a large dead gap. Never render "Coming soon," "TBD," or any other filler/gap-notice text in this state — that belongs only in `CAREER_CONTENT_GAPS.md`, an internal tracker, never the public DOM. A project's contextual section title can override the canonical label for a GTM-style role (e.g. "How the research translated to GTM direction," "Launch approach") while keeping its position in the fixed six-section order — the override is cosmetic, not a change in section count or order. A project with genuinely nothing to show at all still renders all six rows blank, rather than hiding the accordion.

## Do's & Don'ts

### Do:
- **Do** keep cobalt to single-element usage (links, active state, one dot, one ribbon) — never a fill larger than a button or dot.
- **Do** set anything numeric, dated, or systemic in JetBrains Mono, uppercase, with letter-spacing.
- **Do** separate surfaces with a 1px border + background step, not a shadow.
- **Do** let scroll position — not a click toggle — drive reveal state for the career timeline; keep content in the DOM and visible by default so it works without JS.
- **Do** use `MediaPlaceholder` (dashed border) for any planned-but-missing visual, and log it in `docs/VISUAL_ASSETS.md` — never leave an unexplained empty gap and never fabricate a stand-in image.

### Don't:
- **Don't** introduce a second saturated accent color.
- **Don't** add drop shadows to cards or buttons at rest — flat is the rule, translateY/border-color is the hover language.
- **Don't** use pastel fills, illustration devices, or decorative chips — that direction was explicitly rejected in favor of this system.
- **Don't** use blanket `overflow-x: hidden` to mask a layout bug — find and fix the actual cause (an unshrinkable grid/flex item, a fixed width/height, an unbroken word).
- **Don't** ship a desktop layout "shrunk" to mobile — every grid/flex component needs an intentional narrower-width composition (fewer columns, stacked order, adjusted spacing), not just smaller numbers plugged into the same structure.
- **Don't** hide important content (career metrics, outcomes, contact info) purely to make a narrow layout easier — recompose instead.
- **Don't** pair a `clamp()` with a separate breakpoint-specific `font-size` override for the same property — fold the override's value into the clamp's floor/ceiling instead.
- **Don't** use a fixed pixel `height` on any container that holds text — use `min-height` so it can grow instead of clipping.
- **Don't** use absolute positioning for core content, or fixed heights on text-heavy sections.
- **Don't** rely on horizontal scroll for content someone needs to read start-to-finish — it's acceptable only for a clearly-scrollable control like the compact nav row, never for prose or a data table someone must read completely.
- **Don't** give Day and Night different responsive/layout logic — theme changes color tokens only; every structural fix in this system has been (and should stay) theme-independent.
- **Don't** source stock imagery, generate AI imagery, or invent screenshots/diagrams/photographs to fill a gap — use `MediaPlaceholder` until a real asset exists.
