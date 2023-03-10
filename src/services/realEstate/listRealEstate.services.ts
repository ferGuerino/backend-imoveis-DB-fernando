import { RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { iManyRealEstateReturn, iRealEstateReturn } from "../../interfaces/realEstate.interfaces";
import { returnAllRealEstateSchema } from "../../schemas/realEstate.schemas";

const listRealEstateService = async (): Promise<iManyRealEstateReturn | any> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const listRealEstate: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      category: true,
      address: true,
    },
  });

  return listRealEstate;
};

export default listRealEstateService;
