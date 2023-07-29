import { Router } from "express";
import {authController} from "../controllers/auth.controller";

const router: Router = Router();

router.post('/signup', authController.signup)


export default router;