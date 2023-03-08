import { Router } from "express";
import {
  createUserController,
  listUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import {
  ensureValidDataMiddleware,
  ensureValidIdMiddleware,
  ensureValidTokenMiddleware,
} from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post("", ensureValidDataMiddleware(createUserSchema), createUserController);
usersRoutes.get("", ensureValidTokenMiddleware, listUsersController);
usersRoutes.patch(
  "/:id",
  ensureValidDataMiddleware(updateUserSchema),
  ensureValidIdMiddleware,
  updateUserController
);
usersRoutes.delete("/:id", ensureValidIdMiddleware, softDeleteUserController);

export default usersRoutes;
