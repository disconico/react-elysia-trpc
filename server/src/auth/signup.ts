import { Context } from "elysia";
import { z } from "zod";
import { auth } from "./lucia";
import { LuciaError } from "lucia";

const signupSchema = z.object({
  username: z.string().min(4).max(31),
  password: z.string().min(6).max(255),
});

export async function signupHanlder(ctx: Context) {
  const result = signupSchema.safeParse(ctx.body);

  if (!result.success) {
    const formattedErrors = result.error.format();
    ctx.set.status = 400;
    return { error: formattedErrors };
  }

  const { username, password } = result.data;

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
        is_admin: false,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(ctx);
    authRequest.setSession(session);
    ctx.set.status = 302;
    // redirect to profile page
    ctx.set.headers["Location"] = "/";
  } catch (err) {
    if (err instanceof LuciaError && err.message === "AUTH_DUPLICATE_KEY_ID") {
      ctx.set.status = 400;
      return { error: "Username already taken" };
    }

    ctx.set.status = 500;
    return { error: "An unknown error occurred" };
  }
}
