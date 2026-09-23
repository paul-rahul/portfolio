# Career Mobile Inline Employer Accordion — Claude Code Implementation Plan

## Objective

Refactor the **Career page mobile interaction** so that, on compact/mobile widths, tapping an employer card expands that employer's content **directly underneath the card** instead of updating a separate detail area below the full employer list.

Target mobile behavior:

- Employer cards remain stacked vertically.
- Tapping **Dream11** expands Dream11 details immediately below Dream11.
- Samagra, Media.net, and Samsung Research are pushed downward.
- Tapping another employer collapses the current employer and expands the selected employer inline.
- Employer details should include the same existing role/project/metrics/accordion content already used today.
- Do not duplicate or invent content.
- Desktop behavior should remain the current 30/70 Career explorer.
- Tablet behavior should remain intentionally responsive and must not regress.
- The existing project-level accordions inside an employer remain intact.

This is a **responsive interaction refactor**, not a redesign of the Career page.

---

# 1. Branch workflow

Start from the latest `main`:

```bash
git checkout main
git pull
git checkout -b feat/career-mobile-inline-accordion
```

This is the parent integration/review branch for the task.

Every implementation phase must use its own child branch created from the latest parent branch.

Suggested child branches:

- `feat/career-mobile-baseline`
- `feat/career-mobile-structure`
- `feat/career-mobile-interaction`
- `feat/career-mobile-animation`
- `feat/career-mobile-theme-accessibility`
- `feat/career-mobile-responsive-qa`
- `feat/career-mobile-docs-qa`

After each child branch is complete:

```bash
git checkout feat/career-mobile-inline-accordion
git merge --no-ff <child-branch>
```

Then create the next child branch from the updated parent.

Do not merge child branches directly into `main`.

---

# 2. Baseline review

Create:

`feat/career-mobile-baseline`

Before modifying anything:

1. Read:
   - `AGENTS.md`
   - `CLAUDE.md`
   - `DESIGN.md`
   - `docs/RESPONSIVE_AUDIT.md`
   - relevant project memory referenced by `CLAUDE.md`

2. Review:
   - `src/pages/career/index.astro`
   - `src/data/career.ts`
   - `src/styles/tokens.css`
   - current Career explorer styles
   - current Career firm/project interaction JS
   - current accordion interaction JS
   - current motion/reveal utilities

3. Run:

```bash
npm install
npm run build
npm run astro -- check
```

4. Verify current Career behavior at:
   - 1440px
   - 1280px
   - 980px
   - 768px
   - 680px
   - 430px
   - 390px
   - 375px

5. Verify in:
   - Day mode
   - Night mode
   - `prefers-reduced-motion: reduce`

6. Confirm:
   - desktop Career explorer works
   - firm switching works
   - project switching works
   - section accordions work
   - hash/deep-link behavior works
   - keyboard behavior works
   - no horizontal overflow

Do not change behavior in this branch.

Merge back into `feat/career-mobile-inline-accordion`.

---

# 3. Preserve desktop behavior

Before implementing mobile changes, define the breakpoint contract clearly.

## Desktop

For widths **above the compact/mobile breakpoint**, preserve the current interaction:

- left employer pane
- right detail pane
- firm buttons switch the selected firm
- project chips switch projects
- section accordions expand/collapse
- current sticky behavior remains where applicable

Do not redesign desktop Career.

## Mobile / compact

At the established compact breakpoint (currently `≤680px` in `DESIGN.md`):

- employer cards become inline accordion triggers
- employer details render immediately below the corresponding employer card
- only one employer detail is expanded at a time by default
- tapping the currently expanded employer collapses it
- tapping another employer collapses the old one and expands the new one

Do not create a second unrelated mobile interaction pattern.

---

# 4. Restructure mobile markup

Create:

`feat/career-mobile-structure`

The current markup separates:

- `.firm-pane`
- `.firm-detail-pane`

For compact/mobile, the selected employer detail should visually appear inline after the corresponding employer trigger.

## Preferred implementation strategy

Avoid duplicating the full employer/project content in the DOM if possible.

