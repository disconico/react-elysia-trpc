import { Elysia } from "elysia";
import { trpc } from "@elysiajs/trpc";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import { appRouter } from "./router";
import { createContext } from "./trpc";
import { signupHanlder } from "./auth/signup";
import { validateSessionHandler } from "./auth/validate";
import { signoutHandler } from "./auth/signout";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(helmet())
  .get("/", () => "Hello from Elysia!")
  .post("/auth/signup", signupHanlder)
  .get("/auth/validate", validateSessionHandler)
  .post("/auth/signout", signoutHandler)
  .use(trpc(appRouter, { createContext, endpoint: "/trpc" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type AppRouter = typeof appRouter;
