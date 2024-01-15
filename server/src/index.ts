import { Elysia } from "elysia";
import { trpc } from "@elysiajs/trpc";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { appRouter } from "./router";
import { createContext } from "./trpc";
import { signupHanlder } from "./auth/signup";
import { validateSessionHandler } from "./auth/validate";
import { signoutHandler } from "./auth/signout";
import { loginHandler } from "./auth/login";
import { logger } from "@grotto/logysia";

const app = new Elysia()
  .use(swagger())
  .use(helmet())
  .use(cors())
  .use(
    logger({
      logIP: true,
    }),
  )
  .get("/", () => "Hello from Elysia!")
  .post("/auth/signup", signupHanlder)
  .post("/auth/login", loginHandler)
  .get("/auth/validate", validateSessionHandler)
  .get("/auth/signout", signoutHandler)
  .use(trpc(appRouter, { createContext, endpoint: "/trpc" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type AppRouter = typeof appRouter;
