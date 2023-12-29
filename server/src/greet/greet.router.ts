import { router, publicProcedure } from "../trpc";

export const greetRouter = router({
  hello: publicProcedure.query(() => {
    console.log("hello query called");
    return "hello";
  }),
  zebi: publicProcedure.query(() => {
        console.log("zebi query called");
    return "PUTAIN ZEBIN"
  })
});
