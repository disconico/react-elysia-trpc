import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import superjson from "superjson"
import type { AppRouter } from "../../server/src/index";

export const api = createTRPCReact<AppRouter>();

const url =
  process.env.NODE_ENV === "production"
    ? "https://server-elysia-api.fly.dev/trpc"
    : "http://localhost:3000/trpc";

export const trpcClient = api.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
