# Claude Code Execution Plan — Portfolio Content & Visual Structure Refinement

## Mission

Refine Rahul Paul's portfolio based on the latest design feedback while preserving the current **Technical Editorial** design system and the site's existing **Day / Night mode** support.

This project should improve:

- homepage content architecture
- project visibility
- project/case-study storytelling
- image/visual readiness through placeholders
- content density
- visual hierarchy
- spacing efficiency
- click affordance
- personality
- Career vs Built separation
- responsiveness of all newly introduced sections

This is **not** a wholesale redesign.

The current design system should remain the default. If a design-system change becomes necessary to support these improvements, make the smallest coherent change possible and update `DESIGN.md` in the same stage.

Do not invent career facts, metrics, employers, projects, screenshots, outcomes, or imagery.

---

# NON-NEGOTIABLE WORKFLOW RULES

## Main branch protection

`main` must remain untouched until Rahul explicitly confirms that the completed changes are correct and working.

Do not:

- commit directly to `main`
- merge stage work into `main`
- open stage PRs against `main`
- interpret successful QA as approval
- merge the final integration branch without Rahul's explicit signoff

---

# CREATE A NEW INTEGRATION BRANCH FIRST

Before any substantive work:

1. Read:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `PRODUCT.md`
   - `DESIGN.md`
   - current project memory
   - relevant prior redesign/theme/responsive instruction files if present

2. Inspect the current repository state.

3. Identify the latest approved branch that contains the current site, including:
   - Technical Editorial design
   - Day / Night mode
   - any already-approved responsive work
   - current Career page additions

4. Create a new independent integration branch:

```text
feature/content-visual-refinement
```

from that latest approved branch.

Example only:

```bash
git checkout <latest-approved-branch>
git pull origin <latest-approved-branch>

git checkout -b feature/content-visual-refinement
git push -u origin feature/content-visual-refinement
```

Do not implement changes directly on the parent branch.

All stages below must eventually merge into:

```text
feature/content-visual-refinement
```

---

# STAGE BRANCH MODEL

Each stage must be developed on a fresh child branch created from the latest:

```text
feature/content-visual-refinement
```

Use:

```text
refinement/01-audit-and-content-map
refinement/02-placeholder-system
refinement/03-homepage-projects
refinement/04-project-case-study-structure
refinement/05-density-and-hierarchy
refinement/06-personality-and-about
refinement/07-career-built-separation
refinement/08-cross-theme-responsive-qa
refinement/09-design-documentation
refinement/10-final-regression
```

Each stage follows:

```text
stage branch
↓ PR
feature/content-visual-refinement
```

Prefer squash merges for stage PRs.

---

# MANDATORY END-OF-STAGE PROTOCOL

At the end of **every stage**, complete all of the following:

1. Validate the implementation locally.
2. Test affected routes in Day mode.
3. Test affected routes in Night mode.
4. Test affected layouts at representative mobile/tablet/desktop widths.
5. Run:
   ```bash
   npm run build
   ```
6. Update project memory.
7. Commit all completed stage work.
8. Push the stage branch.
9. Open a PR into:
   ```text
   feature/content-visual-refinement
   ```
10. Review the PR diff for unintended changes.
11. Merge the PR into `feature/content-visual-refinement`.
12. Delete the stage branch if safe.
13. Checkout:
    ```text
    feature/content-visual-refinement
    ```
14. Pull latest merged state.
15. Run dev mode and verify the merged result.
16. Compact Claude Code context.
17. Re-read:
    - this instruction file
    - project memory
    - `DESIGN.md`
    - `CLAUDE.md`
    - `AGENTS.md`
    - `PRODUCT.md`
18. Only then begin the next stage.

Do not begin the next stage before the previous stage is merged and memory is updated.

---

# MEMORY REQUIREMENT

Use the repository's existing persistent memory file/system.

If the project already uses:

```text
REDESIGN_MEMORY.md
```

continue using it.

Do not create a competing memory file unless no persistent memory mechanism exists.

At the end of every stage append:

