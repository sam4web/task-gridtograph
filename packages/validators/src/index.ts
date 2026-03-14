import z from "zod";

export function enforceEnv<T extends z.ZodTypeAny>(
	schema: T,
	envData: unknown,
) {
	try {
		return schema.parse(envData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(
				"Invalid environment variables:",
				error.flatten().fieldErrors,
			);
			throw new Error(
				'Environment variable validation failed. Please check your ".env" files.',
			);
		}
		throw error;
	}
}
