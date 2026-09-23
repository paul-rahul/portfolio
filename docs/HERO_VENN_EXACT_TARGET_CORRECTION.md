# Hero Venn Diagram — Exact Correction Instructions for Claude Code

## Goal

Correct the current homepage hero Venn diagram so that it visually matches the **target screenshot (Image 1)** rather than the current corrected implementation (Image 2).

This is a **precision correction**, not a redesign.

Do not reinterpret the composition.

Do not change the overall hero layout.

Do not change the typography system outside this diagram.

Do not introduce new colors or animation styles.

The objective is to reproduce the target proportions, spacing, label placement, dot placement, arrow scale, and annotation placement as closely as possible.

---

# 1. Use a single SVG coordinate system

The current layout is drifting because too many elements are being independently positioned.

Rebuild the diagram as a **single responsive SVG** with one stable coordinate system.

Use:

```html
<svg viewBox="0 0 1000 1000" ...>
```

The SVG should scale responsively with:

```css
width: 100%;
height: auto;
```

Do not separately position circles and annotation using unrelated CSS percentages.

Keep all of the following inside the same SVG coordinate system:

- the three circles
- ENGINEERING label
- DESIGN label
- BUSINESS label
- center dot
- curved arrow
- “This is me”

This is the most important correction.

---

# 2. Match the target circle geometry

Use three equal-size circles.

Target approximate geometry in the `1000 × 1000` viewBox:

```text
Engineering circle
cx = 355
cy = 345
r  = 245

Design circle
cx = 675
cy = 345
r  = 245

Business circle
cx = 515
cy = 650
r  = 245
```

These values are intentionally approximate but should be used as the starting geometry.

The intended visual result is:

- top-left and top-right circles at the same vertical level
- lower circle centered horizontally between them
- lower circle clearly lower than the two upper circles
- generous negative space beneath the upper circles
- three-way overlap near the visual center of the composition
- all circles equal diameter

Do **not** use the current Image 2 geometry where:

- the circles feel too large
- the lower circle rises too high into the top circles
- the labels sit too close to the shared intersection

---

# 3. Match the target label scale

The circle labels in Image 2 are too large.

Reduce them.

Use approximately:

```css
font-size: 22px to 24px;
font-weight: 500 to 600;
letter-spacing: 0.12em to 0.16em;
```

Use the site's current mono/system label font.

Do not make the labels bold display text.

The labels should feel like technical/editorial annotations.

---

# 4. ENGINEERING placement

Image 1 is the reference.

Place ENGINEERING comfortably within the left circle.

Approximate coordinates:

```text
x = 285
y = 350
```

Use:

```text
text-anchor = middle
dominant-baseline = middle
```

The label should:

- sit clearly inside the left circle
- not overlap either intersecting circle boundary
- not drift toward the center overlap
- visually resemble Image 1

Do not move ENGINEERING unless needed for optical centering.

---

# 5. DESIGN placement

The current Image 2 DESIGN placement is too close to the central overlap.

Move it farther right.

Approximate coordinates:

```text
x = 735
y = 355
```

Use:

```text
text-anchor = middle
dominant-baseline = middle
```

The visual rule:

> DESIGN should sit inside the right circle at approximately the same relative inset that ENGINEERING has inside the left circle.

It should not sit near the center line.

It should not sit on or close to an intersecting ring.

---

# 6. BUSINESS placement

The current Image 2 BUSINESS text is too large and too close to the center.

Use the target placement from Image 1.

Approximate coordinates:

```text
x = 515
y = 650
```

This should place BUSINESS slightly above the vertical center of the lower circle.

It must remain:

- clearly below the center dot
- clearly separated from the annotation
- comfortably inside the lower circle

Use the same font size and letter spacing as ENGINEERING and DESIGN.

---

# 7. Center dot

The center dot in Image 1 is much smaller and more restrained than in the earlier broken implementation.

Use approximately:

```text
cx = 515
cy = 475
r  = 11 to 13
```

The dot should:

- sit visually at the center of the three-way overlap
- use the existing accent token
- have at most a very subtle glow
- never pulse continuously

Do not enlarge the dot.

---

# 8. Arrow — exact visual intent

The arrow in Image 1 is:

- short
- thin
- gently curved
- located only in the center-right region
- visually secondary to the circles

It should not travel across the diagram.

Use an SVG path approximately like:

```text
M 690 445
C 650 470, 610 480, 540 475
```

The path should terminate near the dot.

The exact path may be slightly adjusted, but preserve this scale.

## Arrow stroke

Use approximately:

```css
stroke-width: 3px to 4px;
fill: none;
stroke-linecap: round;
stroke-linejoin: round;
```

Do not use a thick marker-like arrow.

## Arrowhead

Use a small SVG marker.

Keep the arrowhead proportional to the line.

