import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstate.controllers";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", createRealEstateController);
realEstateRoutes.get("");

export default realEstateRoutes;
