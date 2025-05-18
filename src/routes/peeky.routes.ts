import {
  peekySettingsSchema,
  createPeekySettingsSchema,
  updatePeekySettingsSchema,
  deletePeekySettingsSchema,
} from "../dto/peeky.dto";

import { z } from "zod";
const emptyBodySchema = z.object({});
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { zodValidate } from "../middlewares";
import peekyController from "../controllers/peeky.controller";

const peekyRouter = Router();

const swaggerGetPeekySettings: RouteConfig = {
  method: "get",
  path: "/modules/peeky/{deviceId}",
  summary: "Get Peeky settings",
  description: "Returns the Peeky module settings for a device.",
  tags: ["Modules", "Peeky"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Peeky settings",
      content: {
        "application/json": {
          schema: peekySettingsSchema,
        },
      },
    },
    404: {
      description: "Settings not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerCreatePeekySettings: RouteConfig = {
  method: "post",
  path: "/modules/peeky/{deviceId}",
  summary: "Create Peeky settings",
  description: "Creates Peeky settings for a specific device.",
  tags: ["Modules", "Peeky"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createPeekySettingsSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Settings created",
      content: {
        "application/json": {
          schema: peekySettingsSchema,
        },
      },
    },
    400: {
      description: "Invalid body",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerUpdatePeekySettings: RouteConfig = {
  method: "put",
  path: "/modules/peeky/{deviceId}",
  summary: "Update Peeky settings",
  description: "Updates Peeky settings for a specific device.",
  tags: ["Modules", "Peeky"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updatePeekySettingsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Settings updated",
      content: {
        "application/json": {
          schema: peekySettingsSchema,
        },
      },
    },
    400: {
      description: "Invalid input",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    404: {
      description: "Settings not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerDeletePeekySettings: RouteConfig = {
  method: "delete",
  path: "/modules/peeky/{deviceId}",
  summary: "Delete Peeky settings",
  description: "Deletes Peeky settings for a specific device.",
  tags: ["Modules", "Peeky"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Settings deleted",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    404: {
      description: "Settings not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

peekyRouter.get(
  "/",
  zodValidate(emptyBodySchema),
  peekyController.getAll
);
peekyRouter.get(
  "/:deviceId",
  zodValidate(emptyBodySchema),
  peekyController.getById
);
peekyRouter.post(
  "/",
  zodValidate(createPeekySettingsSchema),
  peekyController.create
);
peekyRouter.put(
  "/:deviceId",
  zodValidate(updatePeekySettingsSchema),
  peekyController.update
);
peekyRouter.delete(
  "/:deviceId",
  zodValidate(emptyBodySchema),
  peekyController.delete
);
//
export const swaggerPeekyRoutes = [
  swaggerGetPeekySettings,
  swaggerCreatePeekySettings,
  swaggerUpdatePeekySettings,
  swaggerDeletePeekySettings,
];

export default peekyRouter;
