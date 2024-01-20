import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import { prettyJSON } from "hono/pretty-json";
import { appRouter } from "./router";
import { trpcServer } from "@hono/trpc-server";

const app = new Hono();

app.use("*", cors());
app.use("*", csrf());
app.use("*", logger());
app.use("*", timing());
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173", "https://client-react-api.fly.dev"],
  credentials: true,
};
app.use("/auth", cors(corsOptions));

app.post("/auth", (c) => {
  console.log(c);
  return c.json({ data: "OKI" });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

export default {
  port: 3031,
  fetch: app.fetch,
};
