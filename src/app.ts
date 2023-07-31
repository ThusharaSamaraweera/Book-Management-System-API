import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import { errorHandler } from "./utils/errorHandling";
import routes from "./routes";

dotenv.config();
export const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
express.urlencoded({ extended: true });

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.get("/api", (req: Request, res: Response) => res.status(200).json({ msg: "API Running" }));
app.use("/v1", routes);
app.use(errorHandler.handleRequest);

module.exports = { app };
