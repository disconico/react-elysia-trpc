import "dotenv/config";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(migrationClient, { schema });

try {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("🌴 migration successful")
} catch (e) {
  console.log("error while performing migration", e);
}

await migrationClient.end();
