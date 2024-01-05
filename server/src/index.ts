import { Elysia } from "elysia";
import { trpc } from "@elysiajs/trpc";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import { appRouter } from "./router";
import { createContext } from "./trpc";
import { signupHanlder } from "./auth/signup";

const app = new Elysia()
  .use(swagger())
  .use(
    cors({
      origin:
        process.env.NODE_ENV === "development" ? /http:\/\/localhost:5173/ : /https:\/\/client-react-api\.fly\.dev/,
    }),
  )
  .use(helmet())
  .get("/", () => "Hello from Elysia!")
  .get("/ctx", (ctx) => console.log(ctx))
  .post("/auth/signup", signupHanlder)
  .use(trpc(appRouter, { createContext, endpoint: "/trpc" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type AppRouter = typeof appRouter;