Preferred options:

### Option A — One shared DOM structure with responsive placement

Refactor each firm entry into a wrapper containing:

```text
Employer trigger
Employer detail panel
```

Then use CSS to create:

- desktop: triggers form the left pane and active detail appears in the right pane
- mobile: trigger + corresponding detail remain inline

This is the cleanest option if it can be achieved without breaking desktop semantics.

### Option B — Responsive reparenting

If preserving the current desktop DOM is significantly safer:

- keep one canonical detail panel per employer
- on mobile, move/reparent the active firm's panel directly after its trigger
- on returning above the breakpoint, restore the panel to the desktop detail container

If using this approach:

- do not clone content
- do not duplicate IDs
- do not create duplicate accessible regions
- keep one source of truth

### Avoid

Do not render a complete duplicate mobile copy of every firm detail unless there is no cleaner alternative.

Duplicating the content risks:

- duplicate IDs
- duplicate `aria-controls`
- duplicate project triggers
- duplicate accordion trigger IDs
- inconsistent state
- accessibility problems
- larger DOM

---

# 5. Mobile employer trigger behavior

Create:

`feat/career-mobile-interaction`

At `≤680px`, each employer card becomes the accordion trigger for that employer's entire detail block.

## Trigger behavior

Each employer trigger should expose:

```html
aria-expanded="true|false"
aria-controls="<firm-mobile-panel-id>"
```

Use a visible chevron or plus/minus indicator on mobile.

Recommended interaction:

### Collapsed

```text
Dream11
Product Manager
FEB 2025 — AUG 2025                 ⌄
```

### Expanded

```text
Dream11
Product Manager
FEB 2025 — AUG 2025                 ⌃

[full Dream11 detail inline]
```

## State rules

On mobile:

- initially, either the current selected firm may remain expanded or all may begin collapsed
- prefer keeping the current selected/default firm expanded if that best preserves existing deep-link behavior
- only one employer panel should be expanded at a time
- tapping a different employer:
  1. collapses previous employer
  2. expands selected employer
  3. updates active visual state
  4. updates URL hash
- tapping the expanded employer should collapse it

## Scroll behavior

When a new employer is opened:

- do not jump abruptly to the bottom
- keep the employer card visible
- if necessary, scroll the selected employer header into a comfortable viewport position
- use existing smooth-scroll behavior only if it does not conflict with reduced motion

Do not auto-scroll aggressively.

---

# 6. Inline employer content

The expanded mobile employer panel should show the same content already available on desktop.

Order should remain:

1. firm heading / period
2. role history if applicable
3. project selector
4. active project detail
5. metrics
6. project section accordions

Do not simplify away important content solely for mobile.

Do not invent alternate mobile content.

## Project selector

Project chips/buttons should stay inside the expanded employer panel.

They should remain full-width or stack naturally on mobile.

Do not horizontally force project chips if the current design already stacks them well.

## Metrics

Use the existing responsive metric layout:

- single column on compact/mobile if that is already the design-system rule

Do not compress 3 metric cards into unreadably narrow columns.

## Project-level accordions

Keep the existing project section accordion behavior intact.

This means mobile interaction becomes:

```text
Employer accordion
    ↓
Project selector
    ↓
Project section accordions
```

This nested accordion structure is acceptable as long as hierarchy is visually clear.

---

# 7. Animation behavior

Create:

`feat/career-mobile-animation`

Use the existing motion system.

Do not add a new animation library.

## Employer panel open/close

Use a restrained expand/collapse transition.

Recommended:

- duration: `var(--motion-base)` or the currently approved accordion duration
- opacity + height/grid-template-rows technique
- no spring
- no bounce

The mobile employer expansion should feel consistent with the existing project section accordion animation.

## Firm switching on desktop

Do not remove current desktop firm-switch animation.

## Reduced motion

Under:

```css
@media (prefers-reduced-motion: reduce)
```

employer panels should open/close immediately.

Do not smooth-scroll automatically under reduced motion.

---

# 8. Mobile visual treatment

Maintain the current design system.

Do not introduce new visual language.

## Employer cards

