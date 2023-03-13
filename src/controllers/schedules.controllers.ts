import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedule.services";
import listScheduleOfRealEstateService from "../services/schedules/listScheduleOfRealEstate.services";

const createSchedulesController = async (request: Request, response: Response): Promise<Response> => {
  const scheduleData = request.body;
  const scheduleHour: string = request.body.hour;
  const scheduleRealEstateId: number = +request.body.realEstateId;
  const token: string | undefined = request.headers.authorization;

  await createSchedulesService(scheduleData, token);

  return response.status(201).json({ message: "Schedule created" });
};

const listScheduleOfRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateId: number = +request.params.id;

  const returnSchedule = await listScheduleOfRealEstateService(realEstateId);

  return response.json(returnSchedule);
};

export { createSchedulesController, listScheduleOfRealEstateController };
