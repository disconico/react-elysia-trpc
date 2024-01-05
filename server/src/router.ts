import { router } from "./trpc";
import { greetRouter } from "./procedures/greet/greet.router";
import { userRouter } from "./procedures/user/user.router";
import { postRouter } from "./procedures/post/post.router";
import { commentRouter } from "./procedures/comment/comment.router";

export const appRouter = router({
  user: userRouter,
  greet: greetRouter,
  post: postRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
