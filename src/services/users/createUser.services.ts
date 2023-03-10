import { iUser, iUserReturn } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { returnCreateUserSchema } from "../../schemas/users.schemas";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const createUserService = async (userData: iUser): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (!userData.admin) {
    userData.admin = false;
  }

  const findEmail = await userRepository.findOneBy({
    email: userData.email,
  });

  if (findEmail) {
    throw new AppError("Email already exists", 409);
  }

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnCreateUserSchema.parse(user);

  return newUser;
};

export default createUserService;
