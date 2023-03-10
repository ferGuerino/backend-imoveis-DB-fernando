import {
  createRealEstateSchema,
  returnCreateRealEstateSchema,
  createAddressSchema,
  returnCreateAddressSchema,
  returnAllRealEstateSchema,
} from "../schemas/realEstate.schemas";
import { z } from "zod";

type iRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnCreateRealEstateSchema>;
type iManyRealEstateReturn = z.infer<typeof returnAllRealEstateSchema>;
type iAddress = z.infer<typeof createAddressSchema>;
type iAddressReturn = z.infer<typeof returnCreateAddressSchema>;

export { iRealEstate, iRealEstateReturn, iAddress, iAddressReturn, iManyRealEstateReturn };
