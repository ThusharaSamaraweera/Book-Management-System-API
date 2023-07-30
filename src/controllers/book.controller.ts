import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";
import { BOOK_SERVICE } from "../constants/Logger";
import { NewBook } from "../modules";
import { bookService } from "../services/book.service";
import { Schema } from "mongoose";

const create = (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(BOOK_SERVICE)
    const book: NewBook = req.body;
    const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
    const createdBook = bookService.create(book, userId);
    try {
        logger.info({ message: `Called create controller with ${req.body.title}, user ${req}` });
    } catch (error) {
        
    }
}