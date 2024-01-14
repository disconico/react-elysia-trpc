import { Env, lucia } from "lucia";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";

import { queryClient } from "../db/db";
import { web } from "lucia/middleware";

export const auth = lucia({
  middleware: web(),
  adapter: postgresAdapter(queryClient, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  env: (process.env.NODE_ENV as Env) || "DEV",
  getUserAttributes(databaseUser) {
    return {
      isAdmin: databaseUser.is_admin,
      username: databaseUser.username,
    };
  },
});

export type Auth = typeof auth;
