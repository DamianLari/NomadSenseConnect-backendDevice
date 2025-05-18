import {
  createIotSchema,
  emptyBodySchema,
  iotListSchema,
  iotSchema,
  updateIotSchema,
  deleteIotSchema,
} from "../dto";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import deviceController from "../controllers/device.controller";
import { z } from "zod";
import { zodValidate } from "../middlewares";

const deviceRouter = Router();

const swaggerGetAllDevices: RouteConfig = {
  method: "get",
  path: "/devices",
  summary: "Get all IoT devices",
  description: "Returns a list of all registered IoT devices.",
  tags: ["Devices"],
  responses: {
    200: {
      description: "List of devices",
      content: {
        "application/json": {
          schema: iotListSchema,
        },
      },
    },
  },
};

const swaggerCreateDevice: RouteConfig = {
  method: "post",
  path: "/devices",
  summary: "Create a new IoT device",
  description: "Registers a new IoT device.",
  tags: ["Devices"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createIotSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Device created successfully",
      content: {
        "application/json": {
          schema: iotSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerGetDeviceById: RouteConfig = {
  method: "get",
  path: "/devices/{deviceId}",
  summary: "Get a device by ID",
  description: "Returns a specific IoT device by its ID.",
  tags: ["Devices"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Device details",
      content: {
        "application/json": {
          schema: iotSchema,
        },
      },
    },
    404: {
      description: "Device not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerUpdateDevice: RouteConfig = {
  method: "put",
  path: "/devices/{deviceId}",
  summary: "Update a device",
  description: "Updates a specific IoT device by its ID.",
  tags: ["Devices"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateIotSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Device updated successfully",
      content: {
        "application/json": {
          schema: iotSchema,
        },
      },
    },
    400: {
      description: "Invalid input data",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    404: {
      description: "Device not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerDeleteDevice: RouteConfig = {
  method: "delete",
  path: "/devices/{deviceId}",
  summary: "Delete a device",
  description: "Deletes a specific IoT device by its ID.",
  tags: ["Devices"],
  request: {
    params: z.object({
      deviceId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Device deleted successfully",
      content: {
        "application/json": {
          schema: iotSchema,
        },
      },
    },
    404: {
      description: "Device not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

deviceRouter.get("/",zodValidate(emptyBodySchema),deviceController.getAll);
deviceRouter.get("/:deviceId",zodValidate(emptyBodySchema),deviceController.getById);
deviceRouter.post("/",zodValidate(createIotSchema),deviceController.create);
deviceRouter.put("/:deviceId",zodValidate(updateIotSchema),deviceController.update);
deviceRouter.delete("/:deviceId",zodValidate(emptyBodySchema),deviceController.delete);

export const swaggerDevicesRoutes = [
  swaggerGetAllDevices,
  swaggerCreateDevice,
  swaggerGetDeviceById,
  swaggerUpdateDevice,
  swaggerDeleteDevice,
];

export default deviceRouter;
