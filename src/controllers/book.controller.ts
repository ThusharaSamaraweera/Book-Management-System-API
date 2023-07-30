import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";
import { BOOK_SERVICE } from "../constants/Logger";
import { NewBook } from "../modules";
import { bookService } from "../services/book.service";
import { Schema } from "mongoose";
import { apiResponse } from "../utils/successResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(BOOK_SERVICE)
    const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
    logger.info({ message: `Called create controller with ${req.body.title}, user ${userId}` });
    const book: NewBook = req.body;
    try {
        const createdBook = await bookService.create(logger, book, userId);
        res.json(apiResponse._201({createdBook}))
    } catch (error) {
        next(error)
    }
}

const getAllByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(BOOK_SERVICE)
    const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
    logger.info({ message: `Called getAllByUserId controller with user ${userId}` });
    try {
        const books = await bookService.getAllByUserId(logger, userId);
        res.json(apiResponse._200({books}))
    } catch (error) {
        next(error)
    }
}

export const bookController = {
    create,
    getAllByUserId
}