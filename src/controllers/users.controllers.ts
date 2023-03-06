import { Request, Response } from "express";
import { iUser } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";

const createUserController = async (request: Request, response: Response) => {
  const userData: iUser = request.body;
  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};

export { createUserController };
