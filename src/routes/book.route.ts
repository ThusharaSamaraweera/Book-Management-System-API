import { Router } from "express";
import { bookRequestValidator } from "../utils/requestValidator/bookRequestValidator";
import { bookController } from "../controllers/book.controller";

const bookRoute: Router = Router({ mergeParams: true });

bookRoute.post("/", bookRequestValidator.validateCreateBook, bookController.create);
bookRoute.get("/", bookController.getAllByUserId);
bookRoute.patch("/:bookId", bookRequestValidator.validateUpdateBook, bookController.updateBook);
bookRoute.delete("/:bookId", bookController.deleteBook);

export default bookRoute;
