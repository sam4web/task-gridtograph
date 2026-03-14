import { createServer } from "node:http";
import app from "./app";

const server = createServer(app);

const handleProcessEvents = () => {
	process.on("uncaughtException", (error: Error) => {
		process.exit(1);
	});
	process.on("unhandledRejection", (reason: Error | any) => {
		process.exit(1);
	});
};

const bootstrap = async () => {
	try {
		handleProcessEvents();

		// --- Database Connection ---

		// --- Start HTTP Server ---
		server.listen(5000, () => {
			console.log(`Server listening on port ${5000} in ${"dev"} mode.`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

bootstrap();
