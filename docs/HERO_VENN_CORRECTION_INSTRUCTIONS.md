# Hero Venn Diagram — Corrective Implementation Instructions

## Purpose

Correct the current homepage hero Venn diagram implementation so it matches the previously approved visual composition much more closely.

The current implementation is structurally valid but visually incorrect.

This task is a **targeted correction pass**, not a redesign.

---

# 1. Current problems to fix

The current implementation has the following issues:

1. The three circles are too unevenly positioned.
2. The Business circle sits too high relative to the approved composition.
3. The Engineering label is too close to the overlap area.
4. The Design label is also too close to the overlap area.
5. The Business label is too close to the center overlap.
6. The center dot is too large.
7. The center dot is not visually centered within the true three-way overlap.
8. The arrow is far too large and too thick.
9. The arrow dominates the diagram instead of acting as a subtle annotation.
10. The arrow path crosses too much of the diagram.
11. “This is me” overlaps the arrow.
12. “This is me” sits too low and too close to the Business circle.
13. The handwritten label and arrow do not form a clean visual unit.
14. The overall composition is no longer visually balanced.

The goal is to restore the clean, balanced arrangement from the approved mockup.

---

# 2. Branch workflow

Start from the latest branch containing the current implementation.

Create a correction parent branch:

```bash
git checkout <current-feature-branch-or-main>
git pull
git checkout -b fix/hero-venn-composition
```

All correction stages must use child branches and merge back into:

`fix/hero-venn-composition`

Suggested child branches:

- `fix/hero-venn-geometry`
- `fix/hero-venn-labels`
- `fix/hero-venn-center-annotation`
- `fix/hero-venn-responsive`
- `fix/hero-venn-theme-motion`
- `fix/hero-venn-docs-qa`

Do not merge child branches directly to `main`.

---

# 3. Preserve the approved visual hierarchy

The intended composition is:

```text
        ENGINEERING             DESIGN

          ( upper-left circle ) ( upper-right circle )


                  •  <-- shared 3-way overlap
                       curved arrow
                         This is me


                    BUSINESS
                 ( lower circle )
```

More specifically:

- Engineering circle = upper-left
- Design circle = upper-right
- Business circle = lower-center
- upper circles overlap each other significantly
- lower circle overlaps both upper circles
- the exact triple-overlap region sits near the visual center of the card
- Business circle should extend substantially below the triple-overlap
- the top two circles should extend substantially above the triple-overlap

The diagram should visually resemble a balanced three-circle Venn layout.

---

# 4. Geometry correction

Create:

`fix/hero-venn-geometry`

## 4.1 Circle sizing

All three circles should use the **same diameter**.

Do not independently size the three circles.

Use a shared responsive circle-size token/value.

Example concept:

```css
--venn-size: clamp(...);
```

All three circles should reference the same size.

## 4.2 Circle positioning

The preferred geometry is approximately:

- Engineering circle center: left / upper
- Design circle center: right / upper
- Business circle center: centered / lower

The two upper circles should have symmetrical vertical positioning.

The Business circle should be horizontally centered between them.

Do not place the Business circle so high that its center is near the triple-overlap.

The Business circle center must sit clearly below the center of the two upper circles.

## 4.3 Triple-overlap position

The triple-overlap should sit slightly above the visual center of the overall diagram.

It must have enough room for:

- a small dot
- a short arrow
- nearby annotation

The triple-overlap must not collapse into a very narrow sliver.

## 4.4 Card padding

Maintain generous space between circle edges and the outer rounded container.

No circle should visually touch or nearly touch the card border.

---

# 5. Label placement correction

Create:

`fix/hero-venn-labels`

The three labels must sit inside their own circles, away from the triple-overlap.

## 5.1 ENGINEERING

Use the previously approved Engineering placement as the reference.

It should be:

- centered within the left circle horizontally
- placed around the middle-left / central region
- clearly away from the shared intersection

Do not place Engineering over any circle-crossing line.

## 5.2 DESIGN

Design should visually mirror Engineering.

It must:

- sit well inside the right circle
- move farther right than the current implementation
- remain inward from the outer circle boundary
- not overlap the triple-overlap area
- not sit on top of a circle intersection line

The rule is:

> DESIGN should occupy the same relative position inside the right circle that ENGINEERING occupies inside the left circle.

Use symmetrical positioning wherever possible.

## 5.3 BUSINESS

Business should sit:

- inside the lower circle
- slightly above the lower circle's geometric center
- clearly below the triple-overlap
- away from the dot
- away from the arrow
- not on a circle boundary

