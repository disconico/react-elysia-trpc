import { router } from "./trpc";
import { greetRouter } from "./greet/greet.router";
import { userRouter } from "./user/user.router";
import { postRouter } from "./post/post.router";

export const appRouter = router({
  user: userRouter,
  greet: greetRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
