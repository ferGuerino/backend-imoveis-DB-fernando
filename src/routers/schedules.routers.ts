import { Router } from "express";
import {
  createSchedulesController,
  listScheduleOfRealEstateController,
} from "../controllers/schedules.controllers";
import { ensureValidDataMiddleware, ensureValidTokenMiddleware } from "../middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import { createScheduleSchema } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureValidTokenMiddleware,
  ensureValidDataMiddleware(createScheduleSchema),
  createSchedulesController
);
schedulesRoutes.get(
  "/realEstate/:id",
  ensureValidTokenMiddleware,
  ensureUserIsAdminMiddleware,
  listScheduleOfRealEstateController
);

export default schedulesRoutes;
