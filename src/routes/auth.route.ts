import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authRequestValidator } from "../utils/requestValidator/authRequestValidator";

const authRouter: Router = Router();

authRouter.post("/signup", authRequestValidator.validateSignup, authController.signup);
authRouter.post("/login", authRequestValidator.validateLogin, authController.login);

export default authRouter;
