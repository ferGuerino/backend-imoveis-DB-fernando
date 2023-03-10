import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().max(45),
});

const returnCreateCategorySchema = createCategorySchema.extend({
  id: z.number(),
});

export { createCategorySchema, returnCreateCategorySchema };
