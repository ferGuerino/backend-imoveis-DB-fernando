import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { boolean } from "zod";

const ensureUserIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization;

  token = token!.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    request.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };

    if (!decoded.admin) {
      throw new AppError("Insufficient permission", 403);
    }

    return next();
  });
};

export default ensureUserIsAdminMiddleware;
