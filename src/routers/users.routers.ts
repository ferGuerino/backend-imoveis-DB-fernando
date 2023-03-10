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
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post("", ensureValidDataMiddleware(createUserSchema), createUserController);
usersRoutes.get("", ensureValidTokenMiddleware, ensureUserIsAdminMiddleware, listUsersController);
usersRoutes.patch(
  "/:id",
  ensureValidDataMiddleware(updateUserSchema),
  ensureValidIdMiddleware,
  ensureValidTokenMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureValidIdMiddleware,
  ensureValidTokenMiddleware,
  ensureUserIsAdminMiddleware,
  softDeleteUserController
);

export default usersRoutes;
