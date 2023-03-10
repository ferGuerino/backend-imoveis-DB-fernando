import { Request, Response } from "express";
import { iCategory } from "../interfaces/category.interfaces";
import createCategoryService from "../services/categories/createCategory.services";

const createCategoryController = async (request: Request, response: Response): Promise<Response> => {
  const categoryData: iCategory = request.body;

  const newCategory = await createCategoryService(categoryData);

  return response.status(201).json(newCategory);
};

export { createCategoryController };