Use existing firm card styles.

For the expanded employer:

- accent border or existing active-state treatment
- optional `--accent-soft` background if already consistent with current active states
- no shadow
- no new saturated color

## Indicator

Use:

- chevron
- plus/minus
- or the existing accordion icon language

Keep it subtle.

Do not introduce large icons.

## Inline panel

Use:

- existing surface
- existing border
- existing radius tokens
- existing spacing scale

Do not visually turn the expanded panel into a completely different component family.

---

# 9. Day and Night mode

Create:

`feat/career-mobile-theme-accessibility`

Use semantic tokens only.

Verify mobile inline employer expansion in:

## Day mode

- background
- surface
- ink
- ink-secondary
- border
- accent
- accent-soft

## Night mode

Same geometry and spacing.

Only semantic colors change.

Do not create separate mobile layout rules for Night mode.

---

# 10. Accessibility

The mobile employer interaction must remain fully accessible.

## Employer triggers

Use real `<button>` elements.

Maintain:

```html
aria-expanded
aria-controls
```

Do not use clickable `<div>` elements.

## Detail panels

Use appropriate region semantics where helpful.

Each panel should have a clear accessible relationship to its employer trigger.

## Keyboard behavior

Verify:

- Tab focuses employer triggers
- Enter/Space opens/closes
- focus remains predictable
- project buttons remain reachable
- nested accordions remain reachable

## Focus

Do not move focus unexpectedly when a firm opens.

If a new firm is expanded, keep focus on the employer trigger unless there is a strong accessibility reason otherwise.

## IDs

Ensure:

- no duplicate IDs
- project accordion `aria-controls` remains unique
- mobile employer panel IDs are unique
- desktop/mobile refactor does not duplicate trigger/panel relationships

---

# 11. Deep-link / hash behavior

Preserve existing firm hash support.

Examples:

```text
/career#dream11
/career#samagra
/career#media-net
/career#samsung
```

On mobile:

- incoming hash should expand the corresponding employer inline
- selected employer card should reflect active/expanded state
- the selected panel should appear immediately after its trigger

On desktop:

- existing hash behavior should remain unchanged

When a mobile employer is selected, keep updating the URL hash through the existing `history.replaceState` behavior.

---

# 12. Breakpoint transitions

Create:

`feat/career-mobile-responsive-qa`

Test resizing across the `680px` breakpoint.

Critical case:

```text
Desktop -> Mobile -> Desktop
```

State should not corrupt.

Verify:

- active firm remains logically selected
- project selection remains intact
- open project accordion state does not duplicate or break
- detail panel returns to the correct desktop container
- no duplicate panel appears
- no stale `aria-expanded`
- no stale `hidden`/`inert`
- no orphaned DOM node

If JS reparenting is used, implement a single reliable breakpoint listener using `matchMedia`.

Avoid running repeated DOM moves on every resize event.

---

# 13. Mobile layout QA

Test at:

- 430px
- 390px
- 375px
- 360px if practical

Verify:

- employer cards fit
- role summaries wrap cleanly
- dates remain readable
- chevron/icon does not overlap text
- expanded detail panel aligns with the card
- no horizontal overflow
- no clipping
- nested accordion content remains readable
- metrics stack correctly
- project chips remain usable
- tap targets are at least ~44px high
- focus outline remains visible

---

# 14. Tablet behavior

Do not accidentally apply the mobile inline accordion to tablet if the intended breakpoint is compact only.

Current system defines:

- Compact: `≤680px`
- Comfortable/tablet: `681–980px`
- Desktop: `≥981px`

Recommended:

- inline employer accordion only at `≤680px`
- keep current single-column Career explorer behavior for `681–980px` unless a visual review proves inline accordion is better there too

Do not broaden the breakpoint without explicit approval.

---

# 15. Update DESIGN.md

Create:

`feat/career-mobile-docs-qa`

Update `DESIGN.md` to document the final mobile Career interaction.

Add/update the Career responsive rules:

## Desktop

- 30/70 firm/detail explorer
- sticky firm pane where applicable
- selected firm updates right detail pane

