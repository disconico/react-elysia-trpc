import { router } from "./trpc";
import { greetRouter } from "./procedures/greet/greet.router";

export const appRouter = router({
  greet: greetRouter,
});

export type AppRouter = typeof appRouter;
