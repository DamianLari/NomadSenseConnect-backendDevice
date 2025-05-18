import {
  devicePresetSchema,
  createDevicePresetSchema,
  updateDevicePresetSchema,
  deleteDevicePresetSchema,
} from "../dto/device_preset.dto";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";
import { zodValidate } from "../middlewares";
import devicePresetController from "../controllers/device_preset.controller";

const presetRouter = Router();

const emptyBodySchema = z.object({});

const swaggerGetAllPresets: RouteConfig = {
  method: "get",
  path: "/presets",
  summary: "Get all device presets",
  description: "Returns a list of all configured device templates.",
  tags: ["Presets"],
  responses: {
    200: {
      description: "List of device presets",
      content: {
        "application/json": {
          schema: z.array(devicePresetSchema),
        },
      },
    },
  },
};

const swaggerGetPresetById: RouteConfig = {
  method: "get",
  path: "/presets/{id}",
  summary: "Get a preset by ID",
  description: "Returns a specific device preset by its ID.",
  tags: ["Presets"],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Preset details",
      content: {
        "application/json": {
          schema: devicePresetSchema,
        },
      },
    },
    404: {
      description: "Preset not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerCreatePreset: RouteConfig = {
  method: "post",
  path: "/presets",
  summary: "Create a new preset",
  description: "Creates a new reusable device preset.",
  tags: ["Presets"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createDevicePresetSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Preset created",
      content: {
        "application/json": {
          schema: devicePresetSchema,
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
  },
};

const swaggerUpdatePreset: RouteConfig = {
  method: "put",
  path: "/presets/{id}",
  summary: "Update a preset",
  description: "Updates an existing device preset.",
  tags: ["Presets"],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateDevicePresetSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Preset updated",
      content: {
        "application/json": {
          schema: devicePresetSchema,
        },
      },
    },
    404: {
      description: "Preset not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

const swaggerDeletePreset: RouteConfig = {
  method: "delete",
  path: "/presets/{id}",
  summary: "Delete a preset",
  description: "Deletes a preset by its ID.",
  tags: ["Presets"],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Preset deleted",
      content: {
        "application/json": {
          schema: devicePresetSchema,
        },
      },
    },
    404: {
      description: "Preset not found",
      content: {
        "application/json": {
          schema: emptyBodySchema,
        },
      },
    },
  },
};

presetRouter.get("/", zodValidate(emptyBodySchema), devicePresetController.getAll);
presetRouter.get("/:presetId", zodValidate(emptyBodySchema), devicePresetController.getById);
presetRouter.post("/", zodValidate(createDevicePresetSchema), devicePresetController.create);
presetRouter.put("/:presetId", zodValidate(updateDevicePresetSchema), devicePresetController.update);
presetRouter.delete("/:presetId", zodValidate(emptyBodySchema), devicePresetController.delete);

export const swaggerPresetRoutes = [
  swaggerGetAllPresets,
  swaggerGetPresetById,
  swaggerCreatePreset,
  swaggerUpdatePreset,
  swaggerDeletePreset,
];

export default presetRouter;
