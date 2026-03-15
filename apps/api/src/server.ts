import { createServer } from "node:http";
import { db, sql } from "@repo/database";
import app from "./app";
import { env } from "./config/env";

const server = createServer(app);

const handleProcessEvents = () => {
	process.on("uncaughtException", (error: Error) => {
		console.error(`Uncaught Exception: ${error.message}`);
		process.exit(1);
	});
	process.on("unhandledRejection", (reason: Error) => {
		console.error(`Unhandled Rejection:: ${reason.message}`);
		process.exit(1);
	});
};

const bootstrap = async () => {
	try {
		handleProcessEvents();

		// --- Database Connection ---
		console.info("Attempting to connect to database...");
		await db.execute(sql`SELECT 1`);
		console.info("Database connection established.");

		// --- Start HTTP Server ---
		server.listen(env.PORT, () => {
			console.log(
				`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode.`,
			);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

bootstrap();
