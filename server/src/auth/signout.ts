import { Context } from "elysia";
import { auth } from "./lucia";

export async function signoutHandler(ctx: Context) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (!session) {
    ctx.set.status = "Unauthorized";
    return { error: "Unauthorized" };
  }

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return;
}
