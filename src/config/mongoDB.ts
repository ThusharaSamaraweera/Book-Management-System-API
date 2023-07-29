import mongoose from "mongoose";

export class MongoDbConfig {
  private readonly mongoUrl =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST_NAME}` +
    `/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose
      .connect(this.mongoUrl)
      .then(() => {
        console.log("Connected to MongoDb");
      })
      .catch((err: Error) => {
        throw `There is error in connecting Mongo DB ${err.message}`;
      });
  }
}
