import { router, publicProcedure } from "../../trpc";
import { insertPostSchema, posts } from "../../db/schema";
import { TRPCError } from "@trpc/server";

export const postRouter = router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),

  createPost: publicProcedure.input(insertPostSchema).mutation(async ({ ctx, input }) => {
    try {
      const post = await ctx.db.insert(posts).values(insertPostSchema.parse(input));
      return post;
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create post.",
      });
    }
  }),

  getFirstPost: publicProcedure.query(async ({ ctx }) => {
    try {
      const post = await ctx.db.query.posts.findFirst({
        with: {
          comments: true,
        },
      });
      return post;
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch post.",
      });
    }
  }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany();
    return posts;
  }),
});
