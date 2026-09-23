# Visual Assets

Authoritative inventory of every visual placeholder on the site, per the Content & Visual
Refinement plan's image policy: placeholders everywhere a future image or visual should exist,
never stock/AI/fabricated imagery. Built with the `MediaPlaceholder` component
(`src/components/MediaPlaceholder.astro`) — see `DESIGN.md` for its full spec.

Status values: `Needed` (no asset exists, placeholder is live), `Retained` (a real, intentional
non-placeholder visual already exists and is kept as-is), `Deferred` (identified but not built
yet — no route/section exists to hold it).

| ID | Page | Placement | Asset Needed | Recommended Ratio | Status |
|----|------|-----------|---------------|--------------------|--------|
| IMG-01 | Home | Hero | Rahul portrait (optional swap-in) | 1:1 | Retained — intentional `.intersection-diagram` graphic, not an empty gap; HTML comment in `index.astro` documents the swap path |
| IMG-02 | Home | Selected Projects — card 1 | Built project visual | 16:10 | Needed |
| IMG-03 | Home | Selected Projects — card 2 | Built project visual | 16:10 | Needed |
| IMG-04 | About | Hero | Rahul portrait/candid | 4:5 | Needed |
| IMG-05 | About | McCombs / Austin context | Campus or MBA-context photo | 4:3 | Needed |
| IMG-06 | About | Badminton | Badminton/action photo | 4:3 | Needed |
| IMG-07 | About | Personal / candid | Personal/candid photo | 4:5 | Needed |
| IMG-08 | Built | Project case-study template — hero | Product hero screenshot (per project) | 16:9 | Deferred — template built in Stage 4, no live project route yet |
| IMG-09 | Built | Project case-study template — product/flow | Product or flow screenshot (per project) | 16:10 | Deferred — same as above |
| IMG-10 | Built | Project case-study template — supporting visual | Supporting diagram/screenshot (per project) | 3:2 | Deferred — same as above |

Every new placeholder added in a later stage must get a row here. Do not source stock imagery,
generate AI imagery, or invent screenshots/diagrams/photographs — use `MediaPlaceholder` until a
real asset exists.