Do not use the oversized arrowhead from the original bad implementation.

---

# 9. “This is me” placement

Use the existing approved handwritten/script font.

Do not replace it with sans-serif.

Target placement:

```text
x = 720
y = 435
```

The text should sit:

- to the right of the arrow
- slightly above the arrow's starting point
- within the open negative space of the Design circle
- above the Business label
- below the Design label
- away from the right edge of the card

The text must not overlap the arrow.

The arrow should visually start just to the left/below the phrase and point toward the center dot.

## Text sizing

Use approximately:

```css
font-size: 34px to 40px;
font-weight: normal;
```

Do not make it bold.

The handwritten font itself should provide the emphasis.

---

# 10. Exact hierarchy to preserve

The visual hierarchy should be:

1. Three equal Venn circles
2. Circle labels
3. Center dot
4. “This is me” annotation
5. Arrow

The annotation should attract attention, but it must not overpower the diagram.

Image 2 currently makes the central region too crowded.

Restore the spaciousness of Image 1.

---

# 11. Circle color and stroke

All three rings should use the same existing accent color.

Use the existing semantic accent token.

Do not create separate colors per circle.

Target:

```css
stroke-width: 2.5px to 3px;
fill: none;
```

No heavy glow.

No shadow.

No fill.

---

# 12. Theme handling

The SVG geometry must be identical in Day and Night modes.

Only colors should change through semantic tokens.

## Night mode

- dark surface/card
- accent ring stroke
- light/white labels
- accent dot
- accent arrow
- accent “This is me”

## Day mode

- light surface/card
- accent rings
- primary dark text labels
- accent dot
- accent arrow
- accent “This is me”

Do not maintain separate SVG coordinate sets per theme.

---

# 13. Responsive behavior

The SVG itself should scale proportionally.

Do not reposition every element independently at each breakpoint.

Use the stable `viewBox="0 0 1000 1000"` geometry.

Responsive CSS should control only:

- SVG/container width
- maximum width
- outer card padding
- optional overall scale

Avoid breakpoint-specific coordinate rewrites unless there is a verified mobile collision.

## Desktop

Use the geometry above directly.

## Tablet

Scale the entire SVG proportionally.

Do not move labels relative to circles.

## Mobile

Scale the entire SVG proportionally first.

If the handwritten annotation becomes too small or crowded, allow only a minor adjustment via CSS/SVG variable.

Do not:

- move labels into overlap regions
- change circle proportions
- change circle centers independently
- create a different Venn geometry

---

# 14. Preserve current animations, but bind them to the SVG

Do not redesign animation behavior.

Use the existing motion system.

If circles converge on page load:

- animate the circle `<g>` or SVG elements
- final coordinates must resolve to the exact geometry above

Then:

1. circles settle
2. dot appears
3. arrow appears/draws
4. “This is me” fades in

Under `prefers-reduced-motion: reduce`, render the final SVG immediately.

---

# 15. Visual comparison requirement

Before declaring the task complete, compare the implementation side-by-side with the target screenshot.

The final result should visually match the target in these specific ways:

### Geometry

- [ ] top-left and top-right circles are symmetrical
- [ ] lower circle is centered
- [ ] all circles are equal size
- [ ] lower circle sits clearly lower than the top circles
- [ ] triple overlap is near the visual center

### Labels

- [ ] ENGINEERING is small and comfortably inside the left circle
- [ ] DESIGN mirrors ENGINEERING inside the right circle
- [ ] DESIGN is not near the central intersection
- [ ] BUSINESS is smaller than in Image 2
- [ ] BUSINESS is clearly below the center dot
- [ ] no label crosses a ring

### Center annotation

- [ ] dot is small
- [ ] arrow is short
- [ ] arrow is thin
- [ ] arrow curves from right to left toward the dot
- [ ] “This is me” does not overlap the arrow
- [ ] “This is me” sits in the center-right open space
- [ ] handwritten font is preserved

### Overall

- [ ] composition has the same breathing room as Image 1
- [ ] no part feels crowded
- [ ] annotation does not dominate the diagram
- [ ] no horizontal overflow
- [ ] no clipping

---

# 16. Do not make these changes

Do not:

- increase label font sizes
- move ENGINEERING toward the center
- move DESIGN toward the center
- move BUSINESS upward toward the dot
- enlarge the dot
- thicken the arrow
- lengthen the arrow
- make the arrow cross the Business circle
- place “This is me” on top of the arrow
- change the three circles to different diameters
- create a new visual style

---

# 17. Build and review

Run:

```bash
npm run build
npm run astro -- check
```

Then launch the local dev server from the correction branch according to `AGENTS.md`.

Share the actual localhost URL after confirming it from the dev server output.

Do not merge to `main` yet.

Wait for user confirmation of the visual result before:

- updating memory
- raising the final PR
- merging
- deleting the task branch
