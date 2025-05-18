import { Application } from "express";
import { metricsService } from "../services";

// Create a middleware to collect metrics
export const setupMetricsMiddleware = (app: Application) =>
  metricsService.setupMetricsMiddleware(app);
