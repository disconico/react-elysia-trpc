import { Elysia } from "elysia";
import { trpc } from "@elysiajs/trpc";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { appRouter } from "./router";
import { createContext } from "./context";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(trpc(appRouter, { createContext, endpoint: "/trpc" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type AppRouter = typeof appRouter;
