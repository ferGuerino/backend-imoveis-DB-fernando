import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category } from "../../entities";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";
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

  const findAddresStreet = await addressRepository.findOne({
    where: {
      street: addressData.street,
    },
  });
  const findAddressNumber = await addressRepository.findOne({
    where: {
      number: addressData.number!,
    },
  });

  if (findAddresStreet && findAddressNumber) {
    throw new AppError("Address already exists", 409);
  }

  const address = addressRepository.create(addressData);

  await addressRepository.save(address);

  const category = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate = realEstateRepository.create({
    ...newRealEstateData,
    category: category!,
    address: address,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate = returnCreateRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstateService;
