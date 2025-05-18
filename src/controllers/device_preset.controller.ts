import { Request, Response } from "express";
import {
  devicePresetSchema,
  createDevicePresetSchema,
  updateDevicePresetSchema,
} from "../dto/device_preset.dto";
import devicePresetService from "../services/device_preset.service";

const devicePresetController = {
  getAll: async (_: Request, res: Response) => {
    try {
      const presets = await devicePresetService.getAll();
      res.status(200).json(devicePresetSchema.array().parse(presets));
    } catch (error) {
      res.status(500).json({ message: "Error fetching presets", error });
    }
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const preset = await devicePresetService.getById(id);
      res.status(200).json(devicePresetSchema.parse(preset));
    } catch (error) {
      res.status(404).json({ message: "Preset not found" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const validated = createDevicePresetSchema.parse(req.body);
      const created = await devicePresetService.create(validated);
      res.status(201).json(devicePresetSchema.parse(created));
    } catch (error) {
      res.status(500).json({ message: "Error creating preset", error });
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const validated = updateDevicePresetSchema.parse(req.body);
      const updated = await devicePresetService.update(id, validated);
      res.status(200).json(devicePresetSchema.parse(updated));
    } catch (error) {
      res.status(500).json({ message: "Error updating preset", error });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await devicePresetService.delete(id);
      res.status(200).json({ message: "Preset deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting preset", error });
    }
  },
};

export default devicePresetController;
