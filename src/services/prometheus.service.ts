import { Application } from "express";
import { env } from "../config";
import promBundle from "express-prom-bundle";
import promClient from "prom-client";

export class MetricsService {
  private register: promClient.Registry;
  public metrics: Record<string, any> = {};

  constructor(serviceName: string) {
    this.register = new promClient.Registry();
    promClient.collectDefaultMetrics({
      register: this.register,
    });

    this.initMetrics(serviceName);
  }

  private initMetrics(serviceName: string) {
    this.metrics.requestCounter = new promClient.Counter({
      name: `${serviceName}_requests_total`,
      help: "Total number of requests",
      labelNames: ["method", "path", "status"],
    });

    this.metrics.activeRequests = new promClient.Gauge({
      name: `${serviceName}_active_requests`,
      help: "Number of requests currently being processed",
    });

    this.metrics.requestLatency = new promClient.Histogram({
      name: `${serviceName}_request_latency_seconds`,
      help: "Request latency in seconds",
      labelNames: ["method", "path"],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    });

    Object.values(this.metrics).forEach((metric) => {
      this.register.registerMetric(metric);
    });
  }

  public setupMetricsMiddleware(app: Application) {
    // Middleware pour collecter automatiquement les métriques HTTP
    const metricsMiddleware = promBundle({
      includeMethod: true,
      includePath: true,
      promRegistry: this.register,
      normalizePath: [
        ["^" + env.ENDPOINT_PREFIX + "/(.*)", "/$1"], // Normaliser les chemins avec le préfixe
      ],
    });

    app.use(metricsMiddleware);

    // Endpoint pour exposer les métriques
    app.get(`${env.ENDPOINT_PREFIX}/metrics`, async (req, res) => {
      res.set("Content-Type", this.register.contentType);
      res.end(await this.register.metrics());
    });
  }

  // Méthode pour ajouter des métriques spécifiques à l'application
  public addCustomMetric(
    name: string,
    metricType: "counter" | "gauge" | "histogram" | "summary",
    config: any
  ) {
    let metric;

    switch (metricType) {
      case "counter":
        metric = new promClient.Counter(config);
        break;
      case "gauge":
        metric = new promClient.Gauge(config);
        break;
      case "histogram":
        metric = new promClient.Histogram(config);
        break;
      case "summary":
        metric = new promClient.Summary(config);
        break;
      default:
        throw new Error(`Unsupported metric type: ${metricType}`);
    }

    this.register.registerMetric(metric);
    this.metrics[name] = metric;
    return metric;
  }
}

export const metricsService = new MetricsService(env.SERVICE_NAME);
