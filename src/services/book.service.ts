import { Schema } from "mongoose";
import { BookModelSchema } from "../data/MongoDb";
import { NewBook } from "../modules";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { userService } from "./user.service";
import { Logger } from "../utils/logger";

/**
 *
 * @param book
 * @param userId
 */
const create = async (logger: Logger, book: NewBook, userId: Schema.Types.ObjectId) => {
  logger.info({ message: `Called book creation service with title ${book.title} , user ${userId}` });
  try {
    // Check if user exists
    const user = await userService.getUserById(logger, userId);
    if (!user) {
      logger.error({ message: `User not found with id ${userId}` });
      throw new BadRequestError("", "User not found");
    }
    
    // Create book
    const bookModel = new BookModelSchema(book);
    bookModel.createdBy = userId;
    const createdBook = await bookModel.save();

    logger.info({ message: `Book created successfully with id ${createdBook._id}, user - ${userId}` });
    return createdBook;
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    throw new ServerError("Book creation failed", error.message);
  }
};

export const bookService = {
  create,
};
