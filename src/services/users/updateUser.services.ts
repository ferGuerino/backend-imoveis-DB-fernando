import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserReturn, iUserUpdate } from "../../interfaces/users.interfaces";
import { returnCreateUserSchema } from "../../schemas/users.schemas";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";

const updateUserService = async (
  dataUser: iUserUpdate,
  idUser: number,
  token: string | undefined
): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userToken = token!.split(" ")[1];

  const userData = await userRepository.findOneBy({
    id: idUser,
  });

  jwt.verify(userToken, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (decoded.admin === false && userData!.admin === true) {
      throw new AppError("Insufficient permission", 403);
    }
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
