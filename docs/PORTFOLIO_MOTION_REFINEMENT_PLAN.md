# Portfolio Motion Refinement — Claude Code Implementation Plan

## Objective

Refine the portfolio's existing motion system in two ways:

1. Increase animation durations slightly so motion is more noticeable and polished without making the interface feel slow.
2. Add viewport-triggered section reveal behavior so selected sections animate into view when the user reaches them.

The implementation must preserve the current design system, responsive behavior, accessibility model, Astro architecture, Day/Night themes, and reduced-motion support.

This is a refinement pass, not a redesign.

---

# 1. Branching workflow

Start from the latest `main`:

```bash
git checkout main
git pull
git checkout -b feat/motion-refinement
```

This branch is the parent integration/review branch for the entire task.

Every implementation phase must be developed on its own child branch created from the latest `feat/motion-refinement`.

Example:

```bash
git checkout feat/motion-refinement
git checkout -b feat/motion-timing-refinement
```

After completing and validating that phase:

```bash
git checkout feat/motion-refinement
git merge --no-ff feat/motion-timing-refinement
```

Then create the next child branch from the updated parent branch.

Do not merge child branches directly into `main`.

Suggested child branches:

- `feat/motion-baseline-audit`
- `feat/motion-timing-refinement`
- `feat/viewport-reveals-home`
- `feat/viewport-reveals-career`
- `feat/viewport-reveals-about-built`
- `feat/motion-responsive-accessibility`
- `feat/motion-docs-qa`

If any phase becomes too large, split it further.

---

# 2. Non-negotiable constraints

Maintain the existing technical-editorial design system.

Do not introduce:

- React;
- Framer Motion;
- GSAP;
- another animation framework;
- parallax;
- scroll-jacking;
- looping decorative animation;
- floating/bobbing effects;
- glow effects;
- particles;
- cursor trails;
- marquee motion;
- text scrambling;
- typing effects;
- 3D card tilt;
- new saturated accent colors;
- new shadow-heavy visual treatments.

Continue using:

- Astro;
- CSS transitions/keyframes;
- vanilla JavaScript;
- `IntersectionObserver` where needed;
- existing semantic theme tokens;
- existing motion tokens where possible.

Use `/animate` only for bounded motion tasks with explicit constraints.

---

# 3. Baseline audit

Create `feat/motion-baseline-audit`.

Before making changes:

