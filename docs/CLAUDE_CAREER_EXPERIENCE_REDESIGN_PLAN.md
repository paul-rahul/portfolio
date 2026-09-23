# Claude Code Execution Plan — Career Page Multi-Firm / Multi-Role / Multi-Project Redesign

## Mission

Redesign the Career page of Rahul Paul's portfolio into a structured, responsive experience that supports:

- multiple firms
- multiple roles within the same firm
- multiple projects within the same firm and/or role
- detailed project content using expandable accordion sections
- desktop, tablet, and mobile layouts
- Day and Night modes
- the existing Technical Editorial design system

This is a Career page information-architecture and interaction redesign, not a wholesale site redesign.

The approved hierarchy is:

```text
Firm
→ Role(s)
→ Project(s)
→ Detailed project content
```

## Approved firm order

Use this order exactly:

```text
1. Cisco
2. Dream11
3. Samagra
4. Media.net
5. Samsung Research
```

Cisco is selected by default.

---

# Desktop layout

For desktop and sufficiently wide tablet/laptop widths use approximately:

```text
30% left pane
70% right pane
```

Use sensible min/max constraints rather than rigidly forcing exact widths when that harms readability.

## Left pane: firm selector

Each firm card should show, where supported by existing data:

- company name
- role summary
- date range
- logo if already available
- selected state
- clear click affordance

Do not invent missing logos, dates, or content.

The left pane may be sticky on desktop if it works cleanly with the current shell.

## Right pane: selected firm

The right pane should contain:

1. firm name
2. current/primary role context
3. dates/location if supported
4. internal role history if multiple roles existed
5. project selector/list
6. selected project details
7. detailed accordion sections

---

# Multiple roles within a firm

Do not create duplicate firm cards for internal promotions or role changes.

Use:

```text
Firm
→ Role history
→ Projects
```

Preferred role-history treatment:

```text
My roles at <Firm>

● Role 1
  Dates
  Short role summary

● Role 2
  Dates
  Short role summary
```

A compact vertical timeline or stacked role history is appropriate.

If projects clearly map to roles, show that association. Do not infer one when the source data does not support it.

---

# Multiple projects within a firm

Within each selected firm show:

```text
Projects at <Firm>
```

Each project selector should include:

- project title
- short descriptor
- dates if supported
- optional role association if useful
- selected state
- clear click affordance

Clicking a project updates the project-detail area without reloading the page.

Do not use invented example projects. Use only repository-supported content.

---

# Project detail structure

Every project should use this consistent structure:

```text
Project title
Short project summary
Optional project visual placeholder

The problem
How I approached it
How the product works
Tools and product decisions
Impact to users
What I learned
```

These sections should be accordions.

## Accordion behavior

Each section has:

- section number
- section title
- `+` / `–` control

Use semantic buttons and:

```text
aria-expanded
aria-controls
```

Default open:

```text
The problem
Impact to users
```

Default collapsed:

```text
How I approached it
How the product works
Tools and product decisions
What I learned
```

This ensures recruiters immediately see the problem and the impact.

---

# Accordion content rules

Do not dump resume bullets verbatim. Reorganize existing supported information into scannable modules.

Do not invent facts.

## The problem

Use, when supported:

```text
Short contextual summary

User challenge
Business impact
Why it mattered
```

## How I approached it

Use, when supported:

```text
Short approach summary

What I prioritized
What I did
Who I worked with
Why this approach
```

## How the product works

Use:

- concise explanation
- product/workflow placeholder where useful

Do not invent architecture.

## Tools and product decisions

Use:

```text
Tools / systems
Product decisions
```

Only list supported tools and systems.

## Impact to users

Make this metric-forward.

Use verified metrics already present in authoritative career data.

If only one or two metrics exist, show one or two. Do not fill empty metric slots with invented numbers.

## What I learned

Keep this concise.

