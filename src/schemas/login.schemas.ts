import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email().min(10).max(50),
  password: z.string().min(4).max(120),
});

export { createLoginSchema };