import { Schema } from "mongoose";
import { UserModelSchema } from "../data/MongoDb";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";

const getUserByEmail = async (logger:Logger, email: string) => {
  try {
    logger.info({ message: `Called getUserByEmail service with ${email}` });
    const user = await UserModelSchema.findOne({ email });
   
    return user;
  } catch (error) {
    throw new ServerError(undefined, error.message);
  }
};

const getUserById = async (logger:Logger, id: Schema.Types.ObjectId) => {
    try {
      logger.info({ message: `Called getUserByEmail service with ${id}` });
      const user = await UserModelSchema.findById(id);

      return user;
    } catch (error) {
      throw new ServerError(undefined, error.message);
    }
}

export const userService = {
    getUserByEmail,
    getUserById
};