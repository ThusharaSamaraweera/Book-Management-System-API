import mongoose, { Schema } from "mongoose";
import { BookModelSchema, UserModelSchema } from "../data/MongoDb";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";

const getUserByEmail = async (logger: Logger, email: string) => {
  try {
    logger.info({ message: `Called getUserByEmail service with ${email}` });
    const user = await UserModelSchema.findOne({ email });

    return user;
  } catch (error) {
    throw new ServerError(undefined, error.message);
  }
};

const getUserById = async (logger: Logger, id: Schema.Types.ObjectId) => {
  try {
    logger.info({ message: `Called getUserByEmail service with ${id}` });
    const user = await UserModelSchema.findById(id);

    return user;
  } catch (error) {
    throw new ServerError(undefined, error.message);
  }
};

const deleteUserById = async (logger: Logger, userId: Schema.Types.ObjectId) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await UserModelSchema.findByIdAndDelete(userId).session(session);

    if (!user) throw new BadRequestError("User not found", "");

    const books = await BookModelSchema.deleteMany({
      createdBy: userId,
    }).session(session);


    await session.commitTransaction();

    return user;
  } catch (error) {}
};

export const userService = {
  getUserByEmail,
  getUserById,
  deleteUserById,
};
