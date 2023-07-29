import { UserModelSchema } from "../data/MongoDb";
import { IUser } from "../modules";
import { ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";
import bcrypt from "bcryptjs";

const signup = async (logger: Logger, user: IUser) => {
  try {
    const userModel = new UserModelSchema(user);
    const salt = await bcrypt.genSalt(10);
    userModel.password = await bcrypt.hash(user.password, salt);
    await userModel.save();
  } catch (error) {
    throw new ServerError("User creation failed", error.message)
  }
  
};

export const authService = {
  signup,
};
