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
  id: z.number().positive(),
});

const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: createAddressSchema,
  categoryId: z.number(),
});

const returnCreateRealEstateSchema = createRealEstateSchema
  .extend({
    id: z.number().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sold: z.boolean().default(false),
    category: returnCreateCategorySchema,
    address: returnCreateAddressSchema,
  })
  .omit({ categoryId: true });

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
