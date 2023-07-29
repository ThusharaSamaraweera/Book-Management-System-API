import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./utils/errorHandling";
import routes from "./routes";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
express.urlencoded({ extended: true });

app.get("/api", (req: Request, res: Response) => res.status(200).json({ msg: "API Running" }));
app.use("/v1", routes);
app.use(errorHandler.handleRequest);

module.exports = { app };
