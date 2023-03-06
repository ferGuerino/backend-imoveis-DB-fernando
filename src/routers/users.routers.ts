import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import ensureValidDataMiddleware from "../middlewares/ensureValidData.middlewares";
import { createUserSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post("", ensureValidDataMiddleware(createUserSchema), createUserController);
usersRoutes.get("");
usersRoutes.patch("/:id");
usersRoutes.delete("/:id");

export default usersRoutes;
