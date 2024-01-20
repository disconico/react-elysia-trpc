import { Context } from "elysia";
import { auth } from "./lucia";

export async function signoutHandler(ctx: Context) {
  console.log("Nico CTX", ctx);
  console.log("Nico CTX cookie", ctx.cookie);

  const authRequest = auth.handleRequest(ctx);

  console.log("Nico CTX", authRequest);
  const session = await authRequest.validate();

   console.log("Nico Sesh", session);

  if (!session) {
    ctx.set.status = "Unauthorized";
    return { error: "Unauthorized" };
  }

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return;
}
