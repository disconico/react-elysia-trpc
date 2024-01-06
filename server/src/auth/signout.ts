import { Context } from "elysia";
import { auth } from "./lucia";

export async function signoutHandler(ctx: Context) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (!session) {
    ctx.set.status = "Unauthorized";
    return;
  }

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);

  ctx.set.status = 302;
  ctx.set.headers["Location"] = "/login";
  return;
}
