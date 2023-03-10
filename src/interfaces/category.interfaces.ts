import { createCategorySchema, returnCreateCategorySchema } from "../schemas/category.schemas";
import { z } from "zod";

type iCategory = z.infer<typeof createCategorySchema>;
type iCategoryReturn = z.infer<typeof returnCreateCategorySchema>;

export { iCategory, iCategoryReturn };
