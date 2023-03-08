import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUsersReturn } from "../../interfaces/users.interfaces";
import { returnAllUsersSchema } from "../../schemas/users.schemas";

const listUsersServices = async (): Promise<iUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getTreeRepository(User);

  const listUsers: Array<User> = await userRepository.find({
    withDeleted: true,
  });

  const users = returnAllUsersSchema.parse(listUsers);

  return users;
};

export default listUsersServices;