Only include learnings explicitly supported by existing content or written by Rahul.

Do not infer personal lessons.

---

# Image / visual policy

If a real project visual is unavailable, use the existing placeholder system.

Do not:

- source random stock imagery
- generate fake screenshots
- invent dashboards
- invent product flows
- invent architecture diagrams

Update:

```text
VISUAL_ASSETS.md
```

for every new Career visual slot.

Potential slots include:

- project hero screenshot
- product workflow
- dashboard
- launch asset
- technical/system diagram

Do not force an image into every project.

---

# Design system

Maintain the current Technical Editorial system.

Preserve:

- typography hierarchy
- current color philosophy
- current accent behavior
- border/radius/shadow philosophy
- interaction style
- responsive conventions where appropriate
- Day/Night system

Do not reintroduce:

- pastel-heavy layouts
- rainbow treatments
- neon dark mode
- cyberpunk styling
- excessive gradients
- playful floating cards
- cartoonish UI
- decorative clutter

If a reusable design rule changes, update `DESIGN.md` in the same stage.

Changes that may require `DESIGN.md` updates include:

- 30/70 Career layout
- firm selector pattern
- role-history pattern
- project selector
- accordion pattern
- mobile Career behavior
- tablet Career behavior
- responsive breakpoint changes
- visual-placeholder behavior
- new design tokens

---

# Day / Night requirement

Every new component must work in both:

```text
Day
Night
```

Use semantic tokens.

Validate both themes for:

- selected firm state
- selected project state
- role timeline
- accordion borders
- expanded accordion content
- metrics
- placeholders
- focus states
- hover states

---

# Responsive behavior

Do not force the 30/70 desktop layout onto mobile.

## Mobile

Use a single-column flow:

```text
Career intro
Firm list
Selected firm
Role history
Project list
Selected project
Accordion details
```

Firm order remains:

```text
Cisco
Dream11
Samagra
Media.net
Samsung Research
```

Use full-width firm cards/rows.

Do not use nested horizontal scrolling for critical navigation.

Projects should appear as stacked tappable rows.

Accordions work the same way as desktop.

## Tablet

At intermediate widths test:

```text
single-column
```

versus:

```text
35/65
```

Choose based on actual readability.

Do not squeeze the firm pane so hard that role names and dates become unreadable.

## Required test widths

Test at minimum:

```text
320
375
390
430
768
820
1024
1280
1440
1728
1920
```

Test both Day and Night at minimum at:

```text
375
768
1024
1440
```

---

# Accessibility

Ensure:

- firm cards are keyboard-accessible
- project selectors are keyboard-accessible
- accordions use buttons
- ARIA state updates correctly
- focus states remain visible
- selected state does not rely only on color
- touch targets are adequate
- text zoom does not clip content
- sticky areas do not trap focus
- reduced motion is respected

Where practical, preserve deep links such as:

```text
/career#cisco
/career#dream11
```

Do not overhaul routing solely for this feature.

---

# Git workflow

## Create a new integration branch first

Before implementation:

1. Read:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `PRODUCT.md`
   - `DESIGN.md`
   - project memory / `REDESIGN_MEMORY.md`
   - `VISUAL_ASSETS.md`
   - relevant Career data
   - current responsive/theme implementation
2. Identify the latest approved branch containing the current site.
3. Pull latest.
4. Create:

```text
feature/career-experience-redesign
```

Example:

```bash
git checkout <latest-approved-branch>
git pull origin <latest-approved-branch>
git checkout -b feature/career-experience-redesign
git push -u origin feature/career-experience-redesign
```

Do not implement directly on `main`.

---

# Child branch model

Each stage uses its own branch created from the latest:

```text
feature/career-experience-redesign
```

Use:

```text
career/01-audit-and-data-model
career/02-desktop-shell
career/03-role-history
career/04-project-navigation
career/05-project-accordions
career/06-mobile-tablet
career/07-theme-accessibility
career/08-design-documentation
career/09-final-regression
```

