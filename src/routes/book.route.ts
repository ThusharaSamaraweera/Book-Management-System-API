import { Router } from "express";
import { bookController } from "../controllers/book.controller";

const route: Router = Router();

route.post("/:userId", bookController.create);

export default route; 