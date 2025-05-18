import deviceRouter from "./device.routes";

import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { emptyBodySchema } from "../dto";
import { healthController } from "../controllers";
import { zodValidate } from "../middlewares";

const router = Router();

// Register device routes
router.use("/devices", deviceRouter);

// Health check route
const swaggerGetHealth: RouteConfig = {
  method: "get",
  path: "/health",
  summary: "Health check route",
  description: "Returns the health status of the service.",
  tags: ["Health"],
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    500: {
      description: "Service is unhealthy",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};
router.get("/health", zodValidate(emptyBodySchema), healthController.getHealth);

// Prometheus metrics route
const swaggerGetMetrics: RouteConfig = {
  method: "get",
  path: "/metrics",
  summary: "Prometheus metrics route",
  description: "Returns Prometheus metrics.",
  tags: ["Metrics"],
  responses: {
    200: {
      description: "Prometheus metrics",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};
/**
 * The /metrics route is exposed by the prometheus service.
 * It is not directly handled by the controller.
 * The prometheus service will handle the request and return the metrics.
 * c.f.: ./src/sercices/prometheus.service.ts
 */

// All swagger paths should be added here
export const swaggerPaths = [
  swaggerGetHealth,
  swaggerGetMetrics,
];

export default router;
