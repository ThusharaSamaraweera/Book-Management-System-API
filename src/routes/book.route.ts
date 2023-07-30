import { Router } from "express";
import { bookRequestValidator } from "../utils/requestValidator/bookRequestValidator";
import { bookController } from "../controllers/book.controller";

const bookRoute: Router = Router({ mergeParams: true });

bookRoute.post("/", bookRequestValidator.validateCreateBook, bookController.create);
bookRoute.get("/users/:userId", bookController.getAllByUserId);
bookRoute.get("/", bookController.filterBooks);

export default bookRoute;
