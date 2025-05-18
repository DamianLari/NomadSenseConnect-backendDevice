import "reflect-metadata";

import { app } from "./src/app";
import {connect} from "mongoose"
import { consulService } from "./src/services";
import { env } from "./src/config";
import { logger } from "./src/utils";


// Lancement du serveur
const startServer = async () => {
  try {
    if (env.ENVIRONMENT === "development") {
      logger.info("Running in development mode");
    } else {
      logger.info("Running in production mode");
      consulService.register().then(() => {
        logger.info("Service registered with Consul");
      });
    }

    logger.info("Connecting to MongoDB...");
    //logger.info("MongoDB connection string:", `mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_NAME}?authSource=admin`);
    await connect(`mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_NAME}?authSource=admin`);
    
    app.listen(env.SERVICE_PORT, "0.0.0.0", () => {
      logger.info(
        `Server is running on http://${env.SERVICE_ADDRESS}:${env.SERVICE_PORT}`
      );
    });
  } catch (error) {
    logger.error("Error starting the server:", error);
  }
};
startServer();
