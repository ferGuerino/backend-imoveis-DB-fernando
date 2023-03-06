import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { iLogin } from "../../interfaces/login.interfaces";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import "dotenv/config";
import { Repository } from "typeorm";

const createLoginServices = async (loginData: iLogin): Promise<string | any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Wrong email or password", 401);
  }
  const passwordVerify = await compare(loginData.password, user.password);

  if (!passwordVerify) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginServices;
