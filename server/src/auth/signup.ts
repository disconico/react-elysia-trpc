import { Context } from "elysia";
import { credentialsSchema } from "./auth.schema";
import { auth } from "./lucia";
import { LuciaError } from "lucia";

export async function signupHanlder(ctx: Context) {
  const result = credentialsSchema.safeParse(ctx.body);

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
    return;
  } catch (err) {
    if (err instanceof LuciaError && err.message === "AUTH_DUPLICATE_KEY_ID") {
      ctx.set.status = 400;
      return { error: "Username already taken" };
    }

    ctx.set.status = 500;
    return { error: "An unknown error occurred" };
  }
}
