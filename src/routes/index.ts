import { Router } from "express";
import authRouter from "./auth.route";
import bookRouter from "./user.route";
import { routeProtector } from "../middleware/routeProtector";

const routes = Router();

routes.use("/auth", authRouter )
routes.use("/users/:userId/books", routeProtector.validUser, bookRouter )

export default routes;