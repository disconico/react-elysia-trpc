import { router } from "./trpc";
import { greetRouter } from "./greet/greet.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  user: userRouter,
  greet: greetRouter,
});

export type AppRouter = typeof appRouter;