1. Read `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `docs/RESPONSIVE_AUDIT.md`, and relevant project memory referenced by `CLAUDE.md`.
2. Review current motion implementation in:
   - `src/styles/tokens.css`
   - `src/layouts/BaseLayout.astro`
   - `src/components/Nav.astro`
   - `src/pages/index.astro`
   - `src/pages/career/index.astro`
   - `src/pages/about.astro`
   - `src/pages/built/index.astro`
   - `src/pages/internships/index.astro`
   - any reusable motion utility introduced by the prior implementation.
3. Identify current:
   - motion tokens;
   - transition durations;
   - page-entry behavior;
   - Career firm/project/accordion timings;
   - hover micro-interactions;
   - reduced-motion behavior.
4. Run:

```bash
npm install
npm run build
npm run astro -- check
```

5. Verify at approximately:
   - 1440px;
   - 1280px;
   - 980px;
   - 768px;
   - 430px;
   - 390px;
   - 375px.

6. Verify in:
   - Day mode;
   - Night mode;
   - `prefers-reduced-motion: reduce`.

7. Confirm no:
   - horizontal overflow;
   - layout shift caused by animation;
   - clipped focus outlines;
   - fixed-height text issues;
   - broken sticky behavior;
   - accessibility regressions.

Do not change behavior in this branch unless needed to restore a clean baseline.

Merge this branch into `feat/motion-refinement`.

---

# 4. Refine animation timing

Create `feat/motion-timing-refinement`.

The goal is to make animation slightly more noticeable without making interactions feel delayed.

## 4.1 Motion token adjustment

Review the existing tokens first.

If the current implementation still resembles the original timing system, move approximately toward:

```css
--motion-fast: 180ms;
--motion-base: 280ms;
--motion-enter: 520ms;
--motion-slow: 750ms;
```

These are target ranges, not mandatory literal values.

Recommended practical ranges:

- hover/arrow/nav feedback: `160–200ms`;
- theme-toggle icon motion: `180–220ms`;
- Career project switching: `220–280ms`;
- Career firm switching: `250–300ms`;
- accordions: `280–320ms`;
- section entrances: `450–600ms`;
- hero entrance: `550–700ms`;
- intersection diagram convergence: `700–850ms`.

Do not let high-frequency interaction feedback become sluggish.

## 4.2 Preserve hierarchy through timing

Do not make all animations the same duration.

Maintain:

- micro-interactions = fastest;
- state changes = medium;
- section entrances = slower;
- major hero/diagram sequences = slowest.

## 4.3 Motion distance

Keep movement restrained:

- micro-interaction: `2–4px`;
- section reveal: `10–14px`;
- mobile section reveal: preferably `8–10px`;
- hero: maximum `8–10px`.

Avoid large `30–50px` entrance movement.

## 4.4 Reduced motion

All timing changes must still resolve immediately or near-immediately under `prefers-reduced-motion: reduce`.

Merge this branch into `feat/motion-refinement`.

---

# 5. Build a reusable viewport reveal system

Create a child branch from the parent, e.g. `feat/viewport-reveal-foundation`.

The site should animate selected sections when they come into view.

This is a visual reveal system, not lazy-loading of text/content.

All text and important content must already exist in the DOM.

Use `IntersectionObserver` to trigger CSS state changes.

Recommended behavior:

- trigger when roughly `10–20%` of a section enters;
- optionally use a bottom root margin around `-40px` to `-80px`;
- reveal once;
- stop observing after reveal;
- do not replay when users scroll back and forth.

Example behavioral target:

```js
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  }
);
```

Do not copy this literally if a better implementation already exists.

## 5.1 Default reveal treatment

Use one consistent reveal language:

```css
opacity: 0;
transform: translateY(10px);
```

to:

```css
opacity: 1;
transform: translateY(0);
```

Use shared motion/easing tokens.

## 5.2 Progressive enhancement

If JavaScript fails, important content must still be visible.

Prefer an implementation that only applies hidden/reveal-prep states after JavaScript is known to be active, or otherwise guarantees a safe fallback.

## 5.3 Reduced motion

Under reduced motion:

- render content visible immediately;
- remove transform offset;
- remove delayed opacity;
- never leave content hidden because JavaScript did not animate it.

Merge this foundation branch into `feat/motion-refinement`.

---

# 6. Homepage viewport reveals

Create `feat/viewport-reveals-home`.

Use section-level reveals by default.

Only use item-level stagger when sequence adds meaning.

## 6.1 Quick Facts

When the section enters view:

- reveal the strip as a group;
- optionally use a very small stagger across items;
- do not animate numeric values from zero.

## 6.2 Capabilities

Use item-level stagger because the sequence aids scanning.

Order:

1. section heading;
2. capability 01;
3. capability 02;
4. capability 03;
5. capability 04.

Suggested stagger: `60–90ms`.

## 6.3 Selected Projects

Reveal:

- section heading;
- project card group;
- minimal stagger between cards if useful.

Do not stack heavy entrance animation on top of existing hover behavior.

## 6.4 Closing CTA

Use one simple section reveal.

Do not independently animate every child element.

## 6.5 Hero

Do not convert the hero into viewport-triggered reveal.

Keep its existing page-load sequence because it is above the fold.

Merge this branch into `feat/motion-refinement`.

---

# 7. Career viewport reveals

Create `feat/viewport-reveals-career`.

The Career page already has state-change animations.

Do not create conflicts between scroll reveals and firm/project transitions.

## 7.1 Operating Model

Use viewport-triggered reveal.

Reveal:

1. section heading;
2. Understand the system;
3. Find the constraint;
4. Align the team;
5. Ship;
6. Measure.

Suggested stagger: `60–90ms`.

On mobile:

- keep the vertical stack;
- reduce travel distance;
- do not introduce horizontal movement.

## 7.2 Career Explorer

Reveal the Career explorer container once when it first enters the viewport.

Do not apply generic scroll reveals to every:

- firm card;
- project chip;
- metric tile;
- accordion row.

Those elements already have interaction/state-change behavior.

## 7.3 No replay conflicts

After the explorer has entered view:

- changing firm/project should use only the existing firm/project transition;
- do not rerun the scroll reveal.

Merge this branch into `feat/motion-refinement`.

---

# 8. About and Built viewport reveals

Create `feat/viewport-reveals-about-built`.

## 8.1 About intro

Reveal the media and copy as one composition or a subtle paired reveal.

Keep horizontal travel very small if used.

On mobile:

- if layout stacks, switch to vertical reveal language;
- do not retain opposing horizontal motion merely because desktop uses it.

## 8.2 About editorial cards

Reveal the card group once.

A slight stagger between the two cards is acceptable.

Do not animate each internal heading/paragraph independently.

## 8.3 Built page

Keep the existing page restrained.

Use section-level reveals only.

For future case studies, the same system can support:

- Problem;
- Solution;
- Process;
- Outcome.

Do not create a separate motion language for Built.

Merge this branch into `feat/motion-refinement`.

---

# 9. Internships and Contact

Review these routes as part of the reveal pass.

## Internships

If the existing internship scroll/timeline already provides motion, do not layer a generic reveal on top of it unless there is a clear benefit.

Avoid duplicate motion systems.

## Contact

A single reveal for the primary contact card/container is appropriate.

Do not animate individual contact details separately.

---

# 10. Responsive and accessibility QA

Create `feat/motion-responsive-accessibility`.

Test every timing and reveal change at:

## Desktop

- ~1440px
- ~1280px

## Tablet

- ~980px
- ~768px

## Mobile

- ~430px
- ~390px
- ~375px

At each size, test:

- Day mode;
- Night mode;
- reduced motion;
- keyboard navigation;
- focus-visible states;
- touch behavior;
- scrolling both downward and upward.

Confirm:

- no horizontal overflow;
- no clipped transforms;
- no layout shift;
- no delayed content that makes mobile feel slow;
- no pointer-specific behavior on touch;
- no repeated animation on re-entry;
- no reveal so late that users see blank space;
- no focus-management regressions.

## Mobile-specific rule

Desktop choreography must not be reused blindly after the layout changes.

On mobile:

- reduce reveal travel distance;
- keep timing similar or slightly faster if needed;
- simplify horizontal/paired effects after stacking;
- avoid long cumulative staggers.

Merge this branch into `feat/motion-refinement`.

---

# 11. Day and Night mode verification

All reveal styles must use existing semantic tokens.

Do not hard-code theme-specific animation colors.

Verify:

- opacity transitions read correctly in both themes;
- border/color transitions remain visible;
- navigation and arrow behavior remains legible;
- the theme toggle still feels responsive after timing changes.

Do not create different choreography for Day vs Night.

---

# 12. Update DESIGN.md

Create `feat/motion-docs-qa`.

Update `DESIGN.md` to formally document the refined motion system.

Document:

## Timing

Record the final duration and easing tokens actually implemented.

## Viewport reveal rule

Document that:

- selected sections reveal once on entry;
- content remains present in the DOM;
- reveals trigger before the section is fully visible;
- reveals do not replay;
- section-level animation is preferred;
- item-level stagger is reserved for meaningful sequences.

## Approved stagger use cases

Examples:

- Homepage Capabilities;
- Career Operating Model;
- small groups of project/cards where sequence supports scanning.

## Avoided usage

Do not apply generic reveal to:

- every paragraph;
- every button;
- every metric;
- every accordion row;
- repeated Career state changes;
- components already driven by their own interaction animation.

## Responsive rules

Document:

- reduced transform distance on mobile;
- layout-aware motion;
- no pointer effects on touch;
- no desktop horizontal reveal reused blindly after responsive stacking.

## Reduced motion

Document the final fallback behavior.

If implementation differs from this plan, update `DESIGN.md` to match the final implementation, not the proposal.

Merge this branch into `feat/motion-refinement`.

---

# 13. Final QA

On `feat/motion-refinement` run:

```bash
npm run build
npm run astro -- check
```

Verify:

- `/`
- `/career`
- `/internships`
- `/built`
- `/about`
- `/contact`

Review for:

- timing consistency;
- excessive animation;
- unnecessary stagger;
- delayed interaction;
- reveal trigger timing;
- responsive behavior;
- Day/Night consistency;
- reduced-motion behavior;
- keyboard interaction;
- scroll performance.

Remove any animation that feels unnecessary.

The goal is improved polish, not maximum animation coverage.

---

# 14. Local review server

Before asking for approval, leave the dev server running locally from:

`feat/motion-refinement`

Follow the repository instructions in `AGENTS.md`.

Start the Astro development server in background mode using the project's supported workflow.

Confirm the actual local URL from the dev-server output/status.

Do not assume the port.

Share the exact local URL with the user.

Keep `feat/motion-refinement` checked out while the user reviews the integrated implementation.

---

# 15. Approval gate

Stop after the local review environment is ready.

Do not:

- update project memory;
- create the final PR;
- merge to `main`;
- delete `feat/motion-refinement`

until the user explicitly approves the changes.

If the user asks for revisions:

1. create another child branch from `feat/motion-refinement`;
2. implement the revision;
3. merge it back into the parent;
4. rerun QA;
5. confirm the local dev server on the parent branch;
6. share the review URL again;
7. wait for approval.

---

# 16. After explicit approval

Only after approval:

## 16.1 Update project memory

Read the memory workflow in `CLAUDE.md`.

Update relevant project memory with:

- final motion timing changes;
- viewport reveal conventions;
- stagger rules;
- responsive motion decisions;
- intentional exclusions;
- notable implementation choices.

Do not record temporary debugging details.

## 16.2 Final validation

Run:

```bash
npm run build
npm run astro -- check
```

Confirm the parent branch is clean.

## 16.3 Raise PR

Create a PR:

- head: `feat/motion-refinement`
- base: `main`

The PR description should summarize:

- refined timing;
- viewport-triggered reveals;
- homepage changes;
- Career changes;
- About/Built changes;
- responsive behavior;
- Day/Night verification;
- reduced-motion behavior;
- `DESIGN.md` updates;
- QA performed.

## 16.4 Merge

Merge only after checks pass.

## 16.5 Cleanup

After confirming the merge to `main` succeeded:

```bash
git checkout main
git pull
```

Then remove:

- local child branches;
- remote child branches if pushed;
- local `feat/motion-refinement`;
- remote `feat/motion-refinement`.

Do not delete branches before confirming the merge succeeded.

---

# Definition of done

The task is complete only when:

- animation durations are slightly increased without harming responsiveness;
- high-frequency interactions still feel immediate;
- selected sections reveal when entering the viewport;
- reveals happen once;
- content is present in the DOM before reveal;
- reduced-motion users get immediate content;
- mobile choreography is intentionally simplified where needed;
- Day and Night modes both work;
- no horizontal overflow or layout shifts are introduced;
- Career state-change animation does not conflict with scroll reveals;
- `DESIGN.md` reflects the final behavior;
- build/check pass;
- the local review URL has been shared;
- the user explicitly approves;
- project memory is updated after approval;
- a PR is raised and merged to `main`;
- task branches are cleaned up.
