import { Router } from "express";
import authRouter from "./auth.route";
import bookRoute from "./book.route";

const routes = Router({ mergeParams: true });

routes.use("/auth", authRouter);
routes.use("/books", bookRoute);

export default routes;