```md
## Content & Visual Refinement — Stage XX

Status: complete

Branch:
refinement/XX-name

PR:
#XX

Merged into:
feature/content-visual-refinement

Implemented:
- ...

Content decisions:
- ...

Design decisions:
- ...

Image placeholder decisions:
- ...

Files materially changed:
- ...

DESIGN.md updated:
- YES / NO
- If yes, summarize why

Validation:
- npm run build: PASS / FAIL
- dev mode: PASS / FAIL
- Day mode: PASS / FAIL
- Night mode: PASS / FAIL
- mobile: PASS / FAIL
- tablet: PASS / FAIL
- desktop: PASS / FAIL

Known issues / deferred items:
- ...

Next stage:
- ...
```

Memory updates are mandatory.

---

# CORE PRODUCT DIRECTION

The site should become more content-led and less visually busy.

The design should prioritize:

```text
Content
→ Evidence
→ Visual support
→ Decoration
```

not:

```text
Decoration
→ Color
→ Layout novelty
→ Content
```

Recruiters and hiring managers should be able to quickly understand:

- what Rahul built
- what problem he solved
- what he did
- what changed
- what projects demonstrate his product/technical judgment

---

# EXISTING DESIGN SYSTEM MUST BE PRESERVED

Maintain the current **Technical Editorial** system.

Preserve:

- current typography hierarchy unless a change is clearly justified
- current color philosophy
- current Day / Night relationship
- current spacing scale where possible
- current radius/border/shadow philosophy
- current responsive conventions
- current interaction language

Do not reintroduce:

- pastel-everything layouts
- rainbow ribbon
- cartoonish visual language
- Comic Sans / handwritten UI
- neon dark mode
- cyberpunk aesthetics
- excessive gradients
- heavy floating shadows
- excessive rounded cards
- decorative clutter

---

# DESIGN.md GOVERNANCE

If any stage changes a reusable design rule, component pattern, token, image treatment, spacing rule, typography rule, responsive behavior, interaction pattern, or theme behavior:

**Update `DESIGN.md` in that same stage.**

Do not postpone design-system documentation if the implementation has already changed.

Examples of changes that require `DESIGN.md` updates:

- new reusable image placeholder component
- new visual aspect-ratio rules
- new project-card pattern
- new case-study layout
- new spacing/density rules
- new responsive behavior
- new interaction affordance
- new theme token
- revised section hierarchy

---

# DAY / NIGHT REQUIREMENT

Every new component must work natively in both modes.

Do not create:

- light-only placeholder styles
- dark-only borders
- hardcoded background colors
- hardcoded text colors
- theme-specific one-off overrides unless necessary

Use semantic tokens.

Every stage must verify both themes.

---

# IMAGE POLICY

For this project, use **placeholders everywhere a future image or visual should exist**.

Do not:

- source stock imagery
- generate AI imagery
- fabricate product screenshots
- invent diagrams
- invent personal photographs
- use random decorative images

Instead, build the correct final layout using placeholders.

---

# PLACEHOLDER STANDARD

Create one reusable placeholder component.

Suggested component name:

```text
MediaPlaceholder
```

or the closest naming convention that fits the repo.

It should:

- preserve intended final aspect ratio
- be responsive
- work in Day mode
- work in Night mode
- use semantic design tokens
- clearly communicate what asset belongs there
- not visually overpower real content

Example content:

```text
MEDIA 01
PROJECT HERO
Final product screenshot
16:10
```

or:

```text
HEADSHOT
Professional portrait
4:5
```

Do not use broken-image icons.

Do not use generic gray boxes with no context.

---

# VISUAL_ASSETS.md

Create and maintain:

```text
VISUAL_ASSETS.md
```

This file should become the authoritative inventory of visual placeholders.

Use a table such as:

```md
| ID | Page | Placement | Asset Needed | Recommended Ratio | Status |
|----|------|-----------|--------------|-------------------|--------|
| IMG-01 | Home | Hero | Rahul portrait | 4:5 | Needed |
| IMG-02 | Home | Project 1 | Product screenshot | 16:10 | Needed |
| IMG-03 | About | Hero | Rahul portrait/candid | 4:5 | Needed |
```

Every new placeholder must have an entry.

If an asset already exists and is intentionally retained, mark it appropriately.

---

# STAGE 0 — BASELINE VERIFICATION

## Goal

Confirm the current site works before changing content structure.

## Tasks

Run:

```bash
npm install
npm run build
npm run dev
```

Confirm:

- all routes load
- Day mode works
- Night mode works
- theme persistence works
- current navigation works
- current responsive behavior is functional
- current Career page works
- existing design system is intact

Create and push:

```text
feature/content-visual-refinement
```

