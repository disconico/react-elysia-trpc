import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().min(4).max(31),
  password: z.string().min(6).max(255),
});
