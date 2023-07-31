import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

import { BOOK_SERVICE } from "../../constants/Logger";
import { NewBook } from "../../modules";
import { Logger } from "../logger";
import { validate } from "./commonValidator";
import { Schema } from "mongoose";
import { userService } from "../../services/user.service";
import { BadRequestError } from "../errorHandling/ErrorResponse";

const validateCreateBook = async (req: Request, res: Response, next: NextFunction) => {
    
  const data: NewBook = req.body;
  const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
  const logger = new Logger(BOOK_SERVICE);

  try {

    // Validate request body
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      author: Joi.string().min(3).max(50).required(),
      publicationYear: Joi.string().length(4).required(),
      genre: Joi.string().min(3).max(50).required(),
    });
    req.body = validate(schema, data);

    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    next(error);
  }
};

const validateUpdateBook = async (req: Request, res: Response, next: NextFunction) => {
  const data: NewBook = req.body;
  const logger = new Logger(BOOK_SERVICE);
  try {
    if(!req.params.bookId || req.params.bookId === ":bookId") throw new BadRequestError("Book id is required", "" )
    const bookId: Schema.Types.ObjectId = req.params.bookId as unknown as Schema.Types.ObjectId;

    // Validate request body
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).optional(),
      author: Joi.string().min(3).max(50).optional(),
      publicationYear: Joi.string().length(4).optional(),
      genre: Joi.string().min(3).max(50).optional(),
    });
    req.body = validate(schema, data);
    logger.info({ message: `Validated validateUpdateBook with ${bookId}` })
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    next(error);
  }
};

export const bookRequestValidator = {
    validateCreateBook,
    validateUpdateBook
};

