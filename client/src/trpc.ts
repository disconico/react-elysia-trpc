import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/index";

export const api = createTRPCReact<AppRouter>();

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/trpc",
    }),
  ],
});
