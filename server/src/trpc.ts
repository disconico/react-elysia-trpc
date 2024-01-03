import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db } from "./db/db";
import superjson from "superjson";

// Define the context structure
export type Context = {
  // Add any specific context properties here
  // For example, user information, authentication tokens, etc.
  // Example: user?: User;
  db: typeof db;
};

// Create context function
export const createContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
  // Here you can extract information from the opts and construct your context
  // For example, you can authenticate a user and add them to the context
  // Example: const user = await authenticateUser(opts.req);

  const context = {
    user: "nico",
    db,
  };

  return context;
};

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
