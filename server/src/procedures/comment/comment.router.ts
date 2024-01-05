import { router, publicProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import { comments } from "../../db/schema";
import { z } from "zod";

export const commentRouter = router({
  getCommentsFromAPost: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const commentsFromAPost = await ctx.db.select().from(comments).where(eq(comments.postId, input.id)).limit(10);
    return commentsFromAPost;
  }),
});
