import { Schema } from "mongoose";
import { BookModelSchema } from "../data/MongoDb";
import { BookFilterQuery, IBook, NewBook } from "../modules";
import { BadRequestError, NotFoundError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger";

/**
 *  Create book
 * @param book
 * @param userId
 * @returns {IBook} createdBook
 */
const create = async (logger: Logger, book: NewBook, userId: Schema.Types.ObjectId) => {
  logger.info({ message: `Called book creation service with title ${book.title} , user ${userId}` });
  try {
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

/**
 * Get book by id
 * @param logger
 * @param userId
 * @returns {IBook[]} books
 */
const getAllByUserId = async (logger: Logger, userId: Schema.Types.ObjectId) => {
  logger.info({ message: `Called getAllByUserId service with user ${userId}` });
  try {
    const books = await BookModelSchema.find({ createdBy: userId });
    logger.info({ message: `Getting books for user - ${userId}` });
    return books;
  } catch (error) {
    throw new ServerError("Books fetching failed", error.message);
  }
};

/**
 * Filter books by title, author and genre
 * @param logger
 * @param title
 * @param author
 * @param genre
 * @returns {IBook[]} books
 */
const filterBooks = async (logger: Logger, title: string, author: string, genre: string) => {
  logger.info({ message: `Called filterBook service` });

  let queryObj: BookFilterQuery = {};
  if (title) queryObj.title = title;
  if (author) queryObj.author = author;
  if (genre) queryObj.genre = genre;

  try {
    const books = await BookModelSchema.find({
      title: { $regex: queryObj.title, $options: "i" },
      author: { $regex: queryObj.author, $options: "i" },
      genre: { $regex: queryObj.genre, $options: "i" },
    });
    logger.info({ message: `Fetched all books` });
    return books;
  } catch (error) {}
};

/**
 * Get book by id
 * @param logger
 * @param bookId
 * @returns {IBook} book
 */
const getBookById = async (logger: Logger, bookId: Schema.Types.ObjectId) => {
  try {
    logger.info({ message: `Fetching book with id ${bookId}` });
    const book = await BookModelSchema.findById(bookId);
    if (!book) throw new NotFoundError("Book not found", "");

    return book;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new ServerError("Book fetching failed", error.message);
  }
};

const updateBook = async (logger: Logger, bookId: Schema.Types.ObjectId, updatingBook: NewBook) => {
  try {
    logger.info({ message: `Updating book with id ${bookId}` });

    // Check if book exists, if not throw error
    const existingBook = await getBookById(logger, bookId);

    // Update book
    if (updatingBook.title) existingBook.title = updatingBook.title;
    if (updatingBook.author) existingBook.author = updatingBook.author;
    if (updatingBook.genre) existingBook.genre = updatingBook.genre;
    if( updatingBook.publicationYear) existingBook.publicationYear = updatingBook.publicationYear;


    // Save updated book
    const updatedBook = await BookModelSchema.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        $set: updatingBook,
      },
      {
        new: true,
      }
    );

    return updatedBook;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new ServerError("Book updating failed", error.message);
  }
};

export const bookService = {
  create,
  getAllByUserId,
  filterBooks,
  getBookById,
  updateBook,
};
