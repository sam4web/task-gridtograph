import path from "node:path";
import { enforceEnv } from "@repo/validators";
import * as dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const apiEnvSchema = z.object({
	PORT: z.coerce
		.number({
			error: (issue) =>
				issue.input === undefined
					? '"PORT" is required.'
					: '"PORT" must be a number.',
		})
		.int()
		.positive('"PORT" must be a positive integer.'),

	ENV: z.enum(["development", "production"], {
		error: (issue) =>
			issue.input === undefined
				? '"ENV" is required.'
				: '"ENV" must be "development" or "production".',
	}),

	ALLOWED_ORIGINS: z
		.string()
		.transform((str) => new Set(str.split(",").map((s) => s.trim())))
		.refine(
			(urls) => {
				for (const url of urls) {
					if (!z.url().safeParse(url).success) return false;
				}
				return true;
			},
			{
				message:
					'"ALLOWED_ORIGINS" must be a valid URL (or URLs separated by commas).',
			},
		),

	ACCESS_TOKEN_SECRET: z
		.string("ACCESS_TOKEN_SECRET is required.")
		.min(1, { message: "ACCESS_TOKEN_SECRET cannot be empty." }),

	REFRESH_TOKEN_SECRET: z
		.string("REFRESH_TOKEN_SECRET is required.")
		.min(1, { message: "REFRESH_TOKEN_SECRET cannot be empty." }),

	REFRESH_TOKEN_EXPIRY_TIME: z
		.string()
		.min(1, '"REFRESH_TOKEN_EXPIRY_TIME" is required.')
		.regex(
			/^\d+[a-zA-Z]+$/,
			"\"REFRESH_TOKEN_EXPIRY_TIME\" must be a number followed by a time unit (e.g., '10d', '5h', '30m').",
		),

	ACCESS_TOKEN_EXPIRY_TIME: z
		.string()
		.min(1, { message: "ACCESS_TOKEN_EXPIRY_TIME is required." })
		.regex(
			/^\d+[a-zA-Z]+$/,
			"\"ACCESS_TOKEN_EXPIRY_TIME\" must be a number followed by a time unit (e.g., '2d', '1h', '30m').",
		),
});

export const env = enforceEnv(apiEnvSchema, process.env);
