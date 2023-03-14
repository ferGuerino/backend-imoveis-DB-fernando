import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iSchedules } from "../../interfaces/schedules.interfaces";
import { createScheduleSchema } from "../../schemas/schedules.schemas";
import jwt from "jsonwebtoken";

const createSchedulesService = async (
  scheduleData: iSchedules,
  token: string | undefined
): Promise<Schedule> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  if (!token) {
    throw new AppError("Insuficient permission", 403);
  }

  const userToken = token!.split(" ")[1];

  const userTokenId = jwt.verify(userToken, process.env.SECRET_KEY!, (error, decoded: any) => {
    return Number(decoded.sub);
  });

  const user = await userRepository.findOne({
    where: {
      id: userTokenId!,
    },
  });

  const realEstate = await realEstateRepository.findOne({
    where: {
      id: scheduleData.realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const findSchedule = await realEstateRepository
    .createQueryBuilder("real_estate")
    .select(["real_estate", "schedules_users_properties"])
    .innerJoin("real_estate.schedules", "schedules_users_properties")
    .where("schedules_users_properties.date = :date", { date: scheduleData.date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: scheduleData.hour })
    .andWhere("real_estate.id = :id", { id: scheduleData.realEstateId })
    .getOne();

  if (findSchedule) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);
  }

  const findUserSchedule = await realEstateRepository
    .createQueryBuilder("real_estate")
    .select(["real_estate", "schedules_users_properties", "users"])
    .innerJoin("real_estate.schedules", "schedules_users_properties")
    .innerJoin("schedules_users_properties.user", "users")
    .where("schedules_users_properties.user.id = :id", { id: userTokenId })
    .andWhere("schedules_users_properties.date = :date", { date: scheduleData.date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: scheduleData.hour })
    .getOne();

  if (findUserSchedule) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409);
  }
  const day = new Date(scheduleData.date);
  const weekDay = day.getDay();

  if (weekDay === 6 || weekDay === 5) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  if (findSchedule) {
    throw new AppError("schedule already existis", 409);
  }

  if (scheduleData.hour < "08:00:00" || scheduleData.hour > "18:00:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const schedule = scheduleRepository.create({
    ...scheduleData,
    user: user!,
    realEstate: realEstate,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};

export default createSchedulesService;
