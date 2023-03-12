import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listRealEstateByCategoryController,
} from "../controllers/category.controllers";
import { ensureValidTokenMiddleware } from "../middlewares";
import ensureCategoryNameAlreadyExists from "../middlewares/ensureCategoriesNameAlreadyExists.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureValidTokenMiddleware,
  ensureUserIsAdminMiddleware,
  ensureCategoryNameAlreadyExists,
  createCategoryController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/realEstate", listRealEstateByCategoryController);

export default categoriesRoutes;
