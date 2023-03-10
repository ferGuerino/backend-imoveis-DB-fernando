import { Request, Response } from "express";
import { iUser } from "../interfaces/users.interfaces";
import {
  createUserService,
  listUsersServices,
  softDeleteUserService,
  updateUserService,
} from "../services/users";

const createUserController = async (request: Request, response: Response) => {
  const userData: iUser = request.body;
  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersServices();

  return response.json(users);
};

const softDeleteUserController = async (request: Request, response: Response) => {
  const user = await softDeleteUserService(parseInt(request.params.id));

  return response.status(204).json(user);
};

const updateUserController = async (request: Request, response: Response) => {
  const userData = request.body;
  const token = request.headers.authorization;

  const idUser = +request.params.id;

  const updateUser = await updateUserService(userData, idUser, token);
  return response.status(200).json(updateUser);
};

export { createUserController, listUsersController, softDeleteUserController, updateUserController };
