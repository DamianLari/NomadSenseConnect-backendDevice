import { NextFunction, Request, Response } from "express";

import { AnyZodObject } from "zod";

export const zodValidate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(422).json(result.error);
    } else {
      req.body = result.data;
      next();
    }
  };
