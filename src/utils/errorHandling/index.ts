import { NextFunction, Request, Response } from "express";
import { BaseError } from "./ErrorResponse";

class ErrorHandler {
  handleRequest(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
      const statusCode = err.httpCode || 500;
      return res.status(statusCode).send({ status: "error", message: err.name, description: err.description });
    }
    next();
  }
}

export const errorHandler = new ErrorHandler();

module.exports = { errorHandler };
