import { createUserSchema, returnCreateUserSchema } from "../schemas/users.schemas";
import { z } from "zod";

type iUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnCreateUserSchema>;

export { iUser, iUserReturn };
