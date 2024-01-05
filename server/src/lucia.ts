import { Env, lucia } from "lucia";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";

import { queryClient } from "./db/db";
import { elysia } from "lucia/middleware";

export const auth = lucia({
  middleware: elysia(),
  adapter: postgresAdapter(queryClient, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  // Check if this type is correct
  env: process.env.NODE_ENV as Env || "DEV",
});
