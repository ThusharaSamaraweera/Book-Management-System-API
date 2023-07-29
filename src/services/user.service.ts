import { UserModelSchema } from "../data/MongoDb";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";

const getUserByEmail = async (email: string) => {
  try {
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