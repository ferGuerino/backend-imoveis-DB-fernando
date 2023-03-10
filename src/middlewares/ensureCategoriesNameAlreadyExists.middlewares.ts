import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

const ensureCategoryNameAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOneBy({
    name: request.body.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  next();
};

export default ensureCategoryNameAlreadyExists;