Each stage:

```text
child branch
↓ PR
feature/career-experience-redesign
```

Prefer squash merges.

---

# Stage completion workflow

At the end of every stage:

1. Validate locally.
2. Test relevant widths.
3. Test Day.
4. Test Night.
5. Run `npm run build`.
6. Commit stage work.
7. Push child branch.
8. Open PR into `feature/career-experience-redesign`.
9. Review diff.
10. Merge into integration branch.
11. Delete child branch if safe.
12. Checkout integration branch.
13. Pull latest.
14. Re-run local validation.
15. Compact Claude Code context.
16. Re-read:
    - this file
    - `CLAUDE.md`
    - `AGENTS.md`
    - `PRODUCT.md`
    - `DESIGN.md`
    - current project memory
    - `VISUAL_ASSETS.md`
17. Begin next stage.

Do not open stage PRs against `main`.

---

# Memory rule

During implementation stages, do not update canonical project memory as though this redesign is approved.

Temporary implementation notes are fine if needed.

The canonical project memory update happens only after Rahul explicitly approves the final integrated result.

---

# Stage 0 — Baseline

Run:

```bash
npm install
npm run build
npm run dev
```

Verify the current Career page, theme system, and responsive behavior.

Create `feature/career-experience-redesign`.

Do not redesign yet.

---

# Stage 1 — Audit and data model

Branch:

```text
career/01-audit-and-data-model
```

Audit:

- firm data
- roles
- dates
- locations
- metrics
- resume bullets
- projects
- logos
- Career components
- placeholders

Create/adapt a model supporting:

```text
Firm
- roles[]
- projects[]

Role
- title
- dates
- summary

Project
- title
- dates
- role association
- summary
- sections
- metrics
- visuals
```

Enforce approved firm order.

No content invention.

---

# Stage 2 — Desktop shell

Branch:

```text
career/02-desktop-shell
```

Implement:

- ~30% firm selector
- ~70% selected-firm pane
- Cisco selected by default
- firm switching
- keyboard interaction
- stable desktop behavior
- Day/Night support

Do not finish full project accordions yet.

---

# Stage 3 — Role history

Branch:

```text
career/03-role-history
```

Implement reusable multi-role support.

Single-role firms should remain compact.

Multi-role firms should use a clear stacked/timeline treatment.

Associate projects with roles only where supported.

---

# Stage 4 — Project navigation

Branch:

```text
career/04-project-navigation
```

Implement multiple projects per firm.

Each project selector shows supported title/description/date/role context.

Switching projects updates the detail area without reloading.

---

# Stage 5 — Project accordions

Branch:

```text
career/05-project-accordions
```

Implement:

```text
The problem
How I approached it
How the product works
Tools and product decisions
Impact to users
What I learned
```

Open by default:

```text
The problem
Impact to users
```

Use accessible accordion controls.

Map only supported content.

Update `VISUAL_ASSETS.md` for new placeholders.

---

# Stage 6 — Mobile and tablet

Branch:

```text
career/06-mobile-tablet
```

Implement intentional single-column mobile behavior and appropriate tablet layout.

Validate:

```text
320–430
768
820
1024
```

No horizontal overflow or tiny navigation targets.

---

# Stage 7 — Theme and accessibility QA

Branch:

```text
career/07-theme-accessibility
```

Validate:

- Day
- Night
- keyboard
- touch
- hover
- focus
- reduced motion
- text zoom
- firm switching
- project switching
- accordion state
- role history
- placeholders

Test representative widths through 1920px.

---

# Stage 8 — DESIGN.md and system documentation

Branch:

```text
career/08-design-documentation
```

Update `DESIGN.md` with only the rules actually implemented:

- desktop pane behavior
- firm selector
- selected state
- role history
- project navigation
- accordion structure
- default expanded sections
- mobile behavior
- tablet behavior
- placeholder usage
- theme behavior
- interaction/accessibility rules

