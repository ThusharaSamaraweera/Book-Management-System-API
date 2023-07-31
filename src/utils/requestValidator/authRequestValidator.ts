import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { IUser, LoginUser } from "../../modules";
import { userService } from "../../services/user.service";
import { validate } from "./commonValidator";
import { BadRequestError } from "../errorHandling/ErrorResponse";
import { Logger } from "../logger";
import { AUTH_SERVICE } from "../../constants/Logger";

const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  const data: IUser = req.body;
  const logger = new Logger(AUTH_SERVICE);
  
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(48).required(),
    });

    // Validate request body
    req.body = validate(schema, data);

    // Check if user already exists
    const user = await userService.getUserByEmail(logger, data.email);
    if (user) throw new BadRequestError("", "User already exists");
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    next(error);
  }
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const data: LoginUser = req.body;

  try {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(8).max(48).required(),
    });

    // Validate request body
    req.body = validate(schema, data);
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    next(error);
  }
};

export const authRequestValidator = {
  validateSignup,
  validateLogin,
};
