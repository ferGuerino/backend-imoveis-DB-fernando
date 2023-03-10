import { Request, Response } from "express";
import { iAddress, iRealEstate } from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import listRealEstateService from "../services/realEstate/listRealEstate.services";

const createRealEstateController = async (request: Request, response: Response): Promise<Response> => {
  const realStateData: iRealEstate = request.body;
  const addressData: iAddress = request.body.address;
  const idCategory: number = request.body.categoryId;
  const newRealEstate = await createRealEstateService(realStateData, addressData, idCategory);
  return response.status(201).json(newRealEstate);
};

const listRealEstateController = async (request: Request, response: Response): Promise<Response> => {
  const realEstate = await listRealEstateService();

  return response.status(200).json(realEstate);
};

export { createRealEstateController, listRealEstateController };
