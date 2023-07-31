import { Router } from "express";
import authRouter from "./auth.route";
import publicRoutes from "./public.route";
import userRoute from "./user.route";
import { authTokenMiddleware } from "../middleware/authTokenMiddleware";

const routes = Router({ mergeParams: true });

routes.use("/auth", authRouter);
routes.use("/users", authTokenMiddleware, userRoute)
routes.use("/books", publicRoutes);

export default routes;
