// import { z } from "zod";
// import { t } from "../trpc";

// export const userRouter = t.router({
//   getUser: t.procedure.input(z.object({ name: z.string() })).query(({ input }) => {
//     return { greeting: `Hello, ${input.name}!` };
//   }),
//   sayHello: t.procedure.query(() => {
//     return "Hello!";
//   }),
// });
