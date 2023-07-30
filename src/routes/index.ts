import { Router } from "express";
import authRouter from "./auth.route";
import bookRouter from "./book.route";

const routes = Router();

routes.use("/auth", authRouter )
routes.use("/books", bookRouter )

export default routes;