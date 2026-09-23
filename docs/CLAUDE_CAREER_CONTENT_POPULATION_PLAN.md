# Claude Code Execution Plan — Career Content Population v2

## Mission

Populate the redesigned Career page using the latest supplied source:

```text
career-section-content(2).md
```

while preserving the approved Career hierarchy:

```text
Firm
→ Role(s)
→ Project(s)
→ Detailed project content
```

This is a **content population task**, not a visual redesign.

Preserve:

- the current Technical Editorial design system
- existing Day / Night mode behavior
- current responsive behavior
- approved firm-selector layout
- multi-role support
- multi-project support
- accordion interaction
- current Career-page navigation and deep-link behavior

Do not invent facts, metrics, projects, tools, outcomes, learnings, product mechanics, or visuals.

---

# AUTHORITATIVE SOURCE

Use:

```text
career-section-content(2).md
```

as the content source for this task.

The source legend is:

```text
🟢 = confirmed fact
🟡 = still needs Rahul's input
```

Treat this as a hard publishing rule.

---

# CRITICAL EMPTY-SECTION RULE

All six accordion sections must remain present for every project:

```text
01 The problem
02 How I approached it
03 How the product works
04 Tools and product decisions
05 Impact to users
06 What I learned
```

If a section has no confirmed content:

- keep the accordion row visible
- allow it to be expanded
- when expanded, render **nothing**
- do not show:
  - "Coming soon"
  - "TBD"
  - "Needs input"
  - placeholder prose
  - grey helper text
  - speculative copy
  - empty-state illustrations
  - implementation notes

The expanded panel should simply have no body content.

This behavior is intentional.

The public UI must never expose internal content-gap notes.

---

# PUBLISHING RULES

## Confirmed content

Only content explicitly marked 🟢 may be published.

## Mixed content

If a section contains both confirmed and unconfirmed statements:

- publish only the confirmed portion
- omit the unconfirmed portion
- do not rewrite the unconfirmed portion into a confident statement

## Unconfirmed content

Do not publish 🟡 material as factual website copy.

Do not:

- infer missing answers
- convert suggestions into facts
- invent rationale
- infer product mechanics
- infer user problems
- invent metrics
- invent learnings
- fill empty sections with generic PM language

---

# APPROVED FIRM ORDER

Keep this exact order:

```text
1. Cisco
2. Dream11
3. Samagra
4. Media.net
5. Samsung Research
```

Cisco remains selected by default.

---

# PROJECT INVENTORY — 13 PROJECTS

The latest source contains 13 distinct projects.

## Cisco

1. AI Sales Enablement Agent
2. Translation Validator

## Dream11

3. In-App Advertising Launch
4. ML Application Platform

## Samagra

5. LLM Platform Go-to-Market
6. Student Assessment App Launch

## Media.net

7. Feature-Flag Experimentation Platform
8. B2B Ad Traffic Optimizer
9. APAC Go-to-Market Launch
10. Ad Pricing Optimizer: Dynamic Margin Management
11. AI User Targeting Module

## Samsung Research

12. Night Mode
13. Color-Tuning Module
14. Super Slow-Motion Feature

Note: the source text states "13 projects now," but the explicit project list above contains 14 named project entries when counting all Cisco, Dream11, Samagra, Media.net, and Samsung entries.

Before implementation, Claude Code must reconcile this **count discrepancy only as a counting/documentation issue**, not by dropping a named project.

The rule is:

> Every explicitly named project section in `career-section-content(2).md` must be represented unless Rahul explicitly says otherwise.

Do not silently omit a project just to match the stated count.

Record the count discrepancy in implementation notes.

---

# ROLE MAPPING

Use authoritative repository role history.

Do not infer role/project mapping where the source does not explicitly provide it.

Explicit source role details include:

```text
Media.net — Feature-Flag Experimentation Platform
Role: Associate Product Manager
```

and:

```text
Media.net — AI User Targeting Module
Role: Software Development Engineer, Publisher and Advertiser Optimization
```

