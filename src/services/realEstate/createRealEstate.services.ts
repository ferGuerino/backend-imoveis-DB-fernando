import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import { RealEstate } from "../../entities";
import { iRealEstate, iRealEstateReturn } from "../../interfaces/realEstate.interfaces";
import {
  returnCreateAddressSchema,
  returnCreateRealEstateSchema,
} from "../../schemas/realEstate.schemas";

const createRealEstateService = async (realEstateData: iRealEstate): Promise<iRealEstateReturn> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);

  const realEstate = realEstateRepository.create(realEstateData);
  const address = addressRepository.create(realEstateData.address);

  await addressRepository.save(address);
  await realEstateRepository.save(realEstate);

  returnCreateAddressSchema.parse(address);

  const newRealEstate = returnCreateRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstateService;
