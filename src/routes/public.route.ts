import { Router } from "express";
import { bookController } from "../controllers/book.controller";

const publicRoutes: Router = Router();

publicRoutes.get("/", bookController.filterBooks);
publicRoutes.get("/:bookId", bookController.getBookById);

export default publicRoutes;