import { app } from "./app";
import { MongoDbConfig } from "./config/mongoDB";
import { APP_INITIALIZER } from "./constants/Logger";
import { Logger } from "./utils/logger";

const start = async () => {
  try {
    const mongoDbConfig = new MongoDbConfig();
    mongoDbConfig.initiateMongoConnection();

  } catch (error) {
    const logger = new Logger(APP_INITIALIZER);
    logger.error({ message: error });
  }
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
  });
};

start();
