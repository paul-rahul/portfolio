# Hero Venn Diagram Redesign — Claude Code Implementation Plan

## Objective

Replace the current homepage hero intersection visual with the approved three-circle Venn-style diagram:

- **ENGINEERING** in the upper-left circle
- **DESIGN** in the upper-right circle, positioned inward to visually balance the ENGINEERING label
- **BUSINESS** in the lower circle, positioned slightly higher than the circle's vertical center
- all three circle outlines use the site's existing purple/cobalt accent family
- all three inner labels use the primary white/ink text treatment
- a small accent dot sits at the true shared overlap of all three circles
- a curved accent arrow points toward the dot
- the annotation reads **“This is me”**
- “This is me” uses a handwritten/script-style typeface, matching the approved visual direction

The implementation must preserve the current Astro architecture, responsive behavior, Day/Night themes, accessibility, performance, homepage layout, and existing motion language.

---

# 1. Branch workflow

Start from the latest `main`:

```bash
git checkout main
git pull
git checkout -b feat/hero-venn-redesign
```

This is the parent integration/review branch.

Every phase below must use its own child branch created from the latest `feat/hero-venn-redesign`.

Suggested child branches:

- `feat/hero-venn-baseline`
- `feat/hero-venn-structure`
- `feat/hero-venn-annotation`
- `feat/hero-venn-responsive`
- `feat/hero-venn-motion`
- `feat/hero-venn-theme-accessibility`
- `feat/hero-venn-docs-qa`

After each phase:

```bash
git checkout feat/hero-venn-redesign
git merge --no-ff <child-branch>
```

Do not merge child branches directly into `main`.

---

# 2. Baseline review

Create `feat/hero-venn-baseline`.

Read:

- `AGENTS.md`
- `CLAUDE.md`
- `DESIGN.md`
- `docs/RESPONSIVE_AUDIT.md`
- relevant project memory referenced by `CLAUDE.md`

Review:

- `src/pages/index.astro`
- `src/styles/tokens.css`
- hero-specific styles
- current `.intersection-diagram` / `.intersection-circle` implementation
- current reveal/motion utilities
- current theme tokens

Run:

```bash
npm install
npm run build
npm run astro -- check
```

Verify the existing homepage at ~1440, 1280, 980, 768, 430, 390, and 375px in Day mode, Night mode, and reduced-motion mode.

Confirm no current overflow, clipping, or hero layout regressions.

Merge back into the parent branch.

---

# 3. Rebuild the diagram structure

Create `feat/hero-venn-structure`.

Change the labels from:

- Tech
- Product
- Business

to:

- Engineering
- Design
- Business

Maintain the approved geometry:

- Engineering = upper-left circle
- Design = upper-right circle
- Business = lower-center circle
- clear three-way center overlap

## Ring styling

All three rings should use the same existing purple/cobalt accent treatment.

Do not introduce a new saturated color unless absolutely necessary.

Use:

- consistent ring thickness
- no fill
- no decorative shadow
- only a subtle glow if that is already consistent with the current design system

## Label styling

ENGINEERING, DESIGN, BUSINESS should use the site's existing system/mono label treatment:

- uppercase
- tracked
- primary text/ink color
- not the handwritten font

## Label placement

### ENGINEERING

Treat the approved Engineering position as the visual anchor. Keep it comfortably inset in the left circle.

### DESIGN

Move DESIGN inward so its placement visually mirrors ENGINEERING. It should not sit near the outer-right edge.

### BUSINESS

Position BUSINESS slightly above the literal vertical center of the lower circle, while keeping comfortable space below and avoiding the center annotation.

Merge back into the parent branch.

---

# 4. Add center dot, arrow, and annotation

Create `feat/hero-venn-annotation`.

## Center dot

Add a small accent dot at the visual three-way overlap.

Requirements:

- same accent family
- clearly visible but restrained
- no looping pulse
- only subtle glow if appropriate

## Curved arrow

Add a curved vector arrow pointing toward the dot.

Prefer SVG or CSS/vector construction over a raster image.

The arrow should:

- originate from the right-hand side
- curve gently toward the dot
- use the accent family
- avoid crossing DESIGN
- avoid obscuring BUSINESS
- remain crisp responsively

## “This is me”

Add the annotation:

`This is me`

Use the approved handwritten/script visual treatment:

- expressive but restrained
- lightly italic/cursive
- not a block sans-serif
- not cartoonish

Place it to the right of the overlap, with the arrow connecting it visually to the center dot.

## Font handling

Before introducing a new font:

1. Check whether an appropriate script font already exists in the project.
2. Prefer an existing or lightweight option when visually suitable.
3. If a new font is required:
   - load only the necessary style/weight
   - keep payload minimal
   - use a fallback stack
   - document it in `DESIGN.md`
   - reserve it for this annotation only unless explicitly approved otherwise

Merge back into the parent branch.

---

# 5. Day and Night mode behavior

Create `feat/hero-venn-theme-accessibility`.

## Night mode

Match the approved direction:

- charcoal/dark surface
- purple/cobalt rings
- white/primary labels
- accent center dot
- accent arrow
- accent handwritten annotation

## Day mode

Use semantic tokens instead of hard-coded inversions.

Expected behavior:

- light/surface background
- accent rings
- primary ink labels
- accent dot/arrow/annotation
- same geometry/layout as Night mode

Do not use separate layout logic per theme.

Merge back into the parent branch.

---

# 6. Responsive implementation

