import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";
import { AUTH_SERVICE } from "../constants/Logger";
import { UnauthorizedError } from "../utils/errorHandling/ErrorResponse";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  const logger = new Logger(AUTH_SERVICE);

  try {
    if (!header) {
      logger.error({ message: "No token, authorization denied" });
      throw new UnauthorizedError("No token, authorization denied", "");
    } else {
      const token = header.split(" ")[1];
      const payload = authService.getPayloadByToken(logger, token);
      const user = await userService.getUserById(logger, payload.id);
      if (!user) {
        logger.error({ message: "User not found" });
        throw new UnauthorizedError("User not found", "");
      }
      next();
    }
  } catch (error) {
    const errorNames = ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"];
    if (error.name && errorNames.includes(error.name))
      return next(new UnauthorizedError("Invalid or expired token.", ""));
    next(error);
  }
};
