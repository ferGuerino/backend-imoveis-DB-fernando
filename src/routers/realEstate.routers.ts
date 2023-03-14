import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import { ensureValidDataMiddleware, ensureValidTokenMiddleware } from "../middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureValidTokenMiddleware,
  ensureUserIsAdminMiddleware,
  ensureValidDataMiddleware(createRealEstateSchema),
  createRealEstateController
);
realEstateRoutes.get("", listRealEstateController);

export default realEstateRoutes;