Create `feat/hero-venn-responsive`.

Test at minimum:

- 1440px
- 1280px
- 980px
- 768px
- 430px
- 390px
- 375px

## Desktop

Match the approved composition most closely.

## Tablet

Adjust proportionally:

- circle diameter
- label size
- annotation size
- arrow curve
- internal padding

Keep DESIGN visibly inset.

## Mobile

Preserve:

- all three circles
- semantic arrangement
- center dot
- arrow
- “This is me” if legible

If needed:

- shorten the arrow
- move annotation slightly
- scale script text with `clamp()`
- tighten circle spacing proportionally

Do not allow:

- horizontal scrolling
- clipped circles
- label collisions
- annotation collisions

Prefer percentage positioning, relative sizing, and `clamp()` over desktop-only pixel offsets.

Merge back into the parent branch.

---

# 7. Motion integration

Create `feat/hero-venn-motion`.

Integrate with the site's current motion system.

Preferred sequence:

1. circles begin slightly separated
2. circles converge into the final Venn arrangement
3. center dot appears
4. arrow appears/draws
5. “This is me” appears last

Use current motion tokens.

Do not add:

- bounce
- spring overshoot
- continuous floating
- looping pulse
- letter-by-letter animation

For the arrow, a subtle stroke-dash animation or fade/translate is acceptable.

Under `prefers-reduced-motion: reduce`:

- show final circle positions immediately
- show dot immediately
- show arrow immediately
- show annotation immediately

Merge back into the parent branch.

---

# 8. Accessibility

Keep the diagram semantically simple.

If the existing hero copy already communicates the same message, prefer:

```html
aria-hidden="true"
```

If the diagram conveys unique meaning, give the container a concise accessible label such as:

> Engineering, Design, and Business overlap at the center, representing Rahul's cross-functional profile.

Do not expose individual decorative SVG paths to screen readers.

Ensure no decorative element is focusable.

---

# 9. Update DESIGN.md

Create `feat/hero-venn-docs-qa`.

Update `DESIGN.md` with the final implementation.

Document:

- Engineering / Design / Business diagram meaning
- accent treatment for all three rings
- primary text treatment for labels
- Design intentionally inset to balance Engineering
- Business intentionally positioned slightly high
- center dot marking the three-way overlap
- curved arrow + “This is me” annotation
- script font reserved for this annotation
- Day/Night token behavior
- responsive positioning rules
- motion sequence
- reduced-motion fallback

If implementation differs from this proposal, document the actual final behavior.

Merge back into the parent branch.

---

# 10. Final QA

On `feat/hero-venn-redesign` run:

```bash
npm run build
npm run astro -- check
```

Verify the homepage at all target widths in:

- Day mode
- Night mode
- reduced-motion mode

Confirm:

- Engineering placement matches the approved reference
- Design is inset enough
- Business sits slightly higher
- center dot is correctly located
- arrow clearly points to the dot
- handwritten annotation looks correct
- no text/ring collisions
- no clipping
- no overflow
- no layout shift
- no theme regressions

Do not modify unrelated homepage sections during this QA pass.

---

# 11. Local review server

Before requesting approval, leave the dev server running locally from:

`feat/hero-venn-redesign`

Follow `AGENTS.md`.

Start the Astro dev server in background mode using the repository's supported workflow.

Confirm the real local URL from the dev-server output/status.

Do not assume the port.

Share the exact local URL with the user.

Keep the parent branch checked out while review is ongoing.

---

# 12. Approval gate

Stop here.

Do not:

- update project memory
- create the final PR
- merge to `main`
- delete `feat/hero-venn-redesign`

until the user explicitly approves.

If revisions are requested:

1. create a new child branch from the parent
2. implement the revision
3. merge back into the parent
4. rerun QA
5. confirm/restart the local server
6. share the review URL again
7. wait for approval

---

# 13. After explicit approval

Only after approval:

## Update project memory

Follow the memory workflow in `CLAUDE.md`.

Record:

- Engineering / Design / Business hero diagram decision
- label-positioning rules
- center dot + arrow + annotation convention
- script-font choice
- theme behavior
- responsive behavior
- motion behavior

## Final validation

```bash
npm run build
npm run astro -- check
```

## Raise PR

Create a PR:

- head: `feat/hero-venn-redesign`
- base: `main`

PR summary should include:

- redesigned Venn diagram
- revised label placement
- center dot and annotation
- font addition if applicable
- responsive handling
- Day/Night behavior
- motion integration
- reduced-motion handling
- `DESIGN.md` updates
- QA performed

## Merge and cleanup

After checks pass, merge to `main`.

Then:

```bash
git checkout main
git pull
```

Remove:

- local child branches
- remote child branches if pushed
- local `feat/hero-venn-redesign`
- remote `feat/hero-venn-redesign`

Do not delete branches before confirming the merge succeeded.

---

# Definition of done

The task is complete only when:

- hero reads Engineering / Design / Business
- all three rings use the approved accent treatment
- Design is inset to visually balance Engineering
- Business is positioned slightly higher
- the dot accurately marks the three-way overlap
- the arrow clearly points to the dot
- “This is me” uses the approved handwritten treatment
- responsive layouts remain intact
- Day and Night modes both work
- reduced motion works
- motion fits the existing animation system
- `DESIGN.md` reflects the final implementation
- build/check pass
- a local review URL is shared
- the user explicitly approves
- memory is updated only after approval
- PR is raised and merged
- task branches are cleaned up after successful merge
