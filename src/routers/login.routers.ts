import { Router } from "express";
import createLoginController from "../controllers/login.controllers";
import { ensureValidDataMiddleware } from "../middlewares";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureValidDataMiddleware(createLoginSchema), createLoginController);

export default loginRoutes;
