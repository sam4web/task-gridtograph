import type cors from "cors";
import { env } from "./env";

const dynamicOriginCheck = (
	origin: string | undefined,
	callback: (err: Error | null, allow?: boolean) => void,
) => {
	if (env.NODE_ENV === "development") {
		callback(null, true);
	} else {
		if (!origin || env.ALLOWED_ORIGINS.has(origin)) {
			callback(null, true);
		} else {
			console.warn(`CORS: Blocked access from unknown origin: ${origin}`);
			callback(new Error("Not allowed by CORS."));
		}
	}
};

export const corsOptions: cors.CorsOptions = {
	origin: dynamicOriginCheck,
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"Authorization",
	],
	credentials: true,
	optionsSuccessStatus: 204,
};
