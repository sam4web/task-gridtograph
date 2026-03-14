import { enforceEnv } from "@repo/validators";
import z from "zod";

const webEnvSchema = z.object({
	VITE_ENV: z.enum(["development", "production"], {
		error: (issue) =>
			issue.input === undefined
				? '"VITE_ENV" is required.'
				: '"VITE_ENV" must be "development" or "production".',
	}),
	VITE_API_BASE_URL: z.url({
		error: (issue) =>
			issue.input === undefined
				? '"VITE_API_BASE_URL" is required.'
				: '"VITE_API_BASE_URL" must be a valid URL.',
	}),
});

export const env = enforceEnv(webEnvSchema, import.meta.env);
