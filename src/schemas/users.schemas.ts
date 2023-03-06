import { z } from "zod";
import { hashSync } from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(5).max(45),
  admin: z.boolean(),
  password: z
    .string()
    .min(3)
    .max(20)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
});

const returnCreateUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
  })
  .omit({ password: true });

export { createUserSchema, returnCreateUserSchema };
