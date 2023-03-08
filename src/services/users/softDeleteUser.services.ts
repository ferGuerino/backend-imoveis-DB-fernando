import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const softDeleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userId = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepository.softRemove(userId!);
};
export default softDeleteUserService;
