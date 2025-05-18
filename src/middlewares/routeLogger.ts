import { NextFunction, Request, Response } from "express";

import { logger } from "../utils";

/**
 * @function routeLogger
 * @description Middleware to log the request method and URL
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @example
 * // Log format : [2023-10-01T12:00:00.000Z] [GET] /api/v1/users [200] (100ms)
 * // Log format : [2023-10-01T12:00:00.000Z] [POST] /api/v1/users [201] (200ms)
 */
export const routeLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now(); // Capture start time

  res.on("finish", () =>
    logger.logRoute(start, res.statusCode, req.method, req.originalUrl)
  );

  next();
};
