import { z } from "zod";

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
  sold: z.boolean().default(false),
  value: z.number(),
  size: z.number().int(),
  address: createAddressSchema,
  categoryId: z.number().optional(),
});

const returnCreateRealEstateSchema = createRealEstateSchema.omit({ categoryId: true }).extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export {
  createRealEstateSchema,
  returnCreateRealEstateSchema,
  createAddressSchema,
  returnCreateAddressSchema,
};
