import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iManyCategoriesReturn } from "../../interfaces/category.interfaces";

const listCategoriesService = async (): Promise<iManyCategoriesReturn> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const listCategories: Array<Category> = await categoryRepository.find();

  return listCategories;
};
export default listCategoriesService;
