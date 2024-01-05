import { Env, lucia } from "lucia";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";

import { queryClient } from "../db/db";
import { elysia } from "lucia/middleware";

export const auth = lucia({
  middleware: elysia(),
  adapter: postgresAdapter(queryClient, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  env: (process.env.NODE_ENV as Env) || "DEV",
  getUserAttributes(databaseUser) {
    return {
      isAdmin: databaseUser.isAdmin,
      username: databaseUser.username,
    };
  },
});

export type Auth = typeof auth;
