import { Router } from "express";
import bookRoute from "./book.route";
import { apiKeyMiddleware } from "../middleware/apiKeyMiddleware";
import { userController } from "../controllers/user.controller";

const userRoute: Router = Router({ mergeParams: true });

userRoute.use("/:userId/books", bookRoute)
userRoute.delete("/:userId", apiKeyMiddleware.postmanAPIKeyMiddleware, userController.deleteUser)

export default userRoute;