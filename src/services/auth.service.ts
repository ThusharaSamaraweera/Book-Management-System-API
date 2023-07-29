import { UserModelSchema } from "../data/MongoDb";
import { IUser, LoginUser } from "../modules";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";
import bcrypt from "bcryptjs";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import Jwt from "jsonwebtoken";

/**
 *
 * @param {Logger} logger
 * @param {IUser} user
 */
const signup = async (logger: Logger, user: IUser) => {
  try {
    const userModel = new UserModelSchema(user);
    const salt = await bcrypt.genSalt(10);
    userModel.password = await bcrypt.hash(user.password, salt);
    await userModel.save();
  } catch (error) {
    throw new ServerError("User creation failed", error.message);
  }
};

/**
 * @param {Logger} logger
 * @param {LoginUser} user
 */
const login = async (logger: Logger, user: LoginUser) => {
  try {
    logger.info({ message: `Called login service with ${user.email}` });
    const existingUser = await userService.getUserByEmail(logger, user.email);

    // Check if user exists
    if (!existingUser) {
      logger.error({ message: `User with email ${user.email} not found` });
      throw new BadRequestError("", "Invalid credentials");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) {
      logger.error({ message: `Invalid password for user with email ${user.email}` });
      throw new BadRequestError("", "Invalid credentials");
    }

    const payload: JwtPayload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    // Return jsonwebtoken
    const token = getJwtToken(payload);

    //@ts-ignore
    delete existingUser.password;
    return { token, user: existingUser };
  } catch (error) {
    if (error instanceof BadRequestError) throw new BadRequestError(error.name, "");
    throw new ServerError("Login failed", error.message);
  }
};

/**
 * 
 * @param {JwtPayload} payload 
 * @returns {string} token
 */
const getJwtToken = (payload: JwtPayload) => {
  return Jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: 360000 });
};

export const authService = {
  signup,
  login,
};
