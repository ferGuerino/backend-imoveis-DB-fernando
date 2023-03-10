import { Router } from "express";
import { createCategoryController } from "../controllers/category.controllers";
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
categoriesRoutes.get("/:id/realEstate");

export default categoriesRoutes;