Record baseline state in memory.

Do not make substantive design/content changes in Stage 0.

---

# STAGE 1 — AUDIT AND CONTENT MAP

Branch:

```text
refinement/01-audit-and-content-map
```

## Goal

Map the current site and identify exactly what should change before implementing it.

Review:

```text
/
/career
/internships
/built
/about
/resume
/contact
```

and any additional routes.

Document:

- duplicated content
- homepage professional-work duplication
- existing project content
- current Built state
- available career content
- current image slots
- current real images
- current placeholders
- excessive whitespace
- visually overloaded sections
- unclear click targets
- areas lacking personality
- sections that already work well and should not be changed

Create/update a planning section in project memory.

Do not redesign yet.

### Acceptance criteria

- current content architecture is documented
- duplicate Home/Career content is identified
- future image locations are identified
- likely project-preview structure is defined
- likely case-study structure is defined

Then complete the full end-of-stage protocol.

---

# STAGE 2 — IMAGE PLACEHOLDER SYSTEM

Branch:

```text
refinement/02-placeholder-system
```

## Goal

Build the reusable placeholder infrastructure before placing placeholders throughout the site.

## Tasks

Create reusable `MediaPlaceholder` component.

It should support props equivalent to:

```text
id
label
description
aspectRatio
optional class/style variant
```

Exact implementation may vary.

Support common ratios such as:

```text
16:9
16:10
3:2
4:3
4:5
1:1
```

Do not hardcode width/height in ways that break responsiveness.

## Visual treatment

Use restrained Technical Editorial styling:

- subtle semantic border
- muted semantic surface
- small uppercase/mono label
- clear asset description
- ratio indicator
- no heavy shadow
- no playful illustration
- no excessive iconography

## Theme behavior

Verify:

- Day placeholder contrast
- Night placeholder contrast
- border visibility
- muted label readability

## Create VISUAL_ASSETS.md

Add all currently known future image slots.

Include at minimum likely slots for:

- Home hero
- homepage projects
- Built projects
- About portrait
- About personal/lifestyle imagery
- Internship visuals
- Career visuals where useful
- project/case-study visuals

### Acceptance criteria

- one reusable placeholder system exists
- placeholder styling matches Technical Editorial system
- Day/Night both work
- `VISUAL_ASSETS.md` exists
- design docs updated if this adds a reusable pattern

Then complete end-of-stage protocol.

---

# STAGE 3 — HOMEPAGE PROJECTS

Branch:

```text
refinement/03-homepage-projects
```

## Goal

Stop duplicating Career content on Home and make projects the primary work preview.

## Current principle

Professional work belongs primarily in:

```text
Career
```

Personal/built projects belong primarily in:

```text
Built
```

Homepage should preview selected projects rather than repeating employer experience cards.

## Replace professional experience preview cards

Remove or substantially reduce homepage Dream11 / Media.net style career cards if they duplicate Career.

Replace them with a selected-projects section.

Suggested structure:

```text
Selected Projects

[ PROJECT VISUAL PLACEHOLDER ]

Project name
One-line description
One relevant outcome / status / technology

View project →
```

Use only real project names/content already present in the repository.

If Built projects are not yet populated:

- do not invent fake projects
- create structurally complete placeholder project slots
- clearly mark content as pending
- avoid pretending these are launched products

## Click affordance

Every preview should clearly communicate interactivity.

Use an explicit link such as:

```text
View project →
```

Do not rely only on the whole card being clickable.

## Homepage visual hierarchy

Each project preview should contain:

1. visual placeholder
2. project name
3. concise description
4. one supporting fact/status
5. CTA

Avoid excessive metadata.

## Hero visual placeholder

If the homepage hero is intended to include a portrait or other real image, use the placeholder system.

Do not invent a replacement image.

## Update VISUAL_ASSETS.md

Record every homepage asset slot.

### Acceptance criteria

- homepage no longer unnecessarily duplicates Career
- selected projects become the work preview
- project visuals use placeholders
- clickability is obvious
- layout works in Day/Night
- layout works across mobile/tablet/desktop

Then complete end-of-stage protocol.

---

# STAGE 4 — PROJECT / CASE-STUDY STRUCTURE

Branch:

```text
refinement/04-project-case-study-structure
```

## Goal

Standardize project storytelling for fast scanning.

Use this core narrative:

```text
Problem
↓
Solution
↓
How I got there
↓
Outcome
```

