import { Context } from "elysia";
import { credentialsSchema } from "./auth.schema";
import { auth } from "./lucia";
import { LuciaError } from "lucia";

export async function loginHandler(ctx: Context) {
  const result = credentialsSchema.safeParse(ctx.body);

  if (!result.success) {
    const formattedErrors = result.error.format();
    ctx.set.status = 400;
    return { error: formattedErrors };
  }

  const { username, password } = result.data;

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(ctx);
    authRequest.setSession(session);

    ctx.set.status = 302;
    ctx.set.headers["Location"] = "/";
    return;
  } catch (err) {
    // check for unique constraint error in user table
    if (
      err instanceof LuciaError &&
      (err.message === "AUTH_INVALID_KEY_ID" || err.message === "AUTH_INVALID_PASSWORD")
    ) {
      ctx.set.status = 400;
      return { error: "Incorrect username or password" };
    }

    ctx.set.status = 500;
    return { error: "An unknown error occurred" };
  }
}
