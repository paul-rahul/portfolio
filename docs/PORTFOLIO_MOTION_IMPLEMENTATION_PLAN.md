# Portfolio Motion System — Implementation Instructions

## Goal

Implement a restrained, purposeful motion system across the portfolio website while preserving the existing technical-editorial design language, responsive behavior, accessibility, and both Day and Night modes.

Use the existing Astro + CSS + vanilla JavaScript stack. Do not introduce React, Framer Motion, GSAP, or another animation library unless explicitly approved later.

Use `/animate` in Claude Code only for bounded animation tasks with the constraints in this document.

---

# 1. Branching workflow

Start by creating a dedicated parent branch from the latest `main`:

```bash
git checkout main
git pull
git checkout -b feat/portfolio-motion-system
```

This parent branch is the integration and review branch for the entire task.

Every implementation phase below must be developed in a separate child branch created from the latest state of `feat/portfolio-motion-system`.

Example:

```bash
git checkout feat/portfolio-motion-system
git checkout -b feat/motion-career
```

When that phase is complete and verified:

```bash
git checkout feat/portfolio-motion-system
git merge --no-ff feat/motion-career
```

Then create the next child branch from the updated parent branch.

Do not merge any child branch directly into `main`.

Suggested child branches:

- `feat/motion-foundation`
- `feat/motion-career`
- `feat/motion-home`
- `feat/motion-navigation-theme`
- `feat/motion-about-built`
- `feat/motion-responsive-accessibility`
- `feat/motion-docs-qa`

If any phase becomes too large, split it into smaller branches.

---

# 2. Non-negotiable design constraints

Maintain the existing design system.

Do not:

- introduce new saturated colors;
- add decorative shadows to cards or buttons;
- add parallax;
- add floating/bobbing animations;
- add particles;
- add cursor trails;
- add glowing pointer-follow effects;
- add 3D card tilt;
- add marquee text;
- add typing effects;
- add text scrambling;
- add animated gradients;
- add scroll-jacking;
- add large page wipes;
- add excessive spring/bounce motion.

Motion should explain:

- hierarchy;
- state changes;
- progression;
- causality;
- interactivity.

Motion should not exist merely to make the site feel “dynamic.”

Use the existing cobalt accent and semantic theme tokens.

---

# 3. Motion foundation

Create `feat/motion-foundation`.

Before implementation:

1. Read:
   - `AGENTS.md`
   - `CLAUDE.md`
   - `DESIGN.md`
   - `docs/RESPONSIVE_AUDIT.md`

2. Review:
   - `src/styles/tokens.css`
   - `src/layouts/BaseLayout.astro`
   - `src/components/Nav.astro`
   - `src/pages/index.astro`
   - `src/pages/career/index.astro`
   - `src/pages/about.astro`
   - `src/pages/built/index.astro`
   - `src/pages/internships/index.astro`

3. Run a clean baseline:
   - `npm install`
   - `npm run build`
   - `npm run astro -- check`

4. Verify the existing site at:
   - desktop around 1440px;
   - tablet around 768–980px;
   - mobile around 375–430px;
   - Day mode;
   - Night mode;
   - `prefers-reduced-motion: reduce`.

5. Confirm no horizontal overflow or regressions before changing anything.

Add shared motion tokens to the existing design system.

Recommended tokens:

```css
--motion-fast: 150ms;
--motion-base: 220ms;
--motion-enter: 420ms;
--motion-slow: 650ms;

--ease-out: cubic-bezier(.16, 1, .3, 1);
--ease-standard: cubic-bezier(.2, 0, 0, 1);
```

These values may be refined slightly during implementation, but all animation timing should come from a small shared set of tokens rather than arbitrary component-level values.

Add or update the reduced-motion rule so animations and transitions resolve immediately when appropriate.

Preferred animated properties:

- `opacity`
- `transform`
- `background-color`
- `border-color`
- `color`

Avoid animating layout-heavy properties unless the interaction requires it.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 4. Career page motion

Create `feat/motion-career`.

This is the highest-priority animation phase.

## 4.1 Firm switching

Current firm changes are immediate.

Add a restrained transition when switching employers.

Desired behavior:

- old content fades out briefly;
- new content appears with:
  - `opacity: 0 -> 1`
  - `translateY(6px) -> 0`
- duration approximately `180–220ms`;
- no horizontal slide;
- no spring;
- preserve all current `aria-pressed`, hash synchronization, keyboard behavior, and deep links.

Do not break incoming URLs such as `#cisco`, `#dream11`, etc.

Use `/animate` for this bounded task if useful.

## 4.2 Project switching

Animate project changes inside the selected firm.

Desired behavior:

- subtle crossfade;
- `translateY(4px) -> 0`;
- approximately `160–200ms`;
- slightly faster/lighter than a firm switch.

Maintain existing project selection semantics.

## 4.3 Accordions

Replace the abrupt open/close behavior with a smooth transition.

Requirements:

