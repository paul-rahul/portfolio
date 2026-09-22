---
name: Rahul Paul Portfolio
description: A metric-first, credential-forward portfolio for a post-MBA PM candidate
colors:
  ink: "#111111"
  ink-secondary: "#5f5f5f"
  background: "#f6f6f3"
  surface: "#ffffff"
  border: "#dddddA"
  accent: "#4f63ff"
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
---

Design System: Rahul Paul Portfolio

## Overview

**Creative North Star: "The Technical Editorial"**

The system reads like an engineering-run publication: an off-white newsprint background, restrained typographic hierarchy, and a single cobalt accent used with discipline. Content is presented as evidence — metrics, outcomes, timeline entries — laid out with the precision of a spec sheet rather than the theatrics of a marketing site. Mono type marks anything numeric or systemic (labels, periods, metrics, role numbers), signaling "measured fact," while Instrument Sans carries the human-authored headlines and body copy stays in Inter for long-form legibility.

This direction replaced an earlier "clay" pastel-illustration system (see prior `portfolio_ui_rehaul` era). The rejection was explicit: no chips-as-decoration, no pastel fills, no playful illustration devices. Everything visual either encodes information (accent color = interactive/notable, mono type = data) or gets removed.

**Key Characteristics:**
- Off-white paper background, not pure white — newsprint, not app-chrome
- One accent color (cobalt `#4f63ff`), used sparingly: links, active states, the single top ribbon, metric highlights
- Mono type as a structural signal for anything numeric, dated, or systemic
- Flat surfaces — no shadows beyond one soft ambient shadow token, borders do the separating

## Colors

The palette is almost monochrome by design; color is a signal, not decoration.

### Primary
- **Cobalt** (`#4f63ff`): the only saturated color in the system. Used for the top ribbon, active nav underline, links inside headlines (`<em>`), timeline dots, arrows/icons, and hover states on primary buttons. Never used as a large fill.

### Neutral
- **Ink** (`#111111`): primary text color and the fill for primary buttons/badges (near-black, not pure black).
- **Ink Secondary** (`#5f5f5f`): all secondary/supporting text — ledes, metadata, captions.
- **Background** (`#f6f6f3`): page background (warm off-white, "paper").
- **Surface** (`#ffffff`): card and panel background, sits one step lighter than the page.
- **Border** (`#dddddA`): all dividers, card outlines, table rules.

### Named Rules
**The One Accent Rule.** Cobalt is the only saturated hue in the system. If a new element needs emphasis, reach for ink-on-background contrast or mono type before reaching for a second color.

## Typography

**Display Font:** Instrument Sans (with Inter Tight, Inter, system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with IBM Plex Mono, ui-monospace fallback)

**Character:** Instrument Sans headlines are tight and confident (negative letter-spacing, line-height near 1), Inter body copy stays relaxed and readable at 1.55 line-height, and JetBrains Mono marks anything that is data rather than prose.

### Hierarchy
- **Display / H1** (600 weight, `clamp(40px, 5vw, 64px)`, line-height 1.04, letter-spacing -0.02em): hero and page-hero headlines.
- **Section heading / H2** (600 weight, `clamp(30px, 3.4vw, 42px)`): section titles like "Work that moved a number."
- **Body / lede** (400 weight, 16–18px, line-height 1.55): paragraph copy, role summaries.
- **Label / eyebrow / mono** (600–700 weight, 11–13px, letter-spacing 0.06–0.1em, uppercase): kickers, chips, periods, metric captions — always mono, always uppercase.

### Named Rules
**The Mono-Means-Data Rule.** JetBrains Mono is reserved for anything numeric, dated, or systemic (metrics, periods, role numbers, nav-brand mark). It never appears in prose copy.

## Layout

Content is constrained to a `min(1180px, calc(100% - 40px))` wrap, centered. The header is a sticky 76px bar with a 3px cobalt "top ribbon" above it. Sections use generous block padding (48–60px) with tighter internal card padding (18–44px depending on density). The career page introduces a two-column timeline grid (`28px` dot track + flexible content column) that collapses to `18px` + content under 680px. Below 980px the header nav wraps under the brand row; below 680px most multi-column grids (fact-strip, case-grid, editorial-grid, contact-card) collapse to a single column.

## Elevation & Depth

The system is flat by default — no drop shadows on cards or buttons at rest. Depth is conveyed through a single soft ambient `--shadow` token (`0 1px 2px rgba(17,17,17,.04), 0 8px 24px rgba(17,17,17,.05)`) reserved for rare floating elements, and otherwise through border + background-step separation (surface sits above background, one border-width apart).

### Named Rules
**The Flat-By-Default Rule.** Cards and buttons rest without shadow. Separation comes from a 1px border and a background-color step, not elevation.

## Shapes

Three radius steps cover the whole system: `8px` (sm — buttons, small badges), `12px` (md — metric tiles), `16px` (lg — cards, panels, image frames). Pills (`999px`) are reserved for the reading-frame chips (Problem → System → User → Business impact) and are the only fully-rounded shape in the system — everything else uses the sm/md/lg step scale.

## Components

### Buttons
- **Shape:** 8px radius (`--radius-sm`), 44px min-height, `0 18px` padding.
- **Primary:** ink background, white text; hovers to cobalt background.
- **Ghost:** surface background, ink text, border; hovers to ink-colored border.

### Chips / Pills
- **Reading-frame pill:** surface background, 1px border, 999px radius, mono uppercase label, 8px/18px padding. Used only for the Problem→System→User→Impact frame on the career page — not a general-purpose tag component.

### Cards / Containers
- **Corner Style:** 16px radius (`--radius-lg`) for cards/panels; 12px for metric tiles.
- **Background:** surface (`#ffffff`) on background (`#f6f6f3`), or background-on-surface for nested tiles (metric tiles sit on `--background` inside a surface card).
- **Shadow Strategy:** none at rest (see Elevation & Depth); `.case-card` and role-toggle rows get a subtle `translateY` + border-color shift on hover instead of shadow.
- **Border:** 1px solid `--border` on all cards.
- **Internal Padding:** 18–44px depending on card density (metric tile 18px, contact-card 44px).

### Accordion (career timeline)
- **Trigger:** full-width button, closed by default, company name (uppercase, Instrument Sans) + title + period on one line separated by mono-rule pipes (`|` in `--border` color).
- **State:** expansion toggles `max-height` with a 0.3s ease transition; the plus/cross icon rotates 90° on expand. Respects `prefers-reduced-motion` (durations collapse to ~0).
- **Track:** a left-hand dot-and-line timeline (cobalt-ringed dot, border-colored connecting line) runs alongside every row.

## Do's & Don'ts

### Do:
- **Do** keep cobalt to single-element usage (links, active state, one dot, one ribbon) — never a fill larger than a button or dot.
- **Do** set anything numeric, dated, or systemic in JetBrains Mono, uppercase, with letter-spacing.
- **Do** separate surfaces with a 1px border + background step, not a shadow.
- **Do** default accordions/expandable content to closed.

### Don't:
- **Don't** introduce a second saturated accent color.
- **Don't** add drop shadows to cards or buttons at rest — flat is the rule, translateY/border-color is the hover language.
- **Don't** use pastel fills, illustration devices, or decorative chips outside the reading-frame pill — that direction was explicitly rejected in favor of this system.
