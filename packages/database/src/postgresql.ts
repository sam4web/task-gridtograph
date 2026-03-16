import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "./config/env";
import * as schema from "./schema/postgres";

export * from "drizzle-orm";
export * from "./schema/postgres";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