Exact labels may be polished to fit site tone, but preserve this sequence.

## Recommended project layout

```text
PROJECT TITLE

[ HERO PLACEHOLDER ]

THE PROBLEM
Concise context

THE SOLUTION
What was built / decided

[ PRODUCT OR FLOW PLACEHOLDER ]

HOW I GOT THERE
Research / tradeoffs / decisions / execution

[ SUPPORTING VISUAL PLACEHOLDER ]

THE OUTCOME
Impact / learning / status
```

Do not fabricate missing project content.

If content is missing:

- render only supported sections
- use honest pending states
- record missing content in memory

## Density

Do not make every section full-screen.

Keep the page concise and visually evidence-led.

## CTA

At the end of each project:

- next project
- back to Built
- GitHub / Live links only if real links exist

### Acceptance criteria

- project storytelling is consistent
- problem/solution/outcome are easy to scan
- placeholders preserve future visual layout
- no unsupported claims are introduced

Then complete end-of-stage protocol.

---

# STAGE 5 — DENSITY AND VISUAL HIERARCHY

Branch:

```text
refinement/05-density-and-hierarchy
```

## Goal

Reduce wasted space and make each viewport communicate more useful information.

Audit:

- hero height
- section padding
- vertical gaps
- card padding
- large empty surfaces
- oversized decorative elements
- redundant numbering
- metric spacing
- CTA spacing
- footer spacing

## Density principle

Aim for:

```text
more useful information per scroll
```

without making the site cramped.

Important content should appear earlier.

## Focal hierarchy

Each major viewport should usually have:

- one dominant heading
- one dominant visual/placeholder
- one primary action
- supporting information

Avoid several equally loud elements.

## Remove unnecessary competition

Reduce:

- redundant labels
- duplicate summaries
- decorative numbering with no purpose
- repeated navigation cues
- unnecessary visual dividers
- excessive section intros

## Color discipline

Maintain the current color system.

Do not add new accent colors merely to differentiate sections.

Use color primarily for:

- hierarchy
- interaction
- status
- intentional emphasis

If project-specific color is introduced later with real assets, it should remain secondary to the main site system.

## DESIGN.md

If spacing rules or hierarchy rules become reusable design-system changes, update `DESIGN.md` in this stage.

### Acceptance criteria

- major pages use space more efficiently
- important content appears earlier
- no page feels cramped
- Day/Night remain coherent
- responsive behavior remains intentional

Then complete end-of-stage protocol.

---

# STAGE 6 — PERSONALITY AND ABOUT PAGE

Branch:

```text
refinement/06-personality-and-about
```

## Goal

Make the site feel more like Rahul without reverting to decorative/playful UI.

Personality should come from:

- copy
- photography placeholders
- interests
- project choices
- subtle interactions
- authentic content

not from arbitrary decorative elements.

## About page visual slots

Add placeholders where useful for:

```text
Professional portrait
McCombs / Austin context
Badminton
Personal / candid image
```

Only include slots that improve the page.

Do not overpopulate the page with image boxes.

## Maintain hierarchy

About should still prioritize:

```text
Professional story
↓
current MBA context
↓
personal interests
```

## Personal content

Retain supported interests such as:

- badminton
- reading
- reality TV

Do not invent additional interests.

## VISUAL_ASSETS.md

Add all About image slots.

### Acceptance criteria

- About feels more personal
- visual slots are ready for future assets
- layout remains restrained
- Day/Night both work
- mobile layout is clean

Then complete end-of-stage protocol.

---

# STAGE 7 — CAREER / BUILT SEPARATION

Branch:

```text
refinement/07-career-built-separation
```

## Goal

Make the content architecture unmistakable.

# Career

Career should own:

- employers
- roles
- professional outcomes
- professional metrics
- What I'm known for
- How I operate
- relevant professional case-study evidence

# Built

Built should own:

- personal projects
- prototypes
- vibe-coded products
- experiments
- launch status
- project case studies

# Home

Home should show:

- positioning
- selected projects
- concise credibility indicators
- high-level career arc
- CTA into Career / Built

Do not duplicate entire professional case studies on Home.

# Navigation / labels

If the current nav or page labels make the distinction unclear, improve wording while preserving the current design system.

Do not create unnecessary new routes.

# Career imagery

Where Career would benefit from product/launch visuals, use placeholders.