For all other projects, use the existing Career data model and confirmed role history already in the repository.

If current repository role history conflicts with the source file:

- do not silently choose one
- document the conflict
- preserve the existing verified value until Rahul resolves it

---

# ACCORDION LABELS

Default labels remain:

```text
01 The problem
02 How I approached it
03 How the product works
04 Tools and product decisions
05 Impact to users
06 What I learned
```

For GTM / research projects, context-specific labels may be used where the source explicitly recommends them.

Examples:

```text
How the research translated to GTM direction
Launch approach
```

However:

- preserve section numbering
- preserve accordion order
- keep interaction behavior consistent
- update `DESIGN.md` if per-project labels become a reusable content-system rule

---

# DEFAULT ACCORDION STATE

Preserve the approved default state:

Open by default:

```text
01 The problem
05 Impact to users
```

Collapsed by default:

```text
02 How I approached it
03 How the product works
04 Tools and product decisions
06 What I learned
```

If an open-by-default section has no confirmed content:

- keep it open
- render a blank content body
- do not insert filler

This is intentional and should not be treated as an implementation bug.

---

# PROJECT CONTENT MAP

## CISCO — AI Sales Enablement Agent

Stats:

```text
50 stakeholders
6-month roadmap
5+ personas defined
```

### 01 The problem

No confirmed content.

Accordion remains.

Expanded body is blank.

### 02 How I approached it

Publish:

- defined a 6-month roadmap
- worked with engineering on technical feasibility
- technical feasibility changed the design flow and end-user interaction
- aligned 50 stakeholders across sales, localization, and content teams
- defined 5+ core personas
- defined a post-research UX flow that shipped as designed

### 03 How the product works

No confirmed content.

Expanded body blank.

### 04 Tools and product decisions

No confirmed content.

Expanded body blank.

### 05 Impact to users

Publish:

- launch materials and positioning went live as part of Cisco's global CMO keynote on August 24

Do not imply:

- adoption rate
- sales-cycle improvement
- pipeline attribution
- downstream performance metrics

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# CISCO — Translation Validator

Stat:

```text
15% token reduction
```

### 01 The problem

Source remains 🟡.

Expanded body blank.

### 02 How I approached it

Publish:

- built using Cursor and Claude Code as a proof of concept
- validates translations without re-running full inference on every content item

### 03 How the product works

Publish:

- checks translated sales content against source meaning at publish time
- flags semantic drift for human review
- does not block output
- sits inside the existing content pipeline
- used directly by sales teams as an end product

### 04 Tools and product decisions

No confirmed rationale beyond the source's inferred suggestion.

Expanded body blank.

### 05 Impact to users

Publish:

- gave sales teams a credible way to trust AI-translated content at scale
- components were reused across four internal tools:
  - content evaluation
  - research
  - mail
  - PowerPoint

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# DREAM11 — In-App Advertising Launch

Stats:

```text
$8M revenue in first 60 days
$20M revenue at 1-year mark
5% retention lift
```

### 01 The problem

Source remains 🟡.

Expanded body blank.

### 02 How I approached it

Publish:

- led a 10-person cross-functional team
- drove vendor partnerships required for launch
- negotiated pricing-model and impression-counting definitions directly with Legal
- partnered directly with Data Science
- Data Science set quality benchmarks
- pressure-tested and signed off on those benchmarks
- 250M-user segmentation and cohort experiments fed targeting and placement testing

### 03 How the product works

Publish:

- ML-backed ad targeting matched ads to user context rather than static inventory
- operated on a 250M+ user platform

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- $8M revenue in first 60 days
- $20M revenue at 1-year mark
- 5% retention lift attributed to the launch, with the source noting it was the only platform change introduced at the time

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# DREAM11 — ML Application Platform

Stats:

```text
100+ daily active users, from 8
$500K annual savings
```

### 01 The problem

Publish:

- operators needed to work with ML models without ML expertise
- manual/ad hoc workflows were costly at scale

