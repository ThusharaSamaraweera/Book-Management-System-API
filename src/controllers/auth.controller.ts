import { NextFunction, Request, Response } from "express"
import { authService } from "../services/auth.service";
import { IUser } from "../modules";
import { Logger } from "../utils/logger";
import { AUTH_SERVICE } from "../constants/Logger";
import { apiResponse } from "../utils/successResponse";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(AUTH_SERVICE)
  try {
    const user: IUser = req.body;
    logger.info({message: `Called signup controller with ${user.email}`});
    await authService.signup(logger, user);
    return res.json(apiResponse._201({message: "User created successfully"}));
  } catch (error) {
    logger.error({message: `Error in signup controller ${error}`});
    next(error);
  }

}

export const authController = {
    signup
}