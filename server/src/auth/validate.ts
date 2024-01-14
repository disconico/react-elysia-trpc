import { Context } from "elysia";
import { auth } from "./lucia";

export async function validateSessionHandler(ctx: Context) {
  console.log("ctx", ctx);
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (session) {
    const user = session.user;
    return { user };
  }
  return { user: null };
}
