// import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "../index";

export const postRouter = router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),

  // createPost: publicProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1).max(50),
  //       text: z.string().min(1).max(500),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const post = await ctx.db.post.create({
  //       data: input,
  //     });

  //     console.log(post);

  //     return post;
  //   }),

  getPosts: publicProcedure.query(async ({ }) => {
    const posts = await db.post.findMany({
      take: 100,
      orderBy: [{ id: "desc" }],
    });
    return posts;
  }),
});
