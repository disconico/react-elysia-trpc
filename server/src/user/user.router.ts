import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { users } from "./db";
import { User } from "./types";

export const createUserSchema = z.object({
  name: z.string().min(1),
});

export const userRouter = router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure.input(z.string()).query((req) => {
    const { input } = req;

    const user = users.find((user) => user.id === input);

    return user;
  }),
  createUser: publicProcedure.input(createUserSchema).mutation((req) => {
    const { input } = req;

    const user: User = {
      id: `${Math.random()}`,
      name: input.name,
    };

    users.push(user);

    return user;
  }),
});