Do not force images into every employer section.

Use visuals only where they improve comprehension.

# VISUAL_ASSETS.md

Update Career/Built asset slots.

### Acceptance criteria

A visitor can immediately understand:

```text
Career = professional work
Built = personal projects
Home = selected highlights
```

Then complete end-of-stage protocol.

---

# STAGE 8 — CROSS-THEME RESPONSIVE QA

Branch:

```text
refinement/08-cross-theme-responsive-qa
```

## Goal

Ensure all new structure works with the existing responsive and theme systems.

Test representative widths at minimum:

```text
375px
430px
768px
1024px
1440px
1920px
```

Test both:

```text
Day
Night
```

at minimum:

```text
375
768
1024
1440
```

## Inspect

- homepage project section
- project placeholders
- project detail layouts
- About image slots
- Career visual slots
- card stacking
- CTA wrapping
- headings
- placeholder labels
- aspect ratios
- vertical spacing
- navigation
- theme toggle

## Mobile

Placeholders should not become huge empty blocks.

Use responsive ratios and appropriate size limits.

## Tablet

Do not jump awkwardly from 1-column mobile directly to wide desktop layouts.

Use intermediate compositions where needed.

## Accessibility

Verify:

- placeholder labels are readable
- placeholder content is not mistaken for final user content
- links remain keyboard-accessible
- touch targets are adequate
- focus states are visible
- contrast is sufficient in both themes

### Acceptance criteria

All new content works correctly across screen sizes and themes.

Then complete end-of-stage protocol.

---

# STAGE 9 — DESIGN DOCUMENTATION

Branch:

```text
refinement/09-design-documentation
```

## Goal

Ensure `DESIGN.md` accurately reflects the final implementation.

Review `DESIGN.md` even if it was updated incrementally in earlier stages.

Document final rules for:

- Technical Editorial principles
- project previews
- project/case-study structure
- image placeholders
- visual aspect ratios
- Day/Night placeholder behavior
- section density
- hierarchy
- spacing
- color discipline
- click affordance
- Career vs Built distinction
- responsive behavior of project media

## Placeholder documentation

Document:

- component name
- intended use
- allowed ratios
- styling
- theme behavior
- replacement process
- relationship to `VISUAL_ASSETS.md`

## Explicit rule

Future sessions should know:

> If a real asset is unavailable, preserve the layout with a documented placeholder rather than inventing or sourcing an unrelated image.

### Acceptance criteria

`DESIGN.md` matches actual code and current design behavior.

Then complete end-of-stage protocol.

---

# STAGE 10 — FINAL REGRESSION QA

Branch:

```text
refinement/10-final-regression
```

## Goal

Review the full integrated site before Rahul sees it.

Do not introduce a new design direction here.

# Full-route QA

Review:

```text
Home
Career
Internships
Built
About
Resume
Contact
all project routes
```

# Validate

- no duplicated Career content on Home unless intentional
- projects are clearly clickable
- no fabricated projects
- placeholders appear wherever planned
- every placeholder is documented in `VISUAL_ASSETS.md`
- project storytelling is consistent
- spacing is tighter
- content hierarchy is clear
- Day mode works
- Night mode works
- theme persistence works
- mobile works
- tablet works
- desktop works
- no horizontal overflow
- build passes
- no broken links

# Code audit

Search for:

- accidental hardcoded light colors
- accidental hardcoded dark colors
- duplicate placeholder implementations
- unsupported image references
- dead project links
- abandoned styles
- unnecessary one-off media queries

# Final commands

Run:

```bash
npm run build
npm run dev
```

Update project memory with final QA status.

Complete the end-of-stage protocol.

---

# FINAL REVIEW GATE — STOP HERE

After Stage 10:

**STOP.**

Do not merge into `main`.

Do not automatically merge into the parent redesign/theme branch.

Expected state:

```text
main
    current production

<latest approved parent branch>
    prior approved site

feature/content-visual-refinement
    complete refinement candidate
```

Rahul must review the final site.

Provide the exact local commands required, for example:

```bash
git checkout feature/content-visual-refinement
git pull
npm install
npm run dev
```

Also summarize:

- what changed
- which pages changed
- how many image placeholders exist
- where `VISUAL_ASSETS.md` lives
- whether `DESIGN.md` changed
- build status
- Day/Night status
- responsive QA status

Then wait for Rahul's explicit signoff.

