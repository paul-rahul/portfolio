export interface AccordionSection {
	id: string;
	title: string;
	defaultOpen: boolean;
	paragraphs?: string[];
	bullets?: string[];
}

export interface Project {
	id: string;
	title: string;
	descriptor: string;
	period: string;
	roleId?: string;
	roleLabel?: string;
	summary: string;
	metrics: [string, string][];
	sections: AccordionSection[];
}

export interface FirmRole {
	id: string;
	title: string;
	period: string;
	summary: string;
}

export interface Firm {
	id: string;
	name: string;
	period: string;
	roleSummary: string;
	roles: FirmRole[];
	projects: Project[];
}

export const firms: Firm[] = [
	{
		id: "cisco",
		name: "Cisco",
		period: "Jun — Aug 2026",
		roleSummary: "Product Marketing MBA Intern",
		roles: [
			{
				id: "cisco-intern",
				title: "Product Marketing MBA Intern",
				period: "Jun — Aug 2026",
				summary:
					"Built a translation-validation proof of concept, shaped a six-month roadmap with broad stakeholder input, and developed launch messaging for AI sales enablement.",
			},
		],
		projects: [
			{
				id: "cisco-ai-sales-agent",
				title: "AI Sales Enablement Agent",
				descriptor: "Roadmap, stakeholder alignment and personas for a sales-facing AI agent",
				period: "Jun — Aug 2026",
				summary: "A six-month roadmap and persona-driven UX flow for an AI sales enablement agent, built on a 50-person stakeholder alignment process.",
				metrics: [
					["50", "Stakeholders"],
					["6 mo.", "Roadmap"],
					["5+", "Personas defined"],
				],
				sections: [
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						bullets: [
							"Defined a six-month roadmap and interfaced with engineering on technical feasibility, which changed the design flow and end-user interaction.",
							"Ran a stakeholder alignment process across 50 people spanning sales, localization and content teams to pressure-test what \"good enough\" looked like before proposing the roadmap.",
							"Defined 5+ core personas from that research, and defined a post-research UX flow that shipped as designed.",
						],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						paragraphs: [
							"Launch materials and positioning from this work went live as part of Cisco's global CMO keynote on August 24.",
						],
					},
				],
			},
			{
				id: "cisco-translation-validator",
				title: "Translation Validator",
				descriptor: "Translation-validation POC catching meaning drift before content ships",
				period: "Jun — Aug 2026",
				summary: "A proof of concept that checks translated sales content against its source meaning before it ships, used directly by sales teams.",
				metrics: [["15%", "Token reduction"]],
				sections: [
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: [
							"Built using Cursor and Claude Code as a proof of concept that validates translations without re-running full inference on every piece of content.",
						],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						bullets: [
							"Checks translated sales content against source meaning at the point of publish, flagging drift for human review rather than blocking output.",
							"Sits inside the existing content pipeline rather than replacing it.",
							"Used directly by sales teams as an end product, not just an internal engineering utility.",
							"Engineering later reused the underlying logic across internal tools.",
						],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						bullets: [
							"Gave sales teams a credible way to trust AI-translated content at scale.",
							"Engineering separately reused the validator's underlying logic across other internal tools.",
						],
					},
				],
			},
		],
	},
	{
		id: "dream11",
		name: "Dream11",
		period: "Feb — Aug 2025",
		roleSummary: "Product Manager, ML Applications",
		roles: [
			{
				id: "dream11-pm",
				title: "Product Manager, ML Applications",
				period: "Feb — Aug 2025",
				summary:
					"Owned two ML-backed product bets: a new in-app advertising surface and an internal platform that made model workflows easier for operators to use.",
			},
		],
		projects: [
			{
				id: "dream11-ads",
				title: "In-App Advertising Launch",
				descriptor: "New ML-backed monetization surface",
				period: "Feb — Aug 2025",
				summary: "A new in-app advertising surface built as a fresh monetization line, aligning product, data science, engineering and commercial teams around a single launch.",
				metrics: [
					["$8M", "Revenue · first 60 days"],
					["$20M", "Revenue · 1-year mark"],
					["5%", "Retention lift"],
				],
				sections: [
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						bullets: [
							"Negotiated pricing-model and impression-counting definitions directly with Legal.",
							"Partnered directly with Data Science, who set the quality benchmarks — I pressure-tested and signed off on those benchmarks before launch.",
							"250M-user segmentation and cohort experiments fed targeting and placement testing for this same launch, not a separate initiative.",
						],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["ML-backed ad targeting matched ads to user context rather than static inventory, operating on a 250M+ user platform."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						bullets: [
							"$8M in revenue in the first 60 days.",
							"$20M in revenue at the 1-year mark.",
							"5% retention lift attributed to the launch — the only platform change introduced at the time.",
						],
					},
				],
			},
			{
				id: "dream11-ml-platform",
				title: "ML Application Platform",
				descriptor: "Internal platform for operator-facing model workflows",
				period: "Feb — Aug 2025",
				summary: "A separate internal platform that made ML model workflows usable for operators, scaling from 8 to 100+ daily active users.",
				metrics: [
					["100+", "Daily active users · from 8"],
					["$500K", "Annual savings"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: false,
						bullets: [
							"Operators needed to work with ML models without ML expertise.",
							"Manual, ad hoc workflows were costing time and money at scale.",
						],
					},
				],
			},
		],
	},
	{
		id: "samagra",
		name: "Samagra",
		period: "Aug 2024 — Jan 2025",
		roleSummary: "Product & GTM",
		roles: [
			{
				id: "samagra-gtm",
				title: "Product & GTM",
				period: "Aug 2024 — Jan 2025",
				summary: "Used buyer research and go-to-market strategy to shape adoption for an LLM platform serving government and enterprise contexts.",
			},
		],
		projects: [
			{
				id: "samagra-llm-gtm",
				title: "LLM Platform Go-to-Market",
				descriptor: "Buyer research and GTM for a government/enterprise LLM platform",
				period: "Aug 2024 — Jan 2025",
				summary: "Buyer and market research that clarified high-value use cases and go-to-market direction for an LLM platform serving government and enterprise buyers.",
				metrics: [
					["$700K", "New ARR"],
					["B2B", "Buyer research"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: false,
						paragraphs: ["Government and enterprise buyers needed a clear case for adopting an LLM platform inside real institutional constraints."],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						bullets: [
							"A GTM and research role, not build ownership — ran buyer and market research to surface which use cases mattered to government and enterprise buyers.",
							"The $700K ARR client came through a formal sales process — demos, discovery calls, pitching decision-makers — not a relationship-driven deal.",
						],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						paragraphs: ["$700K in new ARR from B2B."],
					},
				],
			},
			{
				id: "samagra-student-assessment-app",
				title: "Student Assessment App Launch",
				descriptor: "Fresh-launch GTM strategy from a zero baseline",
				period: "Aug 2024 — Jan 2025",
				summary: "A fresh-launch go-to-market strategy from a zero baseline — a 0-to-200K-teacher story in two months, not growth off an existing base.",
				metrics: [["0 → 200K", "Teachers · 2 months"]],
				sections: [],
			},
		],
	},
	{
		id: "medianet",
		name: "Media.net",
		period: "Jul 2021 — Jul 2024",
		roleSummary: "Associate Product Manager · Software Development Engineer",
		roles: [
			{
				id: "medianet-apm",
				title: "Associate Product Manager",
				period: "Jul 2023 — Jul 2024",
				summary: "Turned experimentation and traffic intelligence into repeatable product systems for advertising teams.",
			},
			{
				id: "medianet-sde",
				title: "Software Development Engineer",
				period: "Jul 2021 — Jul 2023",
				summary: "Built the ML and data foundation that later informed how I lead products.",
			},
		],
		projects: [
			{
				id: "medianet-experimentation-platform",
				title: "Feature-Flag Experimentation Platform",
				descriptor: "Org-wide A/B testing platform with role-based access",
				period: "Jul 2023 — Jul 2024",
				roleId: "medianet-apm",
				roleLabel: "Associate Product Manager",
				summary: "An org-wide feature-flag A/B testing platform with role-scoped access, built around role-based access as the core design decision.",
				metrics: [
					["30", "Experiments · 6 months"],
					["RBAC", "Access control"],
				],
				sections: [
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						bullets: [
							"An org-wide A/B testing platform with role-scoped access and permissions.",
							"Reduced the time to start and monitor experiments, and ensured mutual exclusivity by design — experiments don't collide.",
							"RBAC was introduced specifically to govern sensitive data on the platform.",
							"Within 6 months of launch it was running 30 experiments.",
						],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						paragraphs: ["Role-based access was the core design decision — the platform's actual differentiator, not just a nice-to-have."],
					},
				],
			},
			{
				id: "medianet-traffic-optimizer",
				title: "B2B Ad Traffic Optimizer",
				descriptor: "Traffic-shaping system generating $35M revenue at 70% lower cost",
				period: "Jul 2023 — Jul 2024",
				roleId: "medianet-apm",
				roleLabel: "Associate Product Manager",
				summary: "A traffic-shaping system that reallocates ad traffic-acquisition spend toward higher-yield sources.",
				metrics: [
					["$35M", "Revenue"],
					["70%", "Lower cost"],
				],
				sections: [
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["Shapes and reallocates traffic-acquisition spend based on yield signals, lowering cost per unit of revenue generated."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						paragraphs: ["$35M in revenue at 70% lower cost than the prior approach."],
					},
				],
			},
			{
				id: "medianet-apac-gtm",
				title: "APAC Go-to-Market Launch",
				descriptor: "Competitive analysis and launch strategy for APAC expansion",
				period: "Jul 2023 — Jul 2024",
				roleId: "medianet-apm",
				roleLabel: "Associate Product Manager",
				summary: "A competitive analysis and go-to-market plan that secured executive buy-in for Media.net's APAC expansion.",
				metrics: [["11", "New customers"]],
				sections: [
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						bullets: [
							"Built a competitive analysis covering 5 competitors — 3 similar-size, 2 larger players.",
							"This was a core standalone deliverable that secured executive buy-in for the launch.",
							"Followed by a detailed channel strategy, partnership strategy, and go-to-market plan.",
						],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						paragraphs: ["11 new customers from the APAC expansion."],
					},
				],
			},
			{
				id: "medianet-bid-prediction",
				title: "Ad Pricing Optimizer: Dynamic Margin Management",
				descriptor: "Bid-prediction ML model for real-time margin management",
				period: "Jul 2021 — Jul 2023",
				roleId: "medianet-sde",
				roleLabel: "Software Development Engineer",
				summary: "A bid-prediction ML model that sets margins dynamically inside the real-time ad-exchange bidding process, on the demand side.",
				metrics: [["5TB/day", "Ad-transaction data processed"]],
				sections: [
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Built the underlying bid-prediction ML model that powers dynamic margin management."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: [
							"The bid-prediction model sets margins dynamically as part of the demand-side, real-time ad-exchange bidding process, rather than using fixed or manually-set margins.",
						],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Built in Python, processing 5TB of ad-transaction data daily, extracted via Spark SQL from HDFS."],
					},
				],
			},
		],
	},
	{
		id: "samsung",
		name: "Samsung Research",
		period: "Jun 2019 — Jul 2021",
		roleSummary: "ML Engineer",
		roles: [
			{
				id: "samsung-ml-engineer",
				title: "ML Engineer",
				period: "Jun 2019 — Jul 2021",
				summary: "Applied computer vision and color science to flagship mobile experiences at global scale.",
			},
		],
		projects: [
			{
				id: "samsung-camera-intelligence",
				title: "Camera Intelligence: Night Mode & Color Science",
				descriptor: "Computer vision and color science for flagship devices",
				period: "Jun 2019 — Jul 2021",
				summary: "Computer vision and color science work behind Night Mode and color tuning, shipped across 25M+ flagship devices.",
				metrics: [
					["25M+", "Flagship devices"],
					["CV", "Night Mode"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: false,
						paragraphs: ["A flagship camera line needed low-light performance and color accuracy that held up at mass-market scale, not just in a lab."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: false,
						paragraphs: ["Shipped across 25M+ flagship devices."],
					},
				],
			},
		],
	},
];

export const sectionOrder = ["problem", "approach", "how-it-works", "tools", "impact", "learned"] as const;
