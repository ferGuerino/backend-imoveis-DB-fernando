import { nullable, optional, z } from "zod";
import { hashSync } from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(4).max(45),
  admin: z.boolean().default(false),
  password: z
    .string()
    .min(3)
    .max(20)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
});

// const updateUserSchema = createUserSchema.partial();

const updateUserSchema = z.object({
  name: z.string().min(3).max(45).optional(),
  email: z.string().email().min(4).max(45).optional(),
  password: z
    .string()
    .min(3)
    .max(20)
    .transform((pass) => {
      return hashSync(pass, 10);
    })
    .optional(),
});

const returnCreateUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
  })
  .omit({ password: true });

const returnAllUsersSchema = returnCreateUserSchema.array();

export { createUserSchema, returnCreateUserSchema, returnAllUsersSchema, updateUserSchema };