The label should have its own breathing room.

Do not push BUSINESS close to the center just to make space for the annotation.

---

# 6. Center dot correction

Create:

`fix/hero-venn-center-annotation`

## 6.1 Dot size

Reduce the dot significantly.

The current dot is too dominant.

The dot should be a visual marker, not a fourth major shape.

Target appearance:

- small
- clean
- clearly visible
- approximately the visual scale of a status indicator / accent point

Do not give it a large halo.

A very subtle glow is acceptable.

## 6.2 Dot position

The dot must sit at the perceived center of the three-way overlap.

Do not position it manually based only on card center coordinates.

Position it relative to the actual Venn geometry.

---

# 7. Arrow correction

The arrow requires a major reduction.

## 7.1 Arrow size

The current arrow is much too large.

Replace it with a short, elegant curved arrow.

The arrow should:

- begin near the “This is me” label
- curve gently toward the dot
- occupy only the immediate center-right area
- not travel across a large portion of the Business circle
- not cross the Business label
- not cross the Design label
- not dominate the composition

## 7.2 Arrow thickness

Reduce stroke thickness substantially.

Use a thin-to-medium accent stroke consistent with the circle outlines.

The arrow should be slightly stronger than the rings if needed, but never dramatically thicker.

## 7.3 Arrowhead

Use a small arrowhead.

Avoid:

- oversized triangular arrowheads
- thick marker-style arrows
- cartoonish proportions

## 7.4 Arrow curve

The preferred curve:

- starts to the right of the dot
- bends gently leftward
- terminates cleanly at the dot

The arrow should feel handwritten/editorial rather than diagrammatic.

---

# 8. “This is me” correction

Keep the approved handwritten/script font.

Do not switch back to the bold sans-serif treatment.

## 8.1 Placement

Place “This is me”:

- to the right of the center overlap
- slightly above the arrow's origin
- clearly separated from the arrow stroke
- inside the right-circle / center-right negative space
- above the Business label
- not too close to the Design label

It should not overlap:

- arrow
- circle border
- Business label
- Design label

## 8.2 Size

The text should be visually prominent but smaller than the circle labels plus diagram itself.

Do not scale it so large that it becomes the main focal point.

The dot remains the focal point.

## 8.3 Visual relationship

Treat:

- dot
- arrow
- “This is me”

as one annotation system.

The intended reading order is:

`This is me → arrow → center dot`

---

# 9. Responsive implementation

Create:

`fix/hero-venn-responsive`

The desktop version should match the approved layout most closely.

Test at:

- 1440px
- 1280px
- 980px
- 768px
- 430px
- 390px
- 375px

## Desktop

Maintain:

- symmetrical upper circles
- centered lower circle
- clean label spacing
- short arrow
- annotation to the right of center

## Tablet

Scale all elements proportionally.

Do not independently shrink the arrow, labels, and circles without preserving their relative composition.

Use shared responsive variables where possible.

## Mobile

On mobile:

- reduce circle diameter proportionally
- reduce label font sizes with `clamp()`
- shorten arrow further
- reduce annotation font size
- preserve label separation
- preserve dot visibility
- avoid horizontal overflow

The annotation may move slightly upward/rightward if needed.

Do not:

- move labels into overlap regions
- stack circle labels outside the circles
- remove the center annotation
- distort circle proportions

---

# 10. Implementation approach

Prefer a single bounded diagram coordinate system.

Recommended approaches:

### Option A — SVG

A single responsive SVG is preferred if it provides better geometry control.

Advantages:

- exact circle centers
- exact overlap positioning
- consistent arrow path
- scalable labels
- predictable responsive behavior

If using SVG:

- use `viewBox`
- preserve aspect ratio
- use CSS variables for theme colors
- avoid hard-coded dark-only colors

### Option B — CSS positioned circles

Acceptable only if the existing implementation is already clean.

If using CSS:

- use one shared relative container
- use percentage-based circle positions
- use a shared circle diameter
- avoid large collections of independent hard-coded pixel offsets

The primary goal is geometric stability.

---

# 11. Theme consistency

Create:

`fix/hero-venn-theme-motion`

Both Day and Night modes must retain identical geometry.

Only semantic colors should change.

## Night mode

Use:

- dark surface
- accent rings
- light labels
- accent dot/arrow/script text

## Day mode

Use:

- light surface
- accent rings
- dark primary labels
- accent dot/arrow/script text

Do not duplicate layout rules between themes.

---

# 12. Motion correction

Do not change the site's broader motion system.

