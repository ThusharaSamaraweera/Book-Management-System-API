import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { AUTH_SERVICE } from "../constants/Logger";
import { Logger } from "../utils/logger";
import { Schema } from "mongoose";
import { UnauthorizedError } from "../utils/errorHandling/ErrorResponse";

const validUser = async (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(AUTH_SERVICE);

    const userId: Schema.Types.ObjectId = req.params.userId as unknown as Schema.Types.ObjectId;
    const user = await userService.getUserById(logger, userId);
    logger.info({ message: `Validating user with id ${userId}` });

    // @ts-ignore
    req.params.user = user;
    if (!user) {
        logger.error({ message: `User not found with id ${userId}` });
        next(new UnauthorizedError("User not found", ""));
    }
    next();
}

export const routeProtector = {
    validUser
}