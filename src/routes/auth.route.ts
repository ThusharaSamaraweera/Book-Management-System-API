import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authRequestValidator } from "../utils/requestValidator/authRequestValidator";

const router: Router = Router();

router.post("/signup", authRequestValidator.validateSignup, authController.signup);
router.post("/login", authRequestValidator.validateLogin, authController.login);

export default router;
