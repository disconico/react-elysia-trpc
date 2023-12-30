import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/index";

export const api = createTRPCReact<AppRouter>();

const url =
  process.env.NODE_ENV === "production"
    ? "https://https://server-elysia-api.fly.dev/trpc"
    : "http://localhost:8080/trpc";

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