### 02 How I approached it

Publish:

- redesigned the developer experience for operators
- partnered with Data Science on quality benchmarks
- reduced third-party reliance
- this reduction contributed to the $500K annual savings

### 03 How the product works

Unconfirmed mechanics.

Expanded body blank.

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- scaled from 8 to 100+ daily active users
- cut third-party reliance
- saved $500K annually

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# SAMAGRA — LLM Platform Go-to-Market

Stat:

```text
$700K new ARR
```

### 01 The problem

Publish:

- government and enterprise buyers needed a clear case for adopting an LLM platform inside real institutional constraints

### 02 How I approached it

Publish:

- GTM and research role, not build ownership
- ran buyer and market research
- surfaced use cases relevant to government and enterprise buyers
- $700K ARR client came through a formal sales process
- included demos, discovery calls, and pitching decision-makers

### 03 Contextual section

Preferred label:

```text
How the research translated to GTM direction
```

No confirmed body copy beyond the currently published approach content.

If nothing additional is confirmed:

expanded body blank.

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- $700K in new B2B ARR

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# SAMAGRA — Student Assessment App Launch

Stat:

```text
0 → 200K teachers in 2 months
```

### 01 The problem

Publish:

- adoption data showed specific districts lagging on a student-testing app
- this was identified through Rahul's own analysis rather than assumed

### 02 How I approached it

Publish:

- analyzed adoption data via Tableau
- identified lagging districts
- tailored the app's GTM strategy
- worked directly with State and Education department stakeholders

### 03 How the product works

The source explicitly says this was a GTM/rollout project rather than a build, and the actual tactics remain unconfirmed.

Expanded body blank.

### 04 Tools and product decisions

Confirmed:

```text
Tableau
```

Do not publish unconfirmed GTM tactics.

If the component supports a tools-only body, show Tableau.

Otherwise keep only the confirmed tool and no inferred decisions.

### 05 Impact to users

Publish:

- grew from zero to 200K teachers within 2 months

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# MEDIA.NET — Feature-Flag Experimentation Platform

Role:

```text
Associate Product Manager
```

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Section remains 🟡 in the source.

Expanded body blank.

### 03 How the product works

Publish:

- org-wide A/B testing platform
- role-scoped access and permissions
- reduced time to start and monitor experiments
- mutual exclusivity by design
- introduced RBAC to govern sensitive data
- 30 experiments running within six months

### 04 Tools and product decisions

Publish:

- role-based access was the core design decision
- RBAC was the platform's actual differentiator

### 05 Impact to users

Source remains 🟡.

Expanded body blank.

Do not invent dashboard/reporting metrics.

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# MEDIA.NET — B2B Ad Traffic Optimizer

Stats:

```text
$35M revenue
70% lower cost
```

This project is traffic shaping.

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Unconfirmed.

Expanded body blank.

### 03 How the product works

Publish:

- shapes and reallocates traffic-acquisition spend based on yield signals
- lowers cost per unit of revenue generated

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

Do not put:

```text
Python
Spark SQL
5TB/day
HDFS
```

here.

Those belong to Dynamic Margin Management.

### 05 Impact to users

Publish:

- $35M in revenue
- 70% lower cost than the prior approach

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# MEDIA.NET — APAC Go-to-Market Launch

Stats:

```text
$40M revenue
11 new customers
within 6 months
```

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Publish:

- competitive analysis across 5 competitors
- 3 similar-size competitors
- 2 larger players
- analysis secured executive buy-in
- followed by channel strategy
- followed by partnership strategy
- followed by GTM plan

### 03 Contextual section

Preferred label:

```text
Launch approach
```

If no additional confirmed body copy exists:

expanded body blank.

### 04 Tools and product decisions

Specific tactics remain unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- $40M in revenue
- across 11 new customers
- within 6 months of launch

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# MEDIA.NET — Ad Pricing Optimizer: Dynamic Margin Management

This project is separate from the B2B Ad Traffic Optimizer.

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Publish:

