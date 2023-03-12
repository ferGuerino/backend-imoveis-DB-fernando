import { z } from "zod";
import { returnAllRealEstateForCategory, returnAllRealEstateSchema } from "./realEstate.schemas";

const createCategorySchema = z.object({
  name: z.string().max(45),
});

const returnCreateCategorySchema = createCategorySchema.extend({
  id: z.number(),
});

const returnRealEstateByCategorySchema = z.object({
  category: returnCreateCategorySchema,
  realEstates: returnAllRealEstateForCategory,
});

const returnAllCategoriesSchema = returnCreateCategorySchema.array();
export {
  createCategorySchema,
  returnCreateCategorySchema,
  returnAllCategoriesSchema,
  returnRealEstateByCategorySchema,
};