Verify `VISUAL_ASSETS.md`.

---

# Stage 9 — Final regression

Branch:

```text
career/09-final-regression
```

Verify:

- exact firm order
- Cisco default
- multi-role support
- multi-project support
- all accordion sections
- mobile/tablet/desktop/wide desktop
- Day/Night
- firm switching
- project switching
- accordion expansion
- keyboard interaction
- deep links where supported
- placeholders
- no broken links
- no console errors

Run:

```bash
npm run build
npm run dev
```

Merge Stage 9 into the integration branch, then stop.

---

# Final review gate — Rahul approval required

After every child branch has merged into:

```text
feature/career-experience-redesign
```

STOP.

Do not:

- update canonical project memory yet
- raise the final PR to `main`
- merge to `main`
- delete the integration branch

Provide Rahul:

1. branch name
2. files changed
3. summary of implementation
4. build status
5. Day status
6. Night status
7. mobile/tablet/desktop QA status
8. known limitations
9. preview commands:

```bash
git checkout feature/career-experience-redesign
git pull
npm install
npm run dev
```

Wait for explicit approval.

---

# Review fixes

If Rahul requests changes, create:

```text
career/review-fixes-01
career/review-fixes-02
...
```

from the integration branch.

Each fix branch must:

```text
implement
→ validate
→ test responsive
→ test Day/Night
→ commit
→ push
→ PR into integration branch
→ merge
→ validate
```

Present the updated integration branch again for approval.

---

# Only after Rahul approves

## Update canonical project memory

Record:

```text
Career Experience Redesign
Status: approved

Integration branch:
feature/career-experience-redesign

Implemented:
- 30/70 desktop layout
- exact firm order
- multi-role support
- multi-project support
- project accordions
- responsive mobile/tablet behavior
- Day/Night support
- accessibility behavior

Firm order:
1. Cisco
2. Dream11
3. Samagra
4. Media.net
5. Samsung Research
```

Also record validation status, `DESIGN.md` changes, `VISUAL_ASSETS.md` changes, and any deferred content gaps.

Commit any post-approval memory/documentation changes.

Push integration branch.

---

# Final PR and merge

Open:

```text
feature/career-experience-redesign
→
main
```

Review the complete diff.

Merge only after Rahul's approval.

---

# Post-merge validation

After merge:

```bash
git checkout main
git pull origin main
npm install
npm run build
npm run dev
```

Validate:

- Career page
- Cisco default
- all firms
- multi-role firm
- multi-project firm
- accordions
- Day
- Night
- mobile
- tablet
- desktop
- placeholders
- console
- links

Do not delete the branch until `main` passes.

---

# Branch cleanup

Only after:

- Rahul approved
- PR merged
- `main` pulled locally
- build passes
- dev passes
- Career verified on `main`

delete the local integration branch:

```bash
git branch -d feature/career-experience-redesign
```

If safe and consistent with repository conventions, remove the remote branch:

```bash
git push origin --delete feature/career-experience-redesign
```

Also remove fully merged local child branches if they remain.

Never force-delete unique unmerged work.

---

# Success criteria

The page clearly communicates:

```text
Firm
→ Role
→ Project
→ Evidence
```

A recruiter can quickly browse employers, understand internal progression, browse projects, see the problem and impact immediately, and expand deeper detail only when interested.

The desktop 30/70 layout feels balanced.

Mobile is intentionally recomposed rather than compressed.

Internal role changes do not create duplicate firms.

Multiple projects per firm are supported cleanly.

No unsupported content is invented.

Missing visuals use documented placeholders.

Day and Night both work.

Reusable design changes are documented in `DESIGN.md`.

The workflow is complete only when Rahul approves, canonical memory is updated, the final PR is merged to `main`, `main` passes validation, and the task branch is safely removed.