- preserve `aria-expanded`;
- preserve `aria-controls`;
- preserve keyboard accessibility;
- preserve blank accordion sections;
- do not introduce fixed content heights;
- content should expand/collapse smoothly;
- opacity may accompany expansion;
- duration around `200–250ms`;
- the icon should transition cleanly.

If replacing literal `+` / `–` switching with a rotating plus icon produces a cleaner implementation, that is acceptable, provided accessibility remains unchanged.

Under reduced motion, panels must open and close immediately.

## 4.4 Metric tiles

When a project becomes active:

- metric tiles may fade in;
- optionally use `scale(.98) -> scale(1)`;
- approximately `180–220ms`;
- stagger only very slightly if used.

Do not animate metric numbers by counting from zero.

## 4.5 Operating model

Animate the five-step operating model as a semantic sequence:

1. Understand the system
2. Find the constraint
3. Align the team
4. Ship
5. Measure

When the section first enters the viewport:

- reveal steps sequentially;
- use opacity + a small vertical translation;
- stagger around `60–80ms`;
- run once only;
- do not replay on repeated scrolling.

On mobile, preserve the vertical composition and do not create horizontal or timeline-style motion.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 5. Homepage motion

Create `feat/motion-home`.

## 5.1 Hero entrance

Add a restrained first-load entrance sequence.

Order:

1. headline;
2. lede;
3. CTA buttons;
4. intersection diagram.

Guidelines:

- maximum movement: `8–10px`;
- opacity + transform only;
- no word-by-word or letter-by-letter animation;
- no typing effect;
- no looping;
- total sequence should feel fast and intentional.

Suggested timings:

- item duration around `400–500ms`;
- stagger around `80–120ms`.

Under reduced motion, render everything immediately.

## 5.2 Intersection diagram

The Tech / Product / Business diagram may use one meaningful entrance animation.

Preferred option:

- circles begin slightly separated;
- converge gently into their final overlapping positions;
- total duration around `600–700ms`;
- run once.

Optional desktop-only pointer response:

- each circle may shift by only `2–4px`;
- disable on touch/mobile;
- do not use continuous floating;
- do not create distracting movement.

If pointer interaction does not clearly improve the result, omit it.

## 5.3 Quick fact strip

Reveal the quick facts as a group when entering the viewport.

A tiny stagger is acceptable.

Do not use animated numeric counters.

## 5.4 Capabilities

Reveal the four capability items sequentially:

- opacity;
- `translateY(8px) -> 0`;
- around `350ms`;
- stagger around `60–80ms`.

Run once.

## 5.5 Project cards

Keep the existing flat hover language.

Allowed hover treatment:

- card `translateY(-3px)`;
- slightly stronger border;
- project image/visual `scale(1.015)` if appropriate;
- arrow `translateX(3px)`;
- around `180–220ms`.

Do not add resting shadows.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 6. Navigation and theme motion

Create `feat/motion-navigation-theme`.

## 6.1 Arrow micro-interactions

Apply one shared behavior to links/buttons that contain `ArrowIcon`.

On hover/focus where appropriate:

- move the arrow `3–4px` horizontally;
- duration around `150–180ms`.

The animation must not affect layout width or cause text shift.

## 6.2 Navigation active state

Add a subtle active/hover indicator.

Preferred treatment:

- underline or accent line;
- animate with `scaleX(0) -> scaleX(1)`;
- around `180ms`.

Maintain current responsive nav behavior.

The mobile/tablet horizontally scrollable nav must not clip focus outlines or animated indicators.

## 6.3 Theme toggle

Animate the sun/moon state change.

Allowed behavior:

- current icon scales/rotates out;
- target icon scales/rotates in;
- around `180–220ms`.

For the theme itself, restrict color transitions to:

- background;
- text;
- borders.

Do not create a long full-page crossfade.

Verify both Day -> Night and Night -> Day.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 7. About and Built pages

Create `feat/motion-about-built`.

## 7.1 About page

Keep motion editorial and minimal.

For the intro section:

- portrait/media may enter from approximately `-8px` horizontal offset;
- copy may enter from approximately `+8px`;
- opacity may accompany this;
- keep timing restrained.

For image cards:

- real images may scale very slightly on hover, around `1.02`;
- do not add this effect to placeholders if it makes unfinished media feel overly interactive.

## 7.2 Built page

Do not overbuild animation while content is still sparse.

For the existing page:

- use the standard page-heading/section entrance language only.

For future project case studies:

- Problem;
- Solution;
- Process;
- Outcome

may reveal progressively on scroll using the shared motion system.

Do not introduce a separate visual language just for Built.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 8. Page-level transitions

Page transitions are optional and lower priority.

Implement only after all component-level motion is stable.

If added:

- use Astro-native view transition capabilities where appropriate;
- keep them subtle;
- old page may fade out around `80–100ms`;
- new page may fade/raise in around `180–220ms`.

Do not:

- horizontally slide full pages;
- use dramatic wipes;
- animate large shared elements unnecessarily.

If page transitions introduce complexity, regressions, or accessibility issues, omit them.

---

# 9. Responsive and accessibility QA

Create `feat/motion-responsive-accessibility`.

