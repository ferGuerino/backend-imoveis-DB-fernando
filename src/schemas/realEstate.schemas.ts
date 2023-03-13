import { z } from "zod";
import { returnCreateCategorySchema } from "./category.schemas";

const createAddressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const returnCreateAddressSchema = createAddressSchema.extend({
  id: z.number(),
});

const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: createAddressSchema,
  categoryId: z.number(),
});

const returnCreateRealEstateSchema = createRealEstateSchema.omit({ categoryId: true }).extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: returnCreateCategorySchema,
});

const returnAllRealEstateSchema = returnCreateRealEstateSchema.array();
const returnAllRealEstateForCategory = returnCreateRealEstateSchema
  .omit({
    category: true,
  })
  .array();

export {
  createRealEstateSchema,
  returnCreateRealEstateSchema,
  createAddressSchema,
  returnCreateAddressSchema,
  returnAllRealEstateSchema,
  returnAllRealEstateForCategory,
};
