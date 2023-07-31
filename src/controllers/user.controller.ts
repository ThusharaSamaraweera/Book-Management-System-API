import { NextFunction, Request, Response } from "express"
import { USER_SERVICE } from "../constants/Logger";
import { Logger } from "../utils/logger";
import { userService } from "../services/user.service";
import { apiResponse } from "../utils/successResponse";
import { Schema } from "mongoose";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(USER_SERVICE);
    const userId = req.params.userId as unknown as Schema.Types.ObjectId;

    try {
        const deletedUser = await userService.deleteUserById(logger, userId);
        res.json(apiResponse._200({ deletedUser }))
    } catch (error) {
        next(error);
    }
}

export const userController = {
    deleteUser
}