Test every animation at:

### Desktop
- ~1440px
- ~1280px

### Tablet
- ~980px
- ~768px

### Mobile
- ~430px
- ~390px
- ~375px

For each viewport, test:

- Day mode;
- Night mode;
- reduced motion;
- keyboard navigation;
- focus-visible states;
- touch interactions where relevant.

Confirm:

- no horizontal overflow;
- no animation-induced layout shifts;
- no clipped content;
- no fixed-height text truncation;
- no hidden interactive elements;
- no broken sticky behavior;
- no focus loss when Career content changes;
- no JS-only dependency for understanding content;
- no animation delays that make the site feel slow.

Mobile-specific rule:

Desktop choreography must not be blindly reused where the responsive layout changes structurally.

For example:

- no pointer-tracking motion on touch;
- no horizontal reveal that implies a desktop two-column relationship after content has stacked vertically;
- no excessive stagger that makes long mobile pages feel sluggish.

Merge this child branch into `feat/portfolio-motion-system`.

---

# 10. Update DESIGN.md

Create `feat/motion-docs-qa`.

Update `DESIGN.md` to formally document the motion system.

Add a dedicated Motion section covering:

## Motion principles

- motion explains hierarchy, state, or progression;
- motion is restrained;
- no decorative continuous motion;
- no scroll-jacking;
- no heavy parallax;
- animation must work in both themes;
- reduced motion is mandatory.

## Motion tokens

Document the final approved duration/easing values.

## Component rules

Document:

- hero entrance;
- Career state changes;
- accordion behavior;
- card hover;
- arrow movement;
- nav active state;
- theme toggle;
- scroll reveals.

## Responsive motion rules

Document:

- mobile simplification;
- touch-device behavior;
- no pointer effects on touch;
- no layout-breaking transforms.

## Reduced motion

Document the expected fallback behavior.

If implementation decisions differ from the initial values in this plan, update `DESIGN.md` to reflect the final implementation rather than leaving stale guidance.

---

# 11. Final QA before user review

Still on the parent branch:

`feat/portfolio-motion-system`

Run:

```bash
npm run build
npm run astro -- check
```

Verify all routes:

- `/`
- `/career`
- `/internships`
- `/built`
- `/about`
- `/contact`

Test all supported breakpoints and both themes.

Review for consistency:

- timings;
- easing;
- travel distance;
- stagger;
- hover behavior;
- state transitions;
- reduced-motion behavior.

Remove any animation that feels unnecessary or distracting.

The goal is not to maximize animation coverage.

---

# 12. Local review server

Before asking for approval, leave the dev server running locally from:

`feat/portfolio-motion-system`

Follow the repo instructions in `AGENTS.md`.

Start the dev server in background mode using the project's supported Astro workflow.

Confirm the actual local URL from the dev-server output/status.

Share that URL with the user for review.

Do not assume the port.

The parent branch must remain checked out while the user reviews the integrated implementation.

---

# 13. Approval gate

Stop after the local review environment is ready.

Do not:

- update project memory;
- create the final PR;
- merge to `main`;
- delete the parent task branch

until the user explicitly confirms that the changes are approved.

If the user requests revisions:

1. create another child branch from `feat/portfolio-motion-system`;
2. implement the requested revision;
3. merge it back into the parent;
4. rerun QA;
5. keep the local review server on the parent branch;
6. ask for review again.

---

# 14. After explicit user approval

Only after approval:

## 14.1 Update project memory

Read the memory instructions in `CLAUDE.md`.

Update the relevant project memory files to record:

- the adopted motion system;
- key animation conventions;
- branch/implementation decisions;
- any intentional omissions;
- final design-system rules.

Do not record temporary debugging information.

## 14.2 Final validation

Run:

```bash
npm run build
npm run astro -- check
```

Confirm the parent branch is clean and fully tested.

## 14.3 Raise PR

Create a pull request:

- head: `feat/portfolio-motion-system`
- base: `main`

The PR description should summarize:

- motion foundation;
- Career improvements;
- homepage motion;
- nav/theme micro-interactions;
- responsive behavior;
- Day/Night support;
- reduced-motion behavior;
- `DESIGN.md` updates;
- QA performed.

## 14.4 Merge

Merge only after confirming the PR is ready and checks pass.

## 14.5 Cleanup

After the merge:

- switch back to `main`;
- pull the merged result;
- delete the local parent branch;
- delete the remote parent branch;
- remove any remaining child branches created for the task.

Do not delete branches before confirming that the merge to `main` succeeded.

---

# Definition of done

The task is complete only when:

- motion improves clarity rather than adding decoration;
- Career transitions are polished;
- homepage motion is restrained;
- hover and navigation micro-interactions are consistent;
- Day and Night modes both work;
- responsive layouts remain intact;
- reduced-motion users get a complete experience;
- build/check pass;
- `DESIGN.md` reflects the final system;
- the user has reviewed and explicitly approved;
- project memory has been updated after approval;
- a PR has been raised and merged to `main`;
- task branches have been cleaned up.
