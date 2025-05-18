import dotenv from "dotenv";
import {logger } from "../utils";
import { z } from "zod";

dotenv.config();

// Create zod schema for environment variables
const envSchema = z.object({
  /**
   * The environment in which the application is running. This can be either "development" or "production".
   * @default "development"
   */
  ENVIRONMENT: z.enum(["development", "production"]).default("development"),
  /**
   * The prefix for the API endpoints. This is used to define the base path for all routes.
   * For example, if the prefix is "/api", then the health check endpoint will be "/api/health".
   * @default "/api"
   */
  ENDPOINT_PREFIX: z.string().default("/api"),
  /**
   * The port on which the service will run.
   */
  SERVICE_PORT: z.coerce.number(),
  /**
   * The address of the service. This is used to register the service with Consul.
   */
  SERVICE_ADDRESS: z.string(),
  /**
   * The name of the service. This is used to register the service with Consul.
   */
  SERVICE_NAME: z.string(),
  /**
   * The host of the Consul agent. This is used to register the service with Consul.
   * @default "consul"
   * @example "consul"
   */
  CONSUL_HOST: z.string().default("consul"),
  /**
   * The port of the Consul agent. This is used to register the service with Consul.
   * @default 8500
   * @example 8500
   */
  CONSUL_PORT: z.coerce.number().default(8500),
  /**
   * The path prefix for the service in Consul. This is used to register the service with Consul.
   * For example, if the path prefix is "/my-service", then the service will be registered with the path "/my-service".
   * @default ""
   * @example "/my-service"
   */
  CONSUL_PATH_PREFIX: z.string().optional(),
  /**
   * The host of the MongoDB database. This is used to connect to the database.
   * @example "mongodb://localhost:27017/order-service"
   */
  MONGODB_HOST: z.string(),
  /**
   * The port of the MongoDB database. This is used to connect to the database.
   * @default 27017
   * @example 27017
   */
  MONGODB_PORT: z.coerce.number().default(27017),
  /**
   * The name of the MongoDB database. This is used to connect to the database.
   * @example "restaurant-service"
   */
  MONGODB_NAME: z.string(),
  /**
   * The username for the MongoDB database. This is used to connect to the database.
   * @example "admin"
   */
  MONGODB_USERNAME: z.string().transform((val) => encodeURIComponent(val)),
  /**
   * The password for the MongoDB database. This is used to connect to the database.
   * @example "password"
   */
  MONGODB_PASSWORD: z.string().transform((val) => encodeURIComponent(val)),

});

// Parse and validate environment variables
type Environment = z.infer<typeof envSchema>;
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

// Export the validated environment variables
export const env = parsedEnv.data;
export type { Environment };
