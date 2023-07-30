import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";
import { BOOK_SERVICE } from "../constants/Logger";
import { NewBook } from "../modules";
import { bookService } from "../services/book.service";
import { Schema } from "mongoose";
import { apiResponse } from "../utils/successResponse";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);
  const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
  logger.info({ message: `Called create controller with ${req.body.title}, user ${userId}` });
  const book: NewBook = req.body;
  try {
    const createdBook = await bookService.create(logger, book, userId);
    res.json(apiResponse._201({ createdBook }));
  } catch (error) {
    next(error);
  }
};

const getAllByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);
  try {
    if (!req.params.userId || req.params.userId === ":userId") throw new BadRequestError("User id is required", "");

    const userId: Schema.Types.ObjectId = req.params?.userId as unknown as Schema.Types.ObjectId;

    logger.info({ message: `Called getAllByUserId controller with user ${userId}` });
    const books = await bookService.getAllByUserId(logger, userId);
    res.json(apiResponse._200({ books }));
  } catch (error) {
    next(error);
  }
};

const filterBooks = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);
  const title = req.query["title"] as string;
  const author = req.query["author"] as string;
  const genre = req.query["genre"] as string;

  logger.info({ message: `Called filterBooks controller with ${title}, ${author} and ${genre}` });
  try {
    const books = await bookService.filterBooks(logger, title, author, genre);
    res.json(apiResponse._200({ books }));
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);

  try {
    if (!req.params.bookId || req.params.bookId === ":bookId") throw new BadRequestError("Book id is required", "");
    const bookId: Schema.Types.ObjectId = req.params?.bookId as unknown as Schema.Types.ObjectId;
    const book = await bookService.getBookById(logger, bookId);
    res.json(apiResponse._200({ book }));
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);
  try {
    if (!req.params.bookId || req.params.bookId === ":bookId") throw new BadRequestError("Book id is required", "");
    const bookId: Schema.Types.ObjectId = req.params?.bookId as unknown as Schema.Types.ObjectId;
    const book: NewBook = req.body;
    logger.info({ message: `Called updateBook controller with ${bookId}` });
    const updatedBook = await bookService.updateBook(logger, bookId, book);
    res.json(apiResponse._200({ updatedBook }));
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(BOOK_SERVICE);
  try {
    if(!req.params.bookId || req.params.bookId === ":bookId") throw new BadRequestError("Book id is required", "");

    const bookId: Schema.Types.ObjectId = req.params?.bookId as unknown as Schema.Types.ObjectId;
    logger.info({ message: `Called deleteBook controller with book id - ${bookId}` });
    const deletedBook = await bookService.deleteBook(logger, bookId);
    res.json(apiResponse._200({ deletedBook }));
  } catch (error) {
    next(error);
  }
}

export const bookController = {
  create,
  getAllByUserId,
  filterBooks,
  getBookById,
  updateBook,
  deleteBook,
};