Do not interpret:

- successful build
- successful PR merges
- "looks better"
- prior approval of individual stages
- completion of all tasks

as final approval.

---

# REVIEW FIXES AFTER RAHUL FEEDBACK

If Rahul requests changes, create:

```text
refinement/review-fixes-01
refinement/review-fixes-02
...
```

from:

```text
feature/content-visual-refinement
```

Each review-fix branch must follow:

```text
implement
→ validate
→ test Day/Night
→ test responsive behavior
→ update memory
→ update DESIGN.md if needed
→ commit
→ push
→ PR into feature/content-visual-refinement
→ review
→ merge
→ validate
→ compact
```

Do not bypass this process for small fixes.

---

# FINAL PROMOTION AFTER EXPLICIT SIGNOFF

Only after Rahul explicitly confirms that the changes are good and working correctly:

1. Determine the correct parent integration branch based on current repository state.
2. Merge via PR:

```text
feature/content-visual-refinement
→
<current approved parent integration branch>
```

3. Pull the merged parent branch.
4. Run:
   ```bash
   npm run build
   npm run dev
   ```
5. Validate:
   - Day mode
   - Night mode
   - theme persistence
   - mobile
   - tablet
   - desktop
   - project links
   - placeholders
   - `DESIGN.md`
   - `VISUAL_ASSETS.md`
   - project memory

If this parent branch is itself awaiting final production approval, do not merge to `main` yet.

---

# FINAL MERGE TO MAIN

Only after Rahul explicitly approves the complete final site:

Create the final PR into:

```text
main
```

Before merge:

1. update target branch
2. inspect the full diff
3. run `npm run build`
4. run `npm run dev`
5. validate Day
6. validate Night
7. validate system preference
8. validate saved theme preference
9. validate mobile
10. validate tablet
11. validate desktop
12. validate all project routes
13. verify `DESIGN.md`
14. verify `VISUAL_ASSETS.md`
15. verify project memory

Then merge.

After merge:

```bash
git checkout main
git pull origin main
npm install
npm run build
npm run dev
```

Confirm the final production branch works correctly.

Record final merge status in project memory.

---

# POST-MERGE BRANCH CLEANUP

Only after:

- Rahul explicitly approved the final site
- final changes reached `main`
- `main` was pulled locally
- production build passes
- local dev validation passes

remove the local integration branch safely:

```bash
git checkout main
git pull origin main
git branch -d feature/content-visual-refinement
```

Use safe deletion first.

Also remove fully merged local stage branches if they remain.

Do not delete branches containing unique/unmerged work.

Remote branch cleanup may be performed only if safe and consistent with repository conventions.

Record cleanup status in memory.

---

# SUCCESS CRITERIA

The project is successful when:

## Home

Home showcases projects rather than redundantly repeating Career.

## Career

Career clearly owns professional experience and impact.

## Built

Built clearly owns personal projects and prototypes.

## Project pages

Projects follow a concise:

```text
Problem
→ Solution
→ How I got there
→ Outcome
```

structure.

## Images

All intended image areas use deliberate, responsive, theme-aware placeholders.

No fake visuals are introduced.

## VISUAL_ASSETS.md

Every placeholder is inventoried and ready for future replacement.

## Density

The site communicates more useful information per scroll.

## Hierarchy

Users know what to look at.

## Personality

The site feels more personal through authentic content and reserved image slots, not decorative clutter.

## Design

The current Technical Editorial system remains intact.

Any design-system changes are documented in `DESIGN.md`.

## Theme

Everything works in Day and Night modes.

## Responsive

All new sections work across mobile, tablet, and desktop.

## Workflow

- a new integration branch was created first
- every stage used its own child branch
- every stage raised its own PR
- every stage merged into `feature/content-visual-refinement`
- memory was updated after every stage
- compaction occurred after every stage
- `main` remained untouched until Rahul's explicit signoff
- final branch cleanup occurred only after validated merge to `main`

---

# FINAL OPERATING PRINCIPLE

Do not solve this project by adding more design.

Solve it by improving:

```text
what is shown
what is emphasized
how quickly it can be understood
where visual evidence belongs
how much space each idea deserves
```

Preserve the current design system unless a change is truly necessary.

If a reusable design rule changes, update `DESIGN.md`.

If an image is needed but unavailable, use a documented placeholder.

If content is unsupported, do not invent it.
