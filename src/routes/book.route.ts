import { Router } from "express";
import { bookController } from "../controllers/book.controller";
import { bookRequestValidator } from "../utils/requestValidator/bookRequestValidator";

const BookRoute: Router = Router({ mergeParams: true});

BookRoute.post("/", bookRequestValidator.validateCreateBook, bookController.create);
BookRoute.get("/", bookController.getAllByUserId);

export default BookRoute; 