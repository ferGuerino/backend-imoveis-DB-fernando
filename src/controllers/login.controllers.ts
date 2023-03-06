import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interfaces";
import createLoginServices from "../services/login/createLogin.services";

const createLoginController = async (request: Request, response: Response): Promise<Response> => {
  const loginData: iLogin = request.body;
  const token = await createLoginServices(loginData);
  return response.json({
    token: token,
  });
};

export default createLoginController;
