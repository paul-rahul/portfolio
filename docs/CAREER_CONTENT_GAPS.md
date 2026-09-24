# Career Content Gaps

Internal tracker for the Career page content-population pass (v2). Source of truth is
`career-section-content(2).md` (not in this repo — lives in Rahul's Downloads). Do not expose
this file publicly; the live site never shows "coming soon"/"TBD"/gap-notice text — every
project's six accordion sections always render, and an unconfirmed one simply expands to an
empty body (see `DESIGN.md`'s "Blank accordion section rule").

Legend: 🟢 = confirmed and published. 🟡 = flagged in the source as needing Rahul's input, not
published — the accordion row exists but is blank when expanded.

## Count note

The source's own summary line says "13 projects," but explicitly names 14: Cisco (2), Dream11
(2), Samagra (2), Media.net (5), Samsung Research (3). All 14 are represented on the site — the
plan is explicit that this is a source counting/documentation slip, not a signal to drop a named
project, so nothing was omitted to force the count to match.

## Gap tracker (priority order from the source)

| Priority | Firm | Project | Section | Missing input |
|---|---|---|---|---|
| 1 | Samsung Research | Super Slow-Motion Feature | 01 The problem, 03 How the product works, 04 Tools and product decisions | Almost entirely blank below the impact line despite being a headline, cross-border, 1-of-20-selected story — currently the least developed project on the page relative to how distinctive it is. |
| 2 | Media.net | AI User Targeting Module | 01 The problem, 03 How the product works, 04 Tools and product decisions | What targeting gap the module closed and how it actually worked. Only the business-case/spec/3-person-team approach and the ROAS/ranking impact are confirmed. |
| 3 | Samsung Research | Night Mode | 03 How the product works, 04 Tools and product decisions | Actual mechanics of the low-light capture approach — the strongest technical story on the page, currently thin below the approach line. |
| 4 | Media.net | B2B Ad Traffic Optimizer | 01 The problem, 02 How I approached it, 04 Tools and product decisions | Still genuinely empty apart from how-it-works/impact — what the traffic-shaping mechanism was actually built on (rules engine, separate model, different stack) is unconfirmed. |
| 5 | Samagra | Student Assessment App Launch | 03 How the product works | Explicitly a GTM/rollout project, not a build — what "tailoring the strategy" meant in practice (per-district materials, direct outreach, etc.) is unconfirmed. |
| 6 | Samsung Research | Color-Tuning Module | 01 The problem, 03 How the product works, 04 Tools and product decisions | The latency/quality tradeoff is confirmed as the problem being solved, but how it was solved, and what Rahul owned vs. the Korean/Vietnamese teams, is not. |
| 7 | Cisco | AI Sales Enablement Agent | 01 The problem, 03 How the product works, 04 Tools and product decisions | What gap the Agent closed and what it did for a rep day-to-day. |
| 8 | Cisco | Translation Validator | 01 The problem, 04 Tools and product decisions | Problem framing is a plausible inference, not confirmed in Rahul's words; the "lightweight validation vs. full re-translation" design-intent read is likewise plausible but unconfirmed. |
| 9 | Dream11 | In-App Advertising Launch | 01 The problem, 04 Tools and product decisions | Why ML-driven targeting specifically, over simpler static placement, still needs Rahul's framing. |
| 10 | Dream11 | ML Application Platform | 03 How the product works, 04 Tools and product decisions | What the redesigned developer experience actually let an operator do that the old workflow didn't. |
| 11 | Samagra | LLM Platform Go-to-Market | 04 Tools and product decisions | Actual research method and what changed as a result — section 03 uses the contextual label "How the research translated to GTM direction" but has no additional confirmed body beyond what's already under 02. |
| 12 | Media.net | Feature-Flag Experimentation Platform | 01 The problem, 02 How I approached it, 05 Impact to users | Problem framing (siloed/ungoverned experimentation) is a likely inference, not confirmed. No dashboard/BI/reporting-efficiency metric is confirmed for impact — do not add one without checking with Rahul first. |
| 13 | Media.net | APAC Go-to-Market Launch | 01 The problem, 04 Tools and product decisions | Section 03 uses the contextual label "Launch approach" but has no confirmed body beyond the competitive-analysis content already under 02. Specific channel tactics and partnership terms are unconfirmed. |
| 14 | Media.net | Ad Pricing Optimizer: Dynamic Margin Management | 01 The problem, 05 Impact to users | Problem framing (dynamic vs. static/manual margins) is a reasonable inference, not confirmed. No impact metric confirmed for this specific project — the $35M/70% figure belongs to the Traffic Optimizer instead. |
| 15 | All 14 projects | — | 06 What I learned | Every single project's "What I learned" is unconfirmed — reflective content only Rahul can write. None are published; none should be drafted speculatively. |

## Resolved since v1 of this tracker

- **Media.net APAC Go-to-Market — revenue figure.** v1 flagged a conflict over a previously
  -published $40M figure the older source didn't confirm. The new source explicitly confirms
  $40M in revenue across 11 new customers within 6 months — restored to the site, no longer a
  conflict.
- **Samsung "$1B device-line sales."** v1 flagged this as unconfirmed for the combined "Camera
  Intelligence" project. The new source splits Samsung into three distinct projects and
  explicitly confirms $1B contribution specifically for **Night Mode** (not Color-Tuning or
  Super Slow-Motion) — published there, no longer a conflict.

## Still unresolved from v1

- **Media.net Ad Pricing Optimizer — no confirmed impact metric.** Still true in the new source;
  the project shows only the 5TB/day processing-volume metric.
