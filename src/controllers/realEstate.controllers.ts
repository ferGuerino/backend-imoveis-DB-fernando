import { Request, Response } from "express";
import { iRealEstate } from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.services";

const createRealEstateController = async (request: Request, response: Response): Promise<Response> => {
  const realStateData: iRealEstate = request.body;
  const newRealEstate = await createRealEstateService(realStateData);
  return response.status(201).json(newRealEstate);
};

export { createRealEstateController };
