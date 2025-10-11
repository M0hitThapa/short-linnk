import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString =
  process.env.DATABASE_URL || "localhost://postrges:3000";

const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, { schema });
