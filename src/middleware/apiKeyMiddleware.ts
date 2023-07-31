import { NextFunction, Request, Response } from "express";

const postmanAPIKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("x-api-key");
    if (!header) {
        return res.status(401).json({ msg: "No API key, authorization denied" });
    } else if (header !== process.env.POSTMAN_API_KEY) {
        return res.status(401).json({ msg: "Invalid API key, authorization denied" });
    }
    next();
}

export const apiKeyMiddleware = {
    postmanAPIKeyMiddleware
}