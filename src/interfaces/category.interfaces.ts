import {
  createCategorySchema,
  returnAllCategoriesSchema,
  returnCreateCategorySchema,
  returnRealEstateByCategorySchema,
} from "../schemas/category.schemas";
import { z } from "zod";

type iCategory = z.infer<typeof createCategorySchema>;
type iCategoryReturn = z.infer<typeof returnCreateCategorySchema>;
type iManyCategoriesReturn = z.infer<typeof returnAllCategoriesSchema>;
type iRealEstateByCategoryReturn = z.infer<typeof returnRealEstateByCategorySchema>;

export { iCategory, iCategoryReturn, iManyCategoriesReturn, iRealEstateByCategoryReturn };
