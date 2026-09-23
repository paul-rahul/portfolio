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
				id: "cisco-translation-validator",
				title: "AI Sales Enablement — Translation Validator",
				descriptor: "Translation-validation POC for AI sales enablement",
				period: "Jun — Aug 2026",
				summary:
					"A proof of concept that catches meaning drift in translated AI sales content before it ships, paired with a roadmap and launch messaging to make the underlying AI capability legible to a sales audience.",
				metrics: [
					["15%", "Token reduction"],
					["50", "Stakeholders"],
					["6 mo.", "Roadmap"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						paragraphs: [
							"Cisco's AI sales enablement work depended on translated content staying faithful to its source meaning across languages and audiences — a mismatch anywhere in that chain risked shipping messaging sales couldn't trust.",
						],
						bullets: [
							"User challenge: sales teams needed confidence that translated AI messaging said what it was supposed to say.",
							"Business impact: unvalidated translations put an AI sales enablement launch tied to a global keynote at risk.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: [
							"Built a translation-validation proof of concept using Cursor and Claude Code, then widened the aperture: gathered input from 50 stakeholders across the org and used it to shape a six-month roadmap.",
						],
						bullets: [
							"What I prioritized: a working validation POC before broader roadmap conversations.",
							"Who I worked with: 50 stakeholders across product marketing and engineering.",
						],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: [
							"The POC checks translated AI sales content against its source meaning, flagging drift before it reaches a sales-facing asset. Components from the POC were reused across four internal tools.",
						],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: Cursor, Claude Code.", "Product decisions: prioritized a working POC ahead of a full roadmap, then let stakeholder input shape the six-month plan."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: [
							"15% reduction in token cost from the validation approach.",
							"Messaging work shaped the CMO's global keynote (Aug 2026) — Cisco's messaging, informed by this work.",
						],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: [
							"Left the program at internship end without visibility into whether the north-star metrics defined during the roadmap work were tracked afterward — a real limit of a fixed-term internship worth stating plainly rather than glossing over.",
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
				roleLabel: "Product Manager, ML Applications",
				summary: "A new in-app advertising surface built as a fresh monetization line, aligning product, data science, engineering and commercial teams around a single launch.",
				metrics: [
					["$8M", "Revenue · first 60 days"],
					["$20M", "Revenue · 1-year mark"],
					["5%", "Retention lift"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						bullets: [
							"User challenge: introduce advertising without eroding the product experience users already trusted.",
							"Business impact: the company needed a new, ML-informed monetization line distinct from existing revenue streams.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						bullets: [
							"What I prioritized: a launch that held up across product, data science, engineering and commercial functions at once.",
							"Who I worked with: product, data science, engineering and commercial teams.",
						],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["An in-app advertising surface backed by ML targeting, launched as a new line of monetization inside the existing product."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Product decisions: aligned cross-functional teams around one launch rather than sequencing monetization and retention work separately."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["$8M in revenue within the first 60 days.", "$20M in revenue at the 1-year mark.", "5% lift in retention."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Translating model behavior into operator-facing workflows, adoption metrics and a roadmap teams could actually execute against."],
					},
				],
			},
			{
				id: "dream11-ml-platform",
				title: "ML Application Platform",
				descriptor: "Internal platform for operator-facing model workflows",
				period: "Feb — Aug 2025",
				roleLabel: "Product Manager, ML Applications",
				summary: "A separate internal platform that made ML model workflows usable for operators, scaling from 8 to 100+ daily active users.",
				metrics: [
					["100+", "Daily active users"],
					["$500K", "Annual savings"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						bullets: [
							"User challenge: operators needed to work with ML models without needing ML expertise to do it.",
							"Business impact: manual, ad hoc model workflows were costing time and money at scale.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Built a separate ML application platform, growing usage from 8 to 100+ daily users over the course of the role."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["An internal platform that turns model workflows into operator-facing tools, used daily by 100+ people."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Product decisions: designed the platform around operator adoption, not just model capability."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["Scaled from 8 to 100+ daily active users.", "Approximately $500K in annual savings."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Adoption is the real bottleneck for internal ML tooling — translating model behavior into workflows people actually use daily mattered more than model accuracy alone."],
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
				roleLabel: "Product & GTM",
				summary:
					"Buyer and market research that clarified high-value use cases and go-to-market direction for an LLM platform serving government and enterprise buyers — a GTM and research role, not build ownership.",
				metrics: [
					["$700K", "New ARR"],
					["B2B", "Buyer research"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						bullets: [
							"User challenge: government and enterprise buyers needed a clear case for adopting an LLM platform in contexts with real institutional constraints.",
							"Business impact: without clear decision criteria, high-value use cases were hard to prioritize or sell.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: [
							"Led buyer and market research to clarify which use cases mattered most and what decision criteria buyers actually used — this was a GTM and research role, not build ownership on the platform itself.",
						],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["Bridged the platform's technical capabilities with the language, proof points and workflows government and enterprise buyers needed to evaluate it."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: B2B buyer research methodology.", "Product decisions: go-to-market direction, not platform architecture."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["$700K in new ARR attributable to the go-to-market direction."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["The distinction between GTM/research ownership and build ownership matters — being precise about which one a role actually was builds more credibility than blurring the two."],
					},
				],
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
				summary: "An org-wide feature-flag A/B testing platform with role-based access controls, turning one-off experimentation into a repeatable system.",
				metrics: [
					["30", "Experiments · 6 months"],
					["RBAC", "Access control"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						bullets: [
							"User challenge: teams across the org needed to run experiments reliably without stepping on each other's changes.",
							"Business impact: without a shared platform, experimentation stayed ad hoc and slow.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Launched an experimentation platform with role-based access controls, giving teams a shared, governed way to run feature-flag experiments."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["A feature-flag system with RBAC that let teams run and manage their own experiments within guardrails, rather than routing every experiment through a central bottleneck."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: feature-flag experimentation platform, role-based access controls."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["30 experiments run in 6 months.", "Role-based access controls in place org-wide."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Turning one-off experimentation into a repeatable system pays off in velocity — the platform mattered more than any single experiment run on it."],
					},
				],
			},
			{
				id: "medianet-traffic-optimizer",
				title: "B2B Ad Traffic Optimizer",
				descriptor: "Traffic optimizer generating $35M revenue at 70% lower cost",
				period: "Jul 2023 — Jul 2024",
				roleId: "medianet-apm",
				roleLabel: "Associate Product Manager",
				summary: "A B2B traffic optimizer that turned experimentation and traffic intelligence into a repeatable product system for advertising teams.",
				metrics: [
					["$35M", "Traffic optimizer revenue"],
					["70%", "Cost reduction"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						bullets: [
							"User challenge: advertising teams needed traffic routed more efficiently to control cost while protecting revenue.",
							"Business impact: inefficient traffic allocation directly ate into margin.",
						],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Turned experimentation and traffic intelligence into a repeatable product system rather than one-off optimizations for advertising teams."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["A B2B traffic optimizer that routes ad traffic based on ongoing experimentation and traffic intelligence, generating revenue while cutting cost."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: traffic intelligence and experimentation infrastructure."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["$35M in revenue from the traffic optimizer.", "70% reduction in cost."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Revenue and cost aren't a trade-off when the underlying system is built well — the optimizer grew revenue and cut cost at the same time."],
					},
				],
			},
			{
				id: "medianet-apac-gtm",
				title: "APAC Go-to-Market Launch",
				descriptor: "APAC expansion across 11 new customers",
				period: "Jul 2023 — Jul 2024",
				roleId: "medianet-apm",
				roleLabel: "Associate Product Manager",
				summary: "Supported an APAC go-to-market launch with customer and market insight grounded in product performance data.",
				metrics: [
					["$40M", "Revenue · APAC launch"],
					["11", "New customers"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						paragraphs: ["Expanding into APAC required a go-to-market narrative that new customers in the region would find credible and relevant."],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Supported the APAC go-to-market launch with customer and market insight grounded in how the product was actually performing, not just its feature set."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["Product performance data fed directly into the commercial narrative used to win new APAC customers."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Product decisions: grounded GTM messaging in measured product performance rather than positioning alone."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["$40M in revenue from the APAC launch.", "11 new customers onboarded."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Commercial narratives land harder when they're built on real product performance data instead of marketing claims."],
					},
				],
			},
			{
				id: "medianet-bid-prediction",
				title: "Ad Pricing Optimizer — Bid Prediction Model",
				descriptor: "ML bid-prediction model and the HDFS pipelines behind it",
				period: "Jul 2021 — Jul 2023",
				roleId: "medianet-sde",
				roleLabel: "Software Development Engineer",
				summary: "The ML and data foundation behind Media.net's advertising pricing: a bid-prediction model built on large-scale HDFS pipelines.",
				metrics: [
					["$80M", "Revenue · 12 months"],
					["5TB/day", "HDFS pipelines"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						paragraphs: ["Advertising pricing needed a reliable way to predict bids at scale, built on data pipelines that could keep up with the volume."],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Developed a bid-prediction ML model to power an advertising pricing optimizer, and built and operated the large-scale data pipelines it depended on."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["A bid-prediction model feeds an advertising pricing optimizer, running on Python and Spark SQL against data pipelines processing terabytes per day from HDFS."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: Python, Spark SQL, HDFS.", "Worked close to the model, infrastructure and business logic simultaneously."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: ["$80M in revenue over 12 months.", "5TB/day processed through HDFS pipelines."],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Working close to the model, infrastructure and business logic at once is experience I now use directly to set realistic product direction."],
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
				title: "Camera Intelligence — Night Mode & Color Science",
				descriptor: "Computer vision and color science for flagship devices",
				period: "Jun 2019 — Jul 2021",
				roleLabel: "ML Engineer",
				summary: "Computer vision and color science work behind Night Mode and color tuning, shipped across 25M+ flagship devices.",
				metrics: [
					["25M+", "Flagship devices"],
					["CV", "Night Mode"],
				],
				sections: [
					{
						id: "problem",
						title: "The problem",
						defaultOpen: true,
						paragraphs: ["A flagship camera line needed low-light performance and color accuracy that held up at mass-market scale, not just in a lab."],
					},
					{
						id: "approach",
						title: "How I approached it",
						defaultOpen: false,
						paragraphs: ["Applied computer vision to low-light imaging (Night Mode) and color science to color-tuning capabilities, balancing research quality against hardware constraints."],
					},
					{
						id: "how-it-works",
						title: "How the product works",
						defaultOpen: false,
						paragraphs: ["Computer vision techniques improve image quality in low light for Night Mode; color-tuning capability shapes how the camera renders color across the flagship line."],
					},
					{
						id: "tools",
						title: "Tools and product decisions",
						defaultOpen: false,
						bullets: ["Tools / systems: computer vision, color science.", "Balanced research quality, hardware constraints and mass-market product expectations."],
					},
					{
						id: "impact",
						title: "Impact to users",
						defaultOpen: true,
						bullets: [
							"Color-tuning capability shipped across 25M+ flagship devices.",
							"Contributed to Night Mode work on a device line associated with $1B in sales.",
						],
					},
					{
						id: "learned",
						title: "What I learned",
						defaultOpen: false,
						paragraphs: ["Learned to balance research quality, hardware constraints and the expectations of a mass-market product — a different discipline than research alone."],
					},
				],
			},
		],
	},
];

export const sectionOrder = ["problem", "approach", "how-it-works", "tools", "impact", "learned"] as const;