- built the underlying bid-prediction ML model powering dynamic margin management

### 03 How the product works

Publish:

- bid-prediction model sets margins dynamically
- operates on the demand side
- part of the real-time ad-exchange bidding process
- replaces fixed/manual margin setting

### 04 Tools and product decisions

Publish:

- Python
- processing 5TB of ad-transaction data daily
- extracted via Spark SQL
- source system: HDFS

### 05 Impact to users

No confirmed project-specific metric.

Expanded body blank.

Do not reuse:

```text
$35M
70% lower cost
```

Those belong to the B2B Ad Traffic Optimizer.

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# MEDIA.NET — AI User Targeting Module

Role:

```text
Software Development Engineer
Publisher and Advertiser Optimization
```

Stats:

```text
+20% return on ad spend
client-report ranking: 10th → 3rd
```

This is a separate project from Dynamic Margin Management.

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Publish:

- wrote the business case
- wrote the technical spec
- led a 3-person engineering team through the build

### 03 How the product works

Unconfirmed.

Expanded body blank.

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- increased return on ad spend by 20%
- moved Media.net's client-report ranking from 10th to 3rd

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# SAMSUNG RESEARCH — Night Mode

Stat:

```text
contributed to $1B in device-line sales
```

### 01 The problem

Publish:

- flagship camera line needed low-light performance that held up at mass-market scale, not just in a lab

### 02 How I approached it

Publish:

- led development
- conducted beta user research
- conducted competitor analysis

### 03 How the product works

Unconfirmed.

Expanded body blank.

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- shipped as a flagship differentiator
- contributed to $1B in device-line sales

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# SAMSUNG RESEARCH — Color-Tuning Module

Stat:

```text
25M+ flagship devices
```

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Publish:

- collaborated with Korean and Vietnamese teams
- built an ML-based color-tuning module
- optimized on-device latency without compromising image quality

### 03 How the product works

Mechanics remain unconfirmed.

Expanded body blank.

### 04 Tools and product decisions

Ownership split remains unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- launched globally on 25M+ flagship devices

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# SAMSUNG RESEARCH — Super Slow-Motion Feature

Stats:

```text
1 of 20 selected
standard feature across devices since 2020
```

### 01 The problem

Unconfirmed.

Expanded body blank.

### 02 How I approached it

Confirmed only:

- selected as 1 of 20 engineers
- co-developed the feature with the Korea R&D Center
- worked cross-border on a headline camera feature

Do not publish additional process details.

### 03 How the product works

Unconfirmed.

Expanded body blank.

### 04 Tools and product decisions

Unconfirmed.

Expanded body blank.

### 05 Impact to users

Publish:

- shipped as Samsung Camera's first software-based Super Slow-motion feature
- has remained a standard feature across devices since 2020

### 06 What I learned

No confirmed content.

Expanded body blank.

---

# CONTENT GAP TRACKER

Create:

```text
CAREER_CONTENT_GAPS.md
```

This is an internal project file, not public website content.

Use:

```md
| Priority | Firm | Project | Section | Missing Input |
|---|---|---|---|---|
```

Priority order from the source:

```text
1. Super Slow-Motion Feature
2. AI User Targeting Module
3. Night Mode
4. Media.net B2B Ad Traffic Optimizer — tools and decisions
5. Samagra Student Assessment App — product mechanics / GTM tactics
6. Samsung Color-Tuning Module — product mechanics / ownership
7. Remaining What I learned sections
```

Preserve source questions where useful.

Do not render this tracker in the website.

---

# EMPTY ACCORDION IMPLEMENTATION REQUIREMENT

The UI must support an accordion with:

```text
title
+
```

even when the body content is empty.

When clicked:

```text
+
→
–
```

and the section expands.

If no confirmed content exists:

```text
expanded body = blank
```

Do not:
- remove the accordion row
- disable the accordion
- hide the plus button
- insert filler text
- add internal TODO text to the public DOM
- show "content coming soon"

