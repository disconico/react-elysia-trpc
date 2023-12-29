import { initTRPC, inferAsyncReturnType } from "@trpc/server";

import { createContext } from "./context";

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
