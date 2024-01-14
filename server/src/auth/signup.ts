import { Context } from "elysia";
import { credentialsSchema } from "./auth.schema";
import { auth } from "./lucia";
import { LuciaError } from "lucia";

export async function signupHanlder(ctx: Context) {
  let jsonData;

  // Check if ctx.body is a string and try to parse it as JSON
  if (typeof ctx.body === "string") {
    try {
      jsonData = JSON.parse(ctx.body);
    } catch (error) {
      // If parsing fails, return an error response
      ctx.set.status = 400;
      return { error: "Invalid JSON in request body" };
    }
  } else {
    // If ctx.body is not a string, use it as is
    jsonData = ctx.body;
  }

  const result = credentialsSchema.safeParse(jsonData);

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

    return { user };
  } catch (err) {
    if (err instanceof LuciaError && err.message === "AUTH_DUPLICATE_KEY_ID") {
      ctx.set.status = 400;
      return { error: "Username already taken" };
    }

    ctx.set.status = 500;
    return { error: "An unknown error occurred" };
  }
}
