import { router, publicProcedure } from "../trpc";
import { insertPostSchema, posts, selectPostSchema } from "../db/schema";

export const postRouter = router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),

  createPost: publicProcedure
    .input(insertPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.insert(posts).values(insertPostSchema.parse(input))
      return post;
    }),

  getFirstPost: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({});
    return selectPostSchema.parse(post);
  }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany();
     return posts.map((post) => selectPostSchema.parse(post));
  }),
});
