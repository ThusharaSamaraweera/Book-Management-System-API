import { app } from "./app";
import { MongoDbConfig } from "./data/MongoDb/connection";
import { APP_INITIALIZER, MONGODB_SERVICE } from "./constants/Logger";
import { Logger } from "./utils/logger";

const start = async () => {
  try {
    const mongoDbConfig = new MongoDbConfig();
    mongoDbConfig.initiateMongoConnection();

  } catch (error) {
    const mongodbLogger = new Logger(MONGODB_SERVICE);
    mongodbLogger.error({ message: `Error in connecting Mongo DB ${error.message}` });
  }
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
  });
};

start();
