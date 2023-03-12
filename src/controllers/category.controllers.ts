import { Request, Response } from "express";
import { iCategory } from "../interfaces/category.interfaces";
import createCategoryService from "../services/categories/createCategory.services";
import listCategoriesService from "../services/categories/listCategories.services";
import listRealEstateByCategoryService from "../services/categories/listRealEstateByCategory.services";

const createCategoryController = async (request: Request, response: Response): Promise<Response> => {
  const categoryData: iCategory = request.body;

  const newCategory = await createCategoryService(categoryData);

  return response.status(201).json(newCategory);
};

const listCategoriesController = async (request: Request, response: Response): Promise<Response> => {
  const listCategories = await listCategoriesService();
  return response.json(listCategories);
};

const listRealEstateByCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryId: number = +request.params.id;

  const listRealEstateByCategory = await listRealEstateByCategoryService(categoryId);
  return response.json(listRealEstateByCategory);
};

export { createCategoryController, listCategoriesController, listRealEstateByCategoryController };
