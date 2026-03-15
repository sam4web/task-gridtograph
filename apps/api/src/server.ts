import { createServer } from "node:http";
import { db, sql } from "@repo/database";
import app from "./app";
import { env, logger } from "./config";

const server = createServer(app);

const handleProcessEvents = () => {
  process.on("uncaughtException", (error: Error) => {
    logger.error(`Uncaught Exception: ${error.message}`, {
      stack: error.stack,
    });
    process.exit(1);
  });
  process.on("unhandledRejection", (reason: Error | any) => {
    logger.error(`Unhandled Rejection: ${reason.message || reason}`, {
      stack: reason.stack,
    });
    process.exit(1);
  });
};

const bootstrap = async () => {
  try {
    handleProcessEvents();

    // --- Database Connection ---
    logger.info("Attempting to connect to database...");
    await db.execute(sql`SELECT 1`);
    logger.info("Database connection established.");

    // --- Start HTTP Server ---
    server.listen(env.PORT, () => {
      logger.info(
        `Server listening on port ${env.PORT} in ${env.NODE_ENV} mode.`,
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

bootstrap();
