import axios from "axios";
import { env } from "../config";
import { logger } from "../../src/utils";

const consulService = {
  register: async () => {
    if (env.ENVIRONMENT === "development") {
      throw new Error("Consul registration is not allowed in development mode");
    }
    if (env.CONSUL_PATH_PREFIX == undefined) {
      throw new Error("CONSUL_PATH_PREFIX is not defined");
    }
    logger.info("Registering service with Consul with the following details:");
    logger.info(`Endpoint Prefix: ${env.ENDPOINT_PREFIX}`);
    logger.info(`Service Name: ${env.SERVICE_NAME}`);
    logger.info(`Service Address: ${env.SERVICE_ADDRESS}`);
    logger.info(`Service Port: ${env.SERVICE_PORT}`);
    logger.info(`Consul Host: ${env.CONSUL_HOST}`);
    logger.info(`Consul Port: ${env.CONSUL_PORT}`);
    try {
      await axios.put(
        `${env.CONSUL_HOST}:${env.CONSUL_PORT}/v1/agent/service/register`,
        {
          Name: env.SERVICE_NAME,
          Address: env.SERVICE_ADDRESS,
          Port: env.SERVICE_PORT,
          Tags: [
            "traefik.enable=true",
            `traefik.http.routers.${env.SERVICE_NAME}.rule=PathPrefix(\`${env.ENDPOINT_PREFIX}${env.CONSUL_PATH_PREFIX}\`)`,
            `traefik.http.services.${env.SERVICE_NAME}.loadbalancer.server.port=${env.SERVICE_PORT}`,
            `traefik.http.services.${env.SERVICE_NAME}.loadbalancer.healthcheck.path=${env.ENDPOINT_PREFIX}/health`,
            `traefik.http.routers.${env.SERVICE_NAME}.middlewares=auth-middleware@file`,
            // OPTIONS router to handle CORS preflight requests - highest priority
            `traefik.http.routers.${env.SERVICE_NAME}-options.rule=PathPrefix(\`${env.ENDPOINT_PREFIX}${env.CONSUL_PATH_PREFIX}\`) && Method(\`OPTIONS\`)`,
            `traefik.http.routers.${env.SERVICE_NAME}-options.priority=200`,
            // Prometheus metrics available
            "prometheus",
          ],
          Meta: {
            prometheus_port: `${env.SERVICE_PORT}`,
            prometheus_path: `${env.ENDPOINT_PREFIX}/metrics`,
          },
          Checks: [
            {
              HTTP: `http://${env.SERVICE_ADDRESS}:${env.SERVICE_PORT}${env.ENDPOINT_PREFIX}/health`,
              Interval: "10s",
            },
            {
              HTTP: `http://${env.SERVICE_ADDRESS}:${env.SERVICE_PORT}${env.ENDPOINT_PREFIX}/metrics`,
              Interval: "30s",
              Timeout: "5s",
              Name: "prometheus-metrics",
            },
          ],
        }
      );
      logger.info(`${env.SERVICE_NAME} registered successfully with Consul`);
    } catch (error) {
      logger.error("Error registering service:", error);
    }
  },
};

export default consulService;