The blank state should preserve the normal spacing/animation behavior without creating a large empty block.

Prefer near-zero/compact expanded body height if there is no content.

Update `DESIGN.md` to document this behavior if it becomes a reusable Career-content rule.

---

# COPY STYLE

Keep confirmed copy:

- concise
- metric-forward
- recruiter-scannable
- specific
- evidence-led

Prefer:

```text
1–2 sentence summary
+
2–4 compact supporting bullets/blocks
```

where content exists.

Do not convert every confirmed source paragraph into long prose.

---

# VISUALS

Continue the existing visual-placeholder policy.

If a project would benefit from a screenshot, product flow, dashboard, launch visual, or diagram but no real asset exists:

- use the existing `MediaPlaceholder`
- update `VISUAL_ASSETS.md`

Do not:
- generate fake screenshots
- use stock imagery
- fabricate diagrams

No project is required to have a visual.

---

# DESIGN SYSTEM

Maintain the existing Technical Editorial design system.

Do not change:
- typography
- palette
- pane layout
- accordion styling
- card styling
- theme runtime
- responsive system

unless required to support this content correctly.

If a reusable rule changes, update:

```text
DESIGN.md
```

in the same stage.

Possible legitimate changes:
- empty accordion behavior
- contextual accordion labels
- variable metric counts
- content-length guidance
- project-title wrapping
- project list density

---

# DAY / NIGHT

All content states must work in both modes.

Test:
- filled accordion
- empty accordion
- selected project
- selected firm
- metric rows
- long labels
- role history
- placeholders

Do not introduce hardcoded light/dark colors.

---

# RESPONSIVE

Test at minimum:

```text
375
430
768
1024
1440
1920
```

Check:
- long project names
- project selectors
- role labels
- empty accordions
- contextual GTM labels
- metric wrapping
- long impact text
- no horizontal overflow

Do not shrink text below readable sizes.

---

# GIT WORKFLOW

## New integration branch

Start from the latest approved branch containing the completed Career redesign.

Read:
- `CLAUDE.md`
- `AGENTS.md`
- `PRODUCT.md`
- `DESIGN.md`
- project memory
- `VISUAL_ASSETS.md`
- Career redesign instructions
- `career-section-content(2).md`

Create:

```text
feature/career-content-population-v2
```

Do not implement directly on `main`.

---

# CHILD BRANCHES

Use:

```text
career-content-v2/01-content-audit
career-content-v2/02-cisco
career-content-v2/03-dream11
career-content-v2/04-samagra
career-content-v2/05-media-net
career-content-v2/06-samsung
career-content-v2/07-empty-section-behavior
career-content-v2/08-content-gaps-and-visuals
career-content-v2/09-responsive-theme-qa
career-content-v2/10-design-docs
career-content-v2/11-final-regression
```

Each branch starts from the latest:

```text
feature/career-content-population-v2
```

and raises a PR back into that integration branch.

Prefer squash merges.

---

# END-OF-STAGE WORKFLOW

At the end of every stage:

1. validate locally
2. test affected content in Day mode
3. test affected content in Night mode
4. test representative responsive widths
5. run:
   ```bash
   npm run build
   ```
6. commit stage work
7. push child branch
8. open PR into:
   ```text
   feature/career-content-population-v2
   ```
9. review diff
10. merge into integration branch
11. delete child branch if safe
12. checkout integration branch
13. pull latest
14. validate merged state
15. compact Claude Code context
16. re-read:
   - this file
   - `career-section-content(2).md`
   - `DESIGN.md`
   - project memory
   - `CAREER_CONTENT_GAPS.md`
   - `VISUAL_ASSETS.md`
17. begin next stage

Do not merge stage branches to `main`.

---

# MEMORY RULE

During implementation stages:

Do not update canonical project memory as though the work is approved.

Canonical memory is updated only after Rahul reviews and approves the final integrated result.

Temporary implementation notes are allowed.

---

# STAGE 0 — BASELINE

Run:

