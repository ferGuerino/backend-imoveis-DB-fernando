import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategory, iCategoryReturn } from "../../interfaces/category.interfaces";
import { returnCreateCategorySchema } from "../../schemas/category.schemas";

const createCategoryService = async (categoryData: iCategory): Promise<iCategoryReturn> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = returnCreateCategorySchema.parse(category);

  return newCategory;
};

export default createCategoryService;
