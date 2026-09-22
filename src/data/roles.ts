export interface Stint {
	title: string;
	period: string;
	summary: string;
	metrics: [string, string][];
	outcomes: string[];
}

export interface Role {
	id: string;
	company: string;
	period: string;
	stints: Stint[];
}

export const roles: Role[] = [
	{
		id: "cisco",
		company: "Cisco",
		period: "Jun — Aug 2026",
		stints: [
			{
				title: "Product Marketing MBA Intern",
				period: "Jun — Aug 2026",
				summary:
					"Built a translation-validation proof of concept, shaped a six-month roadmap with broad stakeholder input, and developed launch messaging for AI sales enablement.",
				metrics: [
					["15%", "Token reduction"],
					["50", "Stakeholders"],
					["6 mo.", "Roadmap"],
				],
				outcomes: [
					"Built a translation-validation proof of concept for AI sales enablement.",
					"Shaped a six-month roadmap grounded in input from 50 stakeholders.",
					"Developed launch messaging that made the AI capability legible to a sales audience.",
				],
			},
		],
	},
	{
		id: "dream11",
		company: "Dream11",
		period: "Feb — Aug 2025",
		stints: [
			{
				title: "Product Manager, ML Applications",
				period: "Feb — Aug 2025",
				summary:
					"Owned two ML-backed product bets: a new in-app advertising surface and an internal platform that made model workflows easier for operators to use.",
				metrics: [
					["$8M", "Revenue · first 60 days"],
					["$20M", "Revenue · 1-year mark"],
					["5%", "Retention lift"],
				],
				outcomes: [
					"Launched in-app advertising as a new monetization line, aligning product, data science, engineering and commercial teams.",
					"Built a separate ML application platform used by 100+ daily users and delivering approximately $500K in annual savings.",
					"Translated model behavior into operator-facing workflows, adoption metrics and a roadmap teams could execute.",
				],
			},
		],
	},
	{
		id: "samagra",
		company: "Samagra",
		period: "Aug 2024 — Jan 2025",
		stints: [
			{
				title: "Product & GTM",
				period: "Aug 2024 — Jan 2025",
				summary:
					"Used buyer research and go-to-market strategy to shape adoption for an LLM platform serving government and enterprise contexts.",
				metrics: [
					["$700K", "New ARR"],
					["B2B", "Buyer research"],
					["LLM", "Platform GTM"],
				],
				outcomes: [
					"Led buyer and market research to clarify high-value use cases and decision criteria.",
					"Developed go-to-market direction that contributed to $700K in new ARR.",
					"Bridged technical platform capabilities with the language, proof points and workflows buyers needed.",
				],
			},
		],
	},
	{
		id: "medianet",
		company: "Media.net",
		period: "Jul 2021 — Jul 2024",
		stints: [
			{
				title: "Associate Product Manager",
				period: "Jul 2023 — Jul 2024",
				summary: "Turned experimentation and traffic intelligence into repeatable product systems for advertising teams.",
				metrics: [
					["$35M", "Traffic optimizer revenue"],
					["70%", "Cost reduction"],
					["30", "Experiments · 6 months"],
				],
				outcomes: [
					"Shipped a B2B traffic optimizer that generated $35M in revenue while reducing costs by 70%.",
					"Launched an experimentation platform with role-based access controls, supporting 30 experiments in six months.",
					"Supported APAC go-to-market with customer and market insight grounded in product performance.",
				],
			},
			{
				title: "Software Development Engineer",
				period: "Jul 2021 — Jul 2023",
				summary: "Built the ML and data foundation that later informed how I lead products.",
				metrics: [
					["$80M", "Revenue · 12 months"],
					["5TB/day", "HDFS pipelines"],
					["ML", "Bid prediction"],
				],
				outcomes: [
					"Developed a bid-prediction model powering an advertising pricing optimizer that generated $80M over 12 months.",
					"Built and operated large-scale data pipelines processing terabytes per day in HDFS.",
					"Worked close to the model, infrastructure and business logic—experience I now use to set realistic product direction.",
				],
			},
		],
	},
	{
		id: "samsung",
		company: "Samsung Research",
		period: "Jun 2019 — Jul 2021",
		stints: [
			{
				title: "ML Engineer",
				period: "Jun 2019 — Jul 2021",
				summary: "Applied computer vision and color science to flagship mobile experiences at global scale.",
				metrics: [
					["25M+", "Flagship devices"],
					["$1B", "Device-line sales · contributed"],
					["CV", "Night Mode"],
				],
				outcomes: [
					"Contributed to Night Mode work on a device line associated with $1B in sales.",
					"Developed color-tuning capabilities shipped across 25M+ flagship devices.",
					"Learned to balance research quality, hardware constraints and the expectations of a mass-market product.",
				],
			},
		],
	},
];
