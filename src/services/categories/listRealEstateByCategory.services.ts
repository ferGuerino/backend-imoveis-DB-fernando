import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listRealEstateByCategoryService = async (categoyId: number): Promise<Category> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: {
      id: categoyId,
    },
    relations: {
      realEstate: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category!;
};

export default listRealEstateByCategoryService;