Only adapt the corrected geometry to existing hero motion.

Preferred entrance:

1. circles converge
2. labels settle
3. dot appears
4. short arrow draws/fades in
5. “This is me” appears

Important:

- do not animate the giant arrow from the current implementation
- use the corrected short arrow
- do not let the annotation move across large distances
- do not add bounce

Under reduced motion, render the final composition immediately.

---

# 13. DESIGN.md update

Create:

`fix/hero-venn-docs-qa`

Update `DESIGN.md` only if necessary.

Document the corrected visual rules:

- equal-sized circles
- symmetrical upper-circle positioning
- centered lower circle
- Engineering and Design labels mirror each other
- Business sits slightly high within the lower circle
- center dot is small
- arrow is short and subtle
- handwritten annotation remains separated from the arrow
- annotation sits right of the center intersection
- geometry remains identical between Day and Night
- responsive scaling preserves relative composition

Do not document the current incorrect implementation.

---

# 14. Visual QA checklist

Before requesting review, compare the implementation directly against the approved reference.

The implementation should pass all of these:

## Circle geometry

- [ ] all three circles same diameter
- [ ] upper circles symmetrical
- [ ] lower circle centered
- [ ] lower circle clearly lower than upper circles
- [ ] triple-overlap visually centered
- [ ] adequate card padding

## Labels

- [ ] Engineering comfortably inside left circle
- [ ] Design comfortably inside right circle
- [ ] Engineering and Design visually mirror each other
- [ ] Business sits above lower-circle center
- [ ] no label sits on an intersection line
- [ ] no label overlaps annotation

## Center annotation

- [ ] dot is small
- [ ] dot is centered in triple-overlap
- [ ] arrow is short
- [ ] arrow stroke is restrained
- [ ] arrowhead is small
- [ ] arrow does not cross Business
- [ ] arrow does not cross Design
- [ ] “This is me” does not overlap arrow
- [ ] “This is me” is right of center
- [ ] handwritten font preserved

## Responsive

- [ ] 1440px correct
- [ ] 1280px correct
- [ ] 980px correct
- [ ] 768px correct
- [ ] 430px correct
- [ ] 390px correct
- [ ] 375px correct
- [ ] no overflow
- [ ] no clipping

## Themes

- [ ] Day correct
- [ ] Night correct

## Motion

- [ ] normal motion correct
- [ ] reduced motion correct

---

# 15. Build and test

Run:

```bash
npm run build
npm run astro -- check
```

Fix all errors before review.

---

# 16. Local review server

Leave the dev server running from:

`fix/hero-venn-composition`

Follow `AGENTS.md` and start Astro in background mode.

Confirm the actual localhost URL from the dev-server status/output.

Do not assume the port.

Share the exact local URL with the user.

Keep the parent correction branch checked out while the user reviews.

---

# 17. Approval gate

Stop after the review server is ready.

Do not:

- update memory
- raise the final PR
- merge to `main`
- delete the correction branch

until the user explicitly approves.

If changes are requested:

1. create another child branch
2. make only the requested correction
3. merge it back into `fix/hero-venn-composition`
4. rerun QA
5. update the local server
6. share the URL again
7. wait for approval

---

# 18. After explicit approval

Only after approval:

## Update memory

Follow `CLAUDE.md`.

Record the final corrected geometry and annotation rules.

## Final validation

```bash
npm run build
npm run astro -- check
```

## Raise PR

Create PR:

- head: `fix/hero-venn-composition`
- base: `main`

Summarize:

- corrected Venn geometry
- corrected label positions
- reduced center-dot size
- corrected arrow scale/path
- corrected handwritten annotation placement
- responsive handling
- Day/Night handling
- reduced-motion handling
- DESIGN.md changes
- QA performed

## Merge and cleanup

After successful merge:

```bash
git checkout main
git pull
```

Delete:

- child correction branches
- `fix/hero-venn-composition`
- corresponding remote branches if pushed

Do not delete branches before confirming the merge succeeded.

---

# Definition of done

The correction is complete only when the hero visually matches the approved reference:

- balanced three-circle geometry
- Engineering and Design mirrored inside their circles
- Business slightly higher in the lower circle
- small center dot
- short curved arrow
- handwritten “This is me” to the right of center
- no overlaps between labels and annotation
- responsive at all supported sizes
- correct in Day and Night modes
- motion remains consistent
- reduced motion works
- build/check pass
- local review URL shared
- user explicitly approves
- memory updated after approval
- PR merged
- correction branches cleaned up
