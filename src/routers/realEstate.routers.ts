import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import { ensureValidTokenMiddleware } from "../middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureValidTokenMiddleware,
  ensureUserIsAdminMiddleware,
  createRealEstateController
);
realEstateRoutes.get("", listRealEstateController);

export default realEstateRoutes;
