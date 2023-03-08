import {
  createUserSchema,
  returnCreateUserSchema,
  returnAllUsersSchema,
  updateUserSchema,
} from "../schemas/users.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type iUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnCreateUserSchema>;
type iUsersReturn = z.infer<typeof returnAllUsersSchema>;
type iUserUpdate = DeepPartial<iUser>;

export { iUser, iUserReturn, iUsersReturn, iUserUpdate };