## Tablet

- current stacked Career explorer behavior remains

## Compact/mobile

- employer cards become inline accordion triggers
- selected employer detail expands directly beneath the selected employer card
- one employer panel open at a time
- nested project selector and section accordions remain inside the expanded employer
- deep-link hash expands the corresponding employer
- no duplicate content
- same data source and detail markup as desktop where possible

## Accessibility

Document:

- `aria-expanded`
- `aria-controls`
- keyboard support
- unique IDs

## Motion

Document:

- employer expansion uses the existing accordion motion language
- reduced motion opens/closes immediately

If implementation differs from this proposal, document the actual final implementation.

---

# 16. Final QA

On:

`feat/career-mobile-inline-accordion`

Run:

```bash
npm run build
npm run astro -- check
```

Verify `/career` at:

- 1440px
- 1280px
- 980px
- 768px
- 680px
- 430px
- 390px
- 375px

Test:

- Day mode
- Night mode
- reduced motion
- keyboard navigation
- mouse
- touch-sized viewport
- direct hash loading
- employer switching
- project switching
- nested section accordion interactions
- resizing across breakpoint

Confirm no regressions to desktop.

---

# 17. Local review server

Before asking for approval, leave the dev server running locally from:

`feat/career-mobile-inline-accordion`

Follow `AGENTS.md`.

Start the Astro development server in background mode using the repository's supported workflow.

Confirm the actual local URL from the dev-server status/output.

Do not assume the port.

Share the exact local URL with the user.

Keep the parent branch checked out while the user reviews the integrated implementation.

---

# 18. Approval gate

Stop here.

Do not:

- update project memory
- create the final PR
- merge to `main`
- delete `feat/career-mobile-inline-accordion`

until the user explicitly approves the implementation.

If revisions are requested:

1. create a new child branch from `feat/career-mobile-inline-accordion`
2. implement only the requested revision
3. merge it back into the parent
4. rerun QA
5. keep/restart the local dev server
6. share the local URL again
7. wait for approval

---

# 19. After explicit approval

Only after approval:

## 19.1 Update project memory

Follow the memory workflow in `CLAUDE.md`.

Record:

- compact/mobile employer inline accordion decision
- breakpoint used
- one-open-employer behavior
- desktop behavior preserved
- tablet behavior preserved
- hash/deep-link behavior
- accessibility conventions
- any DOM reparenting/refactor approach used

Do not record temporary debugging notes.

## 19.2 Final validation

Run:

```bash
npm run build
npm run astro -- check
```

Confirm parent branch is clean.

## 19.3 Raise PR

Create PR:

- head: `feat/career-mobile-inline-accordion`
- base: `main`

PR summary should include:

- mobile inline employer accordion
- preserved desktop explorer behavior
- preserved tablet behavior
- nested project/section accordion behavior
- accessibility
- Day/Night support
- responsive QA
- reduced-motion handling
- `DESIGN.md` updates
- hash/deep-link support

## 19.4 Merge

Merge only after checks pass.

## 19.5 Cleanup

After confirming merge succeeded:

```bash
git checkout main
git pull
```

Then remove:

- local child branches
- remote child branches if pushed
- local `feat/career-mobile-inline-accordion`
- remote `feat/career-mobile-inline-accordion`

Do not delete branches before confirming the merge to `main` succeeded.

---

# Definition of done

The task is complete only when:

- mobile employer cards expand inline
- selected employer detail appears directly beneath that employer
- other employers move down naturally
- only one employer is expanded at a time by default
- tapping a different employer moves the expanded content inline correctly
- project selector remains functional
- nested project accordions remain functional
- desktop Career explorer remains unchanged
- tablet behavior remains intentional
- Day and Night modes both work
- reduced motion works
- keyboard and screen-reader semantics are correct
- deep-link hashes work
- no duplicate IDs or content
- no horizontal overflow
- `DESIGN.md` reflects the final responsive interaction
- build/check pass
- local review URL is shared
- user explicitly approves
- memory updates happen only after approval
- PR is raised and merged
- task branches are cleaned up after successful merge
