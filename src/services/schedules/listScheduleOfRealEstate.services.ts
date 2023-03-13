import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listScheduleOfRealEstateService = async (realEstateId: number) => {
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const scheduleRealEstate = await realEstateRepository
    .createQueryBuilder("real_estate")
    .select(["real_estate", "categories", "addresses", "schedules_users_properties", "users"])
    .innerJoin("real_estate.schedules", "schedules_users_properties")
    .innerJoin("schedules_users_properties.user", "users")
    .innerJoin("real_estate.category", "categories")
    .innerJoin("real_estate.address", "addresses")
    .where("real_estate.id = :id", { id: realEstateId })
    .getOne();

  if (!scheduleRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return scheduleRealEstate;
};

export default listScheduleOfRealEstateService;
