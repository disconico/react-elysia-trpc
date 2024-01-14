import { router, publicProcedure, privateProcedure, adminProcedure } from "../../trpc";

export const greetRouter = router({
  hello: publicProcedure.query(({}) => {
    return "hello";
  }),
  privateHello: privateProcedure.query(({}) => {
    return "hello from a private procedure";
  }),
  adminHello: adminProcedure.query(({}) => {
    return "hello from an admin procedure";
  }),
  bye: publicProcedure.query(() => {
    return "bye";
  }),
  zebi: publicProcedure.query(() => {
    return "PUTAIN ZEBI";
  }),
});
