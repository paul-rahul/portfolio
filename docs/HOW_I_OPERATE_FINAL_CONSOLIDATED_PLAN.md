# How I Operate — Final Consolidated Integration Plan

## Goal

Replace every prior failed/experimental “How I operate” implementation with the six final SVG assets shipped in this package.

Final project paths:

```text
src/assets/how-i-operate/
├── how-i-operate-desktop-dark.svg
├── how-i-operate-desktop-light.svg
├── how-i-operate-tablet-dark.svg
├── how-i-operate-tablet-light.svg
├── how-i-operate-mobile-dark.svg
└── how-i-operate-mobile-light.svg
```

These are the final visual source of truth.

Do not rebuild any part of the infographic in CSS.
Do not alter SVG coordinates during integration.
Do not recolor SVG internals with CSS.
Do not reuse older SVG copies already in the repository.

The final process is:

```text
01 → 02 → 03 → 04 → 05
```

and the feedback loop is:

```text
05 → 01
```

with exactly one feedback-loop arrowhead at 01.

---

## 1. Create a new parent branch

Start from the current implementation branch.

```bash
git status
git branch --show-current
```

If there are uncommitted changes:

```bash
git stash push -u -m "WIP before final How I Operate consolidation"
```

Create:

```bash
git checkout -b fix/how-i-operate-final-consolidated
```

All phases must happen in child branches and merge back into this parent.

Create:

```text
fix/how-i-operate-final-audit
fix/how-i-operate-final-revert
fix/how-i-operate-final-assets
fix/how-i-operate-final-integration
fix/how-i-operate-final-a11y-motion
fix/how-i-operate-final-qa
fix/how-i-operate-final-docs
```

After each phase:

```bash
git checkout fix/how-i-operate-final-consolidated
git merge --no-ff <child-branch>
```

Never merge a child branch directly into `main`.

---

## 2. Audit prior “How I operate” work

Create:

```bash
git checkout -b fix/how-i-operate-final-audit
```

Read:

- `AGENTS.md`
- `CLAUDE.md`
- `DESIGN.md`
- `docs/RESPONSIVE_AUDIT.md`

Inspect:

```bash
git log --oneline --decorate -100
git reflog -100
git log -p -- src/pages/career/index.astro
git log -p -- src/components
git log -p -- src/styles
git log -p -- src/assets
git log -p -- DESIGN.md
```

Identify every recent change introduced specifically by earlier “How I operate” instructions.

Do not blindly revert the last N commits.

Preserve unrelated Career work:

- desktop 30/70 Career explorer;
- tablet/mobile employer accordions;
- project switching;
- nested accordions;
- hashes/deep links;
- Career content;
- navigation;
- theme system;
- unrelated responsive fixes.

Document the infographic-specific commits/files/hunks.

Merge the audit branch back into parent.

---

## 3. Revert only the failed infographic implementations

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-revert
```

Restore the “How I operate” area to the state before the first failed infographic implementation while preserving unrelated newer Career work.

If an infographic attempt is an isolated commit:

```bash
git revert <sha>
```

Revert newest-to-oldest.

If a commit mixes unrelated changes:

- do not revert the whole commit;
- surgically restore only the infographic hunks.

Search:

```bash
git grep -n "how-i-operate"
git grep -n "operate-svg"
git grep -n "operating-"
git grep -n "feedback-loop"
```

Remove stale previous-attempt code, including:

- CSS-generated process layouts;
- CSS arrows/circles;
- prior inline SVGs;
- prior external SVGs;
- older raw-SVG imports;
- duplicate breakpoint wrappers;
- old feedback-loop overlays;
- old arrow-marker helpers;
- old infographic-only theme overrides;
- obsolete infographic-only motion code.

Do not remove shared utilities.

Run:

```bash
npm run build
npm run astro -- check
```

Merge back into the parent.

---

## 4. Install the final six assets

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-assets
```

