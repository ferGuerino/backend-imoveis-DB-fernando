import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserReturn, iUserUpdate } from "../../interfaces/users.interfaces";
import { returnCreateUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (dataUser: iUserUpdate, idUser: number): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userData = await userRepository.findOneBy({
    id: idUser,
  });

  const newUserData = userRepository.create({
    ...userData,
    ...dataUser,
  });

  await userRepository.save(newUserData);

  const updateUser = returnCreateUserSchema.parse(newUserData);

  return updateUser;
};

export default updateUserService;