```bash
npm install
npm run build
npm run dev
```

Verify:
- Career redesign is present
- firm switching works
- role history works
- multi-project support works
- accordions work
- Day/Night works
- responsive behavior works

Create:

```text
feature/career-content-population-v2
```

---

# STAGE 1 — CONTENT AUDIT

Branch:

```text
career-content-v2/01-content-audit
```

Tasks:
- map every explicitly named source project into the current Career data model
- reconcile the stated project count vs actual named entries
- compare roles/dates/locations against authoritative repository data
- identify conflicts
- create/update `CAREER_CONTENT_GAPS.md`
- do not publish content yet

Do not drop a named project to force the project count to match the source summary.

---

# STAGE 2 — CISCO

Branch:

```text
career-content-v2/02-cisco
```

Populate:
- AI Sales Enablement Agent
- Translation Validator

Keep all six sections.

Missing sections expand blank.

---

# STAGE 3 — DREAM11

Branch:

```text
career-content-v2/03-dream11
```

Populate:
- In-App Advertising Launch
- ML Application Platform

Keep all six sections.

Missing sections expand blank.

---

# STAGE 4 — SAMAGRA

Branch:

```text
career-content-v2/04-samagra
```

Populate:
- LLM Platform Go-to-Market
- Student Assessment App Launch

Support contextual GTM section labels where appropriate.

Keep all six sections.

Missing sections expand blank.

---

# STAGE 5 — MEDIA.NET

Branch:

```text
career-content-v2/05-media-net
```

Populate:
- Feature-Flag Experimentation Platform
- B2B Ad Traffic Optimizer
- APAC Go-to-Market Launch
- Ad Pricing Optimizer: Dynamic Margin Management
- AI User Targeting Module

Critical attribution rules:

```text
B2B Ad Traffic Optimizer
→ $35M revenue
→ 70% lower cost

APAC GTM
→ $40M revenue
→ 11 new customers
→ within 6 months

Ad Pricing Optimizer
→ Python
→ Spark SQL
→ 5TB/day
→ HDFS

AI User Targeting Module
→ +20% ROAS
→ ranking 10th → 3rd
→ 3-person engineering team
```

Do not cross-assign these facts.

---

# STAGE 6 — SAMSUNG RESEARCH

Branch:

```text
career-content-v2/06-samsung
```

Populate:
- Night Mode
- Color-Tuning Module
- Super Slow-Motion Feature

Keep all six sections for each.

Missing sections expand blank.

---

# STAGE 7 — EMPTY SECTION BEHAVIOR

Branch:

```text
career-content-v2/07-empty-section-behavior
```

Implement and verify the explicit blank-expanded-state requirement.

For every project:
- all six accordion rows exist
- every `+` works
- expanded empty section shows no content
- no filler
- no public TODO text
- no excessive empty vertical block
- ARIA state remains correct

Add automated/component tests if the existing project has a testing convention.

Update `DESIGN.md` if this behavior becomes a reusable rule.

---

# STAGE 8 — GAPS + VISUALS

Branch:

```text
career-content-v2/08-content-gaps-and-visuals
```

Ensure:
- `CAREER_CONTENT_GAPS.md` is complete
- `VISUAL_ASSETS.md` is current
- all unconfirmed content remains out of the live site
- no fake metrics exist
- no metric is attributed to the wrong project
- no project has been accidentally merged with another

---

# STAGE 9 — RESPONSIVE + THEME QA

Branch:

```text
career-content-v2/09-responsive-theme-qa
```

Test:

```text
375
430
768
1024
1440
1920
```

in Day and Night at representative sizes.

Pay special attention to:
- long titles
- project selectors
- role labels
- empty expanded accordions
- metric labels
- GTM-specific section headings
- spacing after empty sections
- mobile scroll behavior

Fix layout issues without redesigning the Career page.

---

# STAGE 10 — DESIGN DOCUMENTATION

Branch:

```text
career-content-v2/10-design-docs
```

Review `DESIGN.md`.

