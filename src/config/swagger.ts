import { Application } from "express";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { env } from "./environment";
import { logger } from "../../src/utils";
import { openApiRegistry } from "../dto";
import { swaggerPaths } from "../routes";
import swaggerUi from "swagger-ui-express";

// Register all the routes for Swagger documentation
swaggerPaths.forEach((path) => {
  openApiRegistry.registerPath(path);
});

// Swagger definition
const openApiGenerator = new OpenApiGeneratorV3(openApiRegistry.definitions);

const openApiDocument = openApiGenerator.generateDocument({
  info: {
    title: "TEMPLATE API",
    version: "1.0.0",
    description: "API documentation for Express app using Swagger",
  },
  servers: [
    {
      url: `http://localhost:3000${env.ENDPOINT_PREFIX}`,
    },
  ],
  openapi: "3.0.0",
});

// Function to setup Swagger in Express
export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  logger.info("> Swagger docs available at: http://localhost:3000/api-docs");
};
