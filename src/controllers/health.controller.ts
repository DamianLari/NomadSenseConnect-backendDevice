import { Request, Response } from "express";

import { env } from "../config/environment";
import { formatEnvLog } from "../utils";

/**
 * Web service health check controller
 */
const healthController = {
  async getHealth(req: Request, res: Response) {
    try {
      res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        version: process.version,
        env: formatEnvLog(env),
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default healthController;
