import { UserModelSchema } from "../data/MongoDb";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";

const getUserByEmail = async (logger:Logger, email: string) => {
  try {
    logger.info({ message: `Called getUserByEmail service with ${email}` });
    const user = await UserModelSchema.findOne({ email });
   
    return user;
  } catch (error) {
    if (error instanceof BadRequestError) throw new BadRequestError(undefined, error.description);
    throw new ServerError(undefined, error.message);
  }
};

export const userService = {
    getUserByEmail,
};