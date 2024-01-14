import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db } from "./db/db";
import superjson from "superjson";
import { auth } from "./auth/luciaTRPC";
import type { User } from "lucia";
import { ZodError } from "zod";

// Define the context structure
export type Context = {
  // Add any specific context properties here
  // For example, user information, authentication tokens, etc.
  // Example: user?: User;
  db: typeof db;
  user: User | null;
};

// Create context function
export const createContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
  // Here you can extract information from the opts and construct your context
  // For example, you can authenticate a user and add them to the context
  const authRequest = auth.handleRequest(opts.req);
  const session = await authRequest.validate();
  const user = session?.user ?? null;

  const context = {
    db,
    user,
  };

  return context;
};

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.user.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
