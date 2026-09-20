# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), deployed to Cloudflare Pages. Decided in prior planning — see project memory `portfolio_tech_stack_decision.md`.

## Users

Primary: recruiters and hiring managers screening candidates for post-MBA Product Manager roles, scanning the Career page in seconds to decide whether to take Rahul seriously as a rigorous, metrics-driven candidate. Secondary: Rahul himself, using the site as a durable personal record of career facts and shipped work.

## Product Purpose

A personal portfolio site supporting a post-MBA PM job search. It exists to make Rahul's career track record (Dream11, Media.net SDE/APM, Samsung, Cisco, Samagra) scannable, credible, and defensible in the amount of time a recruiter actually spends on a candidate site.

## Positioning

Metric-first and credential-forward where a competing candidate site would default to narrative-first or wit-forward framing. Numbers are stated directly and attributed to their scope (what was measured, at which employer/program) rather than softened, bundled, or omitted — this is only credible because the underlying figures have already been reconciled and fact-checked (see `experience_data_reconciled.md`).

## Operating Context

Recruiters skim; the Career page is the page under real time pressure. Other pages (About, Built, Resume, Contact) are visited by someone already convinced enough to look deeper, so they can carry more voice and personality.

## Capabilities and Constraints

- Content-collection model: `src/content/{career,internships,built}`, one entry per role/project.
- Career: Dream11, Media.net (split into two entries — SDE and APM), Samsung, Samagra, reverse-chronological, with a prose thesis before the timeline.
- Internships: Cisco only, single deep-dive page (no sub-nav system for one entry).
- Built: vibe-coding projects. **Undecided** — Rahul has not listed actual projects yet; do not invent placeholder projects or names. Section shape (Products/Prototypes split vs. flat list) depends on what those turn out to be.
- Resume: general (not company-targeted) downloadable PDF. Ships as a visible TODO/disabled state until the real file exists — no placeholder PDF.
- Contact: publishes `rahul.paul118@gmail.com` directly, plus LinkedIn.
- "Built" nav link is visible now, pointing to an explicit "coming soon" page — not hidden.

## Brand Commitments

Voice is deliberately quarantined by page, not blended:
- **Career / Resume**: credential-forward, metric-first. Numbers stated directly, attributed to scope, never softened. A rare human aside is fine if it earns its place; it is not the house style here.
- **About**: the one page where personality/wit is allowed — MBA/McCombs context plus real interests (badminton, reading, reality TV).

Reasoning (from `portfolio_content_menu_and_voice.md`): Rahul doesn't yet have an established title doing credibility work for him the way a wit-forward register requires, so leading with humor in Career risks reading as unserious to a recruiter deciding whether to take him seriously.

## Evidence on Hand

Reconciled, defensible career facts for Dream11, Media.net (SDE + APM), Samsung, Cisco, and Samagra live in project memory `experience_data_reconciled.md` — authoritative over any resume file or earlier draft if they conflict. No Built project content exists yet; nothing should be fabricated for that section.

## Product Principles

1. Scannable credibility over narrative charm on Career/Resume — a recruiter's few seconds of attention drives structure, not storytelling.
2. Every metric is attributed to its scope (what it measured, at which employer) rather than stated as a bare claim.
3. Personality is quarantined to About, not distributed as connective tissue across the whole site.
4. Don't fabricate content to fill a gap — an honest "not yet decided" (Built section) beats an invented placeholder.
5. Multi-page with dedicated case-study pages, not a single accordion/scroll — validated against precedent from reviewed portfolio sites.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
