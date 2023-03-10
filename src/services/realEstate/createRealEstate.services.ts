import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category } from "../../entities";
import { RealEstate } from "../../entities";
import { iAddress, iRealEstate, iRealEstateReturn } from "../../interfaces/realEstate.interfaces";
import {
  createRealEstateSchema,
  returnCreateAddressSchema,
  returnCreateRealEstateSchema,
} from "../../schemas/realEstate.schemas";

const createRealEstateService = async (
  realEstateData: iRealEstate,
  addressData: iAddress,
  idCategory: number
): Promise<iRealEstateReturn> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const newRealEstateData = createRealEstateSchema.parse(realEstateData);
  const address = addressRepository.create(addressData);

  const category = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
  });

  const realEstate = realEstateRepository.create({
    ...newRealEstateData,
    category: category!,
  });

  await addressRepository.save(address);
  await realEstateRepository.save(realEstate);

  const newRealEstate = returnCreateRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstateService;
