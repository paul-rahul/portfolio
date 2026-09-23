# Career Content Gaps

Internal tracker for the Career page content-population pass. Source of truth for what's
confirmed vs. missing is `career-section-content.md` (not in this repo — lives in Rahul's
Downloads). Do not expose this file publicly; it exists to make gaps visible, not to describe
them on the live site.

Legend: 🟢 = confirmed and published. 🟡 = flagged in the source as needing Rahul's input, not
published. Sections/metrics not listed as "confirmed" below were intentionally omitted from the
live page rather than filled with inferred or invented content.

## Gap tracker

| Priority | Firm | Project | Section | Missing input |
|---|---|---|---|---|
| 1 | Samagra | Student Assessment App Launch | All (01–06) | Only the 0→200K-teacher fresh-launch framing is confirmed. Problem, Rahul's specific role, how the app worked, what drove the adoption curve, tools/decisions, and learnings all need his input. Highest-priority gap — this project currently shows a summary + one metric and no accordion at all. |
| 2 | Media.net | B2B Ad Traffic Optimizer | 04 Tools and product decisions | What the traffic-shaping mechanism itself was built on (rules engine, a separate model, a different stack) — not yet confirmed. Also 01 The problem and 02 How I approached it. |
| 3 | Samsung Research | Camera Intelligence | 02 How I approached it, 03 How the product works, 04 Tools and product decisions | Rahul's strongest technical story is currently the thinnest section on the site. What specifically differentiated the mass-market approach from a lab-only model is the one worth his actual time to answer. |
| 4 | Dream11 | ML Application Platform | 02–06 (everything past the problem statement) | What the interface actually let operators do, what Rahul built vs. spec'd, and what broke scaling from 8 to 100+ users. Nothing beyond the two stats has surfaced yet. |
| 5 | All projects | — | 06 What I learned | Every single project's "What I learned" is unconfirmed — reflective content only Rahul can write. None are published; none should be drafted speculatively. |
| 6 | Cisco | AI Sales Enablement Agent | 01 The problem, 03 How the product works, 04 Tools and product decisions | What gap the Agent actually closed, what it did for a rep day-to-day, and which tools/decisions shaped it. |
| 7 | Cisco | Translation Validator | 01 The problem, 04 Tools and product decisions | The problem framing is a reasonable inference but not confirmed in Rahul's own words. The "lightweight validation over full re-translation, to hit 15% token reduction" design-intent read is plausible but unconfirmed. |
| 8 | Samagra | LLM Platform Go-to-Market | 03 (contextual: "How the research translated to GTM direction"), 04 Tools and product decisions | No confirmed content exists for either — section 03 is omitted entirely rather than shown with a relabeled empty body. |
| 9 | Media.net | Feature-Flag Experimentation Platform | 01 The problem, 02 How I approached it, 05 Impact to users | Problem framing (siloed/ungoverned experimentation) is a likely inference, not confirmed. No dashboard/BI/reporting-efficiency metric is confirmed for impact — do not add one without checking with Rahul first. |
| 10 | Media.net | APAC Go-to-Market Launch | 01 The problem, 03 (contextual: "Launch approach"), 04 Tools and product decisions | Section 03 omitted — no confirmed launch-process content beyond the competitive-analysis work already shown under 02. Specific channel tactics and partnership terms still need input. |
| 11 | Media.net | Ad Pricing Optimizer: Dynamic Margin Management | 01 The problem, 05 Impact to users | Problem framing (dynamic margins vs. static/manual) is a reasonable inference, not confirmed. No impact metric confirmed for this project specifically — see conflict below. |

## Flagged conflicts with previously-published content

These three figures were live on the Career page before this content-population pass, sourced
from an earlier, less granular memory file (`experience_data_reconciled.md`). The new source
(`career-section-content.md`) is explicitly authoritative for this task and does not confirm any
of them for the projects they were previously attached to — so they were removed rather than
carried forward. Flagging instead of silently dropping, per the plan's "stop and document
conflicts rather than reconcile silently" rule:

- **Media.net APAC Go-to-Market Launch — $40M revenue.** Previously shown alongside "11 new
  customers." The new source confirms only the customer count; no revenue figure is confirmed for
  this project. Removed pending Rahul's confirmation of which figure (if any) is accurate.
- **Media.net Ad Pricing Optimizer — $80M revenue over 12 months.** Previously attributed to the
  bid-prediction model. The new source explicitly states no impact stat is confirmed for this
  project (the $35M/70% figure belongs to the Traffic Optimizer instead) and asks what the actual
  measurable outcome of the margin-management work was. Removed; only the 5TB/day processing
  volume remains as a metric.
- **Samsung Research — "$1B device-line sales, contributed."** Previously shown as a softened
  secondary metric alongside 25M+ devices. The new source confirms only the 25M+ device-shipment
  figure for this project's impact section. Removed pending confirmation of whether the $1B
  framing should be reinstated.

## Not yet built (structural, not content)

- Samagra's Student Assessment App Launch has an intentionally empty accordion (`sections: []`)
  rather than six unpopulated headings — the Astro template (`src/pages/career/index.astro`) now
  skips rendering the accordion block entirely when a project has zero confirmed sections, so no
  misleading "coming soon" copy or empty panel shells appear on the live page.
