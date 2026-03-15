import { enforceEnv } from "@repo/validators";
import z from "zod";

const dbEnvSchema = z.object({
  DATABASE_URL: z.url({
    error: (issue) =>
      issue.input === undefined
        ? '"DATABASE_URL" is required.'
        : '"DATABASE_URL" must be a valid URL.',
  }),
});

export const env = enforceEnv(dbEnvSchema, process.env);
