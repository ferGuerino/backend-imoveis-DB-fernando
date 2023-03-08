import {
  createRealEstateSchema,
  returnCreateRealEstateSchema,
  createAddressSchema,
  returnCreateAddressSchema,
} from "../schemas/realEstate.schemas";
import { z } from "zod";

type iRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnCreateRealEstateSchema>;
type iAddress = z.infer<typeof createAddressSchema>;
type iAddressReturn = z.infer<typeof returnCreateAddressSchema>;

export { iRealEstate, iRealEstateReturn, iAddress, iAddressReturn };
