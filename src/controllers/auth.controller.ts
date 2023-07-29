import { NextFunction, Request, Response } from "express"
import { IUser } from "modules";
import { authService } from "../services/auth.service";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;
    await authService.signup(user);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    
    next(error);
  }

}

export const authController = {
    signup
}