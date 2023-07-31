import mongoose from "mongoose";
import { Logger } from "../../utils/logger";
import { MONGODB_SERVICE } from "../../constants/Logger";
import { DBError } from "../../utils/errorHandling/ErrorResponse";

export class MongoDbConfig {
  private readonly mongoUrl =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST_NAME}` +
    `/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
  private readonly logger = new Logger(MONGODB_SERVICE);

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose
      .connect(this.mongoUrl)
      .then(() => {
        this.logger.info({ message: "Mongo DB connection established successfully" });
      })
      .catch((err: Error) => {
        throw new DBError("", err.message);
      });
  }
}
