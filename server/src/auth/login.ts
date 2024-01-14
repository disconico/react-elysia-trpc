import { Context } from "elysia";
import { credentialsSchema } from "./auth.schema";
import { auth } from "./lucia";
import { LuciaError } from "lucia";

export async function loginHandler(ctx: Context) {
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
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(ctx);
    authRequest.setSession(session);
    const user = session.user;
    console.log("USER", user)
    return { user };
  } catch (err) {
    if (err instanceof LuciaError && err.message === "AUTH_INVALID_KEY_ID") {
      ctx.set.status = 400;
      return { error: "No user found" };
    } else if (err instanceof LuciaError && err.message === "AUTH_INVALID_PASSWORD") {
      ctx.set.status = 400;
      return { error: "Incorrect password" };
    }
    ctx.set.status = 500;
    console.log("Server error during login");
    return { error: "An unknown error occurred" };
  }
}
