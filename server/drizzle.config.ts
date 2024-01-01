import "dotenv/config";
import type { Config } from "drizzle-kit";
const databaseUrl = new URL(process.env.DATABASE_URL as string);

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg" as any,
  dbCredentials: {
    host: databaseUrl.hostname,
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.split("/")[1],
    port: parseInt(databaseUrl.port) || undefined,
  },
} satisfies Config;