Copy the package's:

```text
src/assets/how-i-operate/
```

directory into the repository at the exact same path.

Replace every older SVG at that location.

Do not edit the six SVG files during this step.

Merge back into parent.

---

## 5. Heading rule

All final SVGs contain the process graphic only.

Render one normal HTML section heading outside the SVG:

```text
How I operate.
```

Use the existing portfolio heading styles.

There must be exactly one visible heading at desktop, tablet, and mobile.

Do not insert a second heading into any SVG.

---

## 6. Integrate the SVGs as raw inline assets

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-integration
```

Use Astro/Vite `?raw` imports:

```astro
---
import desktopDark from "../../assets/how-i-operate/how-i-operate-desktop-dark.svg?raw";
import desktopLight from "../../assets/how-i-operate/how-i-operate-desktop-light.svg?raw";

import tabletDark from "../../assets/how-i-operate/how-i-operate-tablet-dark.svg?raw";
import tabletLight from "../../assets/how-i-operate/how-i-operate-tablet-light.svg?raw";

import mobileDark from "../../assets/how-i-operate/how-i-operate-mobile-dark.svg?raw";
import mobileLight from "../../assets/how-i-operate/how-i-operate-mobile-light.svg?raw";
---
```

Adjust paths based on the actual component location.

Render the SVG strings as trusted local markup.

Do not modify internal SVG elements in the Astro template.

---

## 7. Breakpoint mapping

Use the current responsive contract:

```text
Desktop: >980px
Tablet: 681–980px
Mobile: ≤680px
```

Exactly one breakpoint asset must be visible.

Do not use JS for viewport switching.

Do not scale desktop down to tablet.

Do not scale tablet down to mobile.

---

## 8. Theme mapping

Use the site's current theme state.

Exactly one theme asset must be visible:

```text
Dark → *-dark.svg
Light → *-light.svg
```

Do not recolor one asset at runtime.

Do not override SVG fill/stroke from CSS.

---

## 9. Wrapper CSS only

Allowed:

```css
.how-i-operate-asset {
  display: none;
  width: 100%;
  min-width: 0;
}

