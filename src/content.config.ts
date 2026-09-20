import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const metric = z.object({
	value: z.string(),
	whatItMeasured: z.string(),
	source: z.string(),
});

const dateRange = z.object({
	start: z.string(),
	end: z.union([z.string(), z.literal("present")]),
});

const attribution = z.enum(["direct", "softened"]);

const entrySchema = z.object({
	title: z.string(),
	organization: z.string(),
	dateRange,
	attribution,
	metrics: z.array(metric),
	summary: z.string(),
});

const career = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/career" }),
	schema: entrySchema,
});

const internships = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/internships" }),
	schema: entrySchema,
});

const built = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/built" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
	}),
});

const about = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content" }),
	schema: z.object({
		tagline: z.string(),
	}),
});

export const collections = { career, internships, built, about };
