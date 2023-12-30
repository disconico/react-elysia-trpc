import { router, publicProcedure } from "../trpc";

export const greetRouter = router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),
  bye: publicProcedure.query(() => {
    return "bye";
  }),
  zebi: publicProcedure.query(() => {
    return "PUTAIN ZEBI";
  }),
});