.how-i-operate-asset svg {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
```

CSS must not alter:

- SVG `viewBox`;
- internal coordinates;
- internal font size;
- fill/stroke;
- circle radius;
- icons;
- arrows;
- feedback path;
- feedback pill.

Never use:

```css
transform: scale(...);
zoom: ...;
height: 100%;
object-fit: cover;
```

Do not crop the SVGs.

---

## 10. Final breakpoint-specific requirements

### Desktop

Asset geometry is based on the approved 2048×369 target.

Must show:

- five large circles;
- long four-step horizontal arrows;
- 01–05 above circles;
- titles below;
- wide shallow dotted feedback loop;
- return direction 05 → 01;
- exactly one return arrowhead at 01;
- no stray dot;
- no duplicate/mid arrow.

### Tablet

Asset geometry is based on the approved 1462×510 target.

Must show:

- five large circles in a single row;
- four horizontal arrows;
- `Align / the team` on two lines;
- large return loop beneath the process;
- centered feedback pill;
- 05 → 01;
- exactly one return arrowhead.

### Mobile

Must show:

```text
01
↓
02
↓
03
↓
04
↓
05
```

Exactly four downward arrows.

Return path:

```text
05 → left dotted loop → 01
```

Rules:

- one return arrowhead at 01;
- no arrowhead at 05;
- no midpoint arrow;
- no duplicate arrow;
- no endpoint dot;
- feedback label stays in the left loop.

---

## 11. Preserve current design system

Do not alter:

- global `.wrap`;
- PageHero;
- header;
- navigation;
- Career employer layout;
- global typography system;
- existing responsive shell.

Use current site spacing tokens around the SVG section.

Day/Night visual consistency is handled by the separate theme assets.

If a design-system documentation update is necessary, make it in `DESIGN.md`.

---

## 12. Accessibility

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-a11y-motion
```

Mark visual SVG wrappers:

```html
aria-hidden="true"
```

Expose one semantic representation:

```html
<h2 class="sr-only">How I operate</h2>

<ol class="sr-only">
  <li>Understand the system</li>
  <li>Find the constraint</li>
  <li>Align the team</li>
  <li>Ship</li>
  <li>Measure</li>
  <li>Seek feedback and iterate back to Understand the system</li>
</ol>
```

Use the existing visually-hidden utility.

Do not expose six duplicate SVGs to screen readers.

---

## 13. Motion

Use wrapper-level reveal only.

Allowed:

- opacity;
- small translateY;
- current viewport reveal utility.

Do not animate internal SVG elements.

Under `prefers-reduced-motion: reduce`, show immediately.

Merge back into parent.

---

## 14. Validate raw SVGs first

Before reviewing the Career page, open all six SVG files directly.

Verify:

### Desktop
- 5 circles;
- 4 forward arrows;
- correct titles;
- wide lower return loop;
- one return arrow at 01;
- no duplicate arrow;
- no endpoint dot.

### Tablet
- 5 circles;
- 4 forward arrows;
- titles match target wrapping;
- large lower loop;
- centered feedback pill;
- one return arrow.

### Mobile
- 4 downward arrows;
- all arrows point down;
- left return loop from 05 to 01;
- one return arrowhead only;
- no duplicate arrow;
- no dot.

If a raw SVG itself is wrong, stop and fix the SVG only.

Do not compensate with CSS.

---

## 15. Responsive QA

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-qa
```

Test:

### Desktop

```text
1440
1280
1024
981
```

### Tablet

```text
980
900
834
768
681
```

### Mobile

```text
680
430
412
390
375
360
```

At each width verify:

- exactly one breakpoint SVG visible;
- exactly one theme SVG visible;
- no clipping;
- no horizontal overflow;
- aspect ratio remains correct;
- Career content below flows naturally;
- all Career interactions remain functional.

Run:

```js
document.documentElement.scrollWidth ===
document.documentElement.clientWidth
```

Must return:

```text
true
```

---

## 16. Target comparison gate

Capture:

```text
Desktop: 1440px
Tablet: 768px
Mobile: 375px
```

Compare side-by-side against the approved target references.

Check desktop:

- circle size;
- arrow lengths;
- title placement;
- shallow return loop;
- pill position.

Check tablet:

- circle scale;
- title wrapping;
- lower-loop depth;
- centered pill.

Check mobile:

- four arrows all point downward;
- return arrow terminates at 01.

If the raw SVG is right but integrated result differs:
- fix wrapper/integration only;
- do not change SVG geometry to compensate for CSS.

---

## 17. Theme QA

At:

```text
1440
768
375
```

toggle:

```text
Day → Night → Day
```

Verify:

- correct theme asset appears;
- geometry does not change;
- hidden variants reserve no space;
- no overlap;
- no runtime recoloring.

---

## 18. Live-resize QA

Without refresh:

```text
1440
→ 1024
→ 981
→ 980
→ 768
→ 681
→ 680
→ 430
→ 375
→ 768
→ 1024
→ 1440
```

Verify correct asset selection at every transition.

No stale asset.
No overlap.
No refresh required.

---

## 19. Career regression QA

Verify:

- desktop Career 30/70 explorer;
- tablet/mobile employer accordions;
- project switching;
- nested project accordions;
- deep links/hashes;
- navigation;
- theme toggle.

Do not modify these features.

Merge QA into parent.

---

## 20. Update DESIGN.md

Create:

```bash
git checkout fix/how-i-operate-final-consolidated
git checkout -b fix/how-i-operate-final-docs
```

Document:

### Final asset paths

```text
src/assets/how-i-operate/how-i-operate-desktop-dark.svg
src/assets/how-i-operate/how-i-operate-desktop-light.svg
src/assets/how-i-operate/how-i-operate-tablet-dark.svg
src/assets/how-i-operate/how-i-operate-tablet-light.svg
src/assets/how-i-operate/how-i-operate-mobile-dark.svg
src/assets/how-i-operate/how-i-operate-mobile-light.svg
```

### Breakpoints

```text
>980px → desktop
681–980px → tablet
≤680px → mobile
```

### Themes

```text
Dark → dark asset
Light → light asset
```

### Heading ownership

The visible `How I operate.` heading is external HTML.

### Ownership rule

SVG owns:

- process geometry;
- typography within the graphic;
- icons;
- circles;
- arrows;
- feedback path;
- feedback pill.

CSS owns only:

- breakpoint visibility;
- theme visibility;
- wrapper width;
- outer spacing.

### Accessibility

Visual SVGs hidden from assistive technology.
One semantic process list exposed.

### Motion

Wrapper-level reveal only.

Merge docs back into parent.

---

## 21. Final validation

On parent:

```bash
git checkout fix/how-i-operate-final-consolidated
npm run build
npm run astro -- check
```

Both must pass.

---

## 22. Local review server

Remain on:

```text
fix/how-i-operate-final-consolidated
```

Start the Astro dev server in background mode according to `AGENTS.md`.

Read the actual port from the server output.

Do not assume port 4321.

Share the exact local Career URL:

```text
http://localhost:<actual-port>/career
```

Leave the server running.

---

## 23. Approval gate

STOP HERE.

Do not:

- update project memory;
- create the final PR;
- merge to `main`;
- delete task branches.

Wait for explicit user approval.

If revisions are requested:

1. create a new child branch from the parent;
2. edit only the relevant SVG for geometry issues;
3. edit only wrapper/breakpoint/theme integration for integration issues;
4. merge child branch into parent;
5. rerun 1440 / 768 / 375 QA;
6. rerun Day/Night QA;
7. leave dev server running;
8. share URL again;
9. wait for approval.

---

## 24. After explicit approval

Only after approval:

### Update project memory

Follow `CLAUDE.md`.

Record:

- final six SVG assets;
- breakpoint mapping;
- theme mapping;
- external HTML heading;
- raw-inline rendering;
- SVG-owned geometry;
- mobile arrow behavior;
- accessibility;
- wrapper-level motion.

### Final checks

```bash
npm run build
npm run astro -- check
```

### Raise PR

```text
head: fix/how-i-operate-final-consolidated
base: main
```

PR summary must include:

- reverted earlier failed infographic implementations;
- preserved unrelated Career work;
- installed final six breakpoint/theme SVGs;
- corrected desktop geometry;
- corrected tablet geometry;
- corrected mobile arrows;
- verified Day/Night and responsive switching;
- updated accessibility;
- updated DESIGN.md.

### Merge

Merge only after checks pass.

### Cleanup

After successful merge:

```bash
git checkout main
git pull
```

Delete:

- all child task branches;
- local `fix/how-i-operate-final-consolidated`;
- remote `fix/how-i-operate-final-consolidated`;
- remote child branches if pushed.

Do not delete unrelated pre-task stashes automatically.

---

# Definition of done

Complete only when:

- previous failed infographic code is removed;
- unrelated Career work remains intact;
- all six final SVG assets are installed;
- desktop matches approved desktop target;
- tablet matches approved tablet target;
- mobile arrows are correct;
- exactly one external visible heading;
- forward flow is 01 → 02 → 03 → 04 → 05;
- feedback loop is 05 → 01;
- exactly one feedback-loop arrowhead;
- no duplicate arrows;
- no stray dots;
- Day mode works;
- Night mode works;
- no horizontal overflow;
- Career interactions remain intact;
- DESIGN.md updated;
- build/check pass;
- local review URL shared;
- user explicitly approves;
- memory updated only after approval;
- PR merged;
- task branches removed after successful merge.
