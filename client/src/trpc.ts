import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/index";

export const api = createTRPCReact<AppRouter>();

const url = process.env.NODE_ENV === "production" ? process.env.SERVER_URI! : "http://localhost:3000/trpc";

console.log("NICO URL", url)


export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