Update only for actual reusable changes such as:
- blank accordion behavior
- contextual section labels
- variable metrics
- project-title wrapping
- content-density guidance

Verify:
```text
CAREER_CONTENT_GAPS.md
VISUAL_ASSETS.md
```

are current.

---

# STAGE 11 — FINAL REGRESSION

Branch:

```text
career-content-v2/11-final-regression
```

Verify every explicitly named project from the source exists.

Check:
- correct firm
- correct role association where known
- correct metrics
- all six accordion rows exist
- unconfirmed sections are blank when expanded
- no speculative text
- no content-gap notes exposed publicly
- no incorrect metric attribution
- Day works
- Night works
- mobile works
- tablet works
- desktop works
- no horizontal overflow
- no console errors
- build passes

Run:

```bash
npm run build
npm run dev
```

Merge Stage 11 into:

```text
feature/career-content-population-v2
```

Then stop.

---

# FINAL REVIEW GATE — RAHUL APPROVAL REQUIRED

After all child branches merge into:

```text
feature/career-content-population-v2
```

STOP.

Do not:
- update canonical project memory yet
- raise the final PR to `main`
- merge to `main`
- delete the integration branch

Provide Rahul:
1. branch name
2. projects populated
3. sections still missing content
4. path to `CAREER_CONTENT_GAPS.md`
5. build status
6. Day/Night status
7. responsive QA status
8. confirmation that missing sections expand blank
9. preview commands

```bash
git checkout feature/career-content-population-v2
git pull
npm install
npm run dev
```

Wait for explicit approval.

---

# REVIEW FIXES

If Rahul provides additional confirmed content or corrections:

create:

```text
career-content-v2/review-fixes-01
career-content-v2/review-fixes-02
...
```

Each fix branch must:

```text
apply only confirmed corrections
→ validate
→ test blank-section behavior
→ test responsive
→ test Day/Night
→ commit
→ push
→ PR into feature/career-content-population-v2
→ merge
→ validate
```

Update `CAREER_CONTENT_GAPS.md` as gaps are resolved.

Present the integration branch again for approval.

---

# ONLY AFTER RAHUL APPROVES

Update canonical project memory with:
- approved Career content population
- integration branch
- projects populated
- confirmed metrics
- unresolved gaps
- blank-section behavior
- `CAREER_CONTENT_GAPS.md`
- `DESIGN.md` changes if any
- build / Day / Night / responsive validation

Then commit and push any post-approval memory/documentation updates.

---

# FINAL PR

Open:

```text
feature/career-content-population-v2
→
main
```

Review the full diff.

Merge only after explicit Rahul approval.

---

# POST-MERGE VALIDATION

After merge:

```bash
git checkout main
git pull origin main
npm install
npm run build
npm run dev
```

Verify:
- all firms
- all named projects
- all six accordion rows per project
- empty expanded sections render blank
- metrics
- themes
- responsive layouts
- no console errors

Do not delete the task branch until `main` passes.

---

# BRANCH CLEANUP

After successful production validation:

```bash
git branch -d feature/career-content-population-v2
```

If safe and consistent with repository conventions:

```bash
git push origin --delete feature/career-content-population-v2
```

Remove fully merged local child branches if still present.

Never force-delete unique unmerged work.

---

# SUCCESS CRITERIA

The task is successful when:

- every explicitly named project in the source is represented
- all six accordion sections remain visible for every project
- missing/unconfirmed sections expand to a blank body
- no filler/TODO text is exposed publicly
- confirmed metrics are assigned to the correct project
- no 🟡 content is published as fact
- content gaps are tracked internally
- Career remains recruiter-scannable
- Day and Night both work
- mobile/tablet/desktop remain clean
- Technical Editorial design remains intact
- actual reusable changes are documented in `DESIGN.md`
- Rahul reviews the final integrated result before merge
- canonical memory is updated only after approval
- final PR is raised only after approval
- `main` is validated after merge
- task branch is removed only after successful validation
