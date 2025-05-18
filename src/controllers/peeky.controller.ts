import { Request, Response } from "express";
import {
  peekySettingsSchema,
  CreatePeekySettings,
  UpdatePeekySettings,
} from "../dto/peeky.dto";
import peekyService from "../services/peeky.service";
import { 
  PeekyNotFoundException 
} from "../types/exceptionsPeeky";

const peekyController = {
  getAll: async (_: Request, res: Response) => {
    try {
      const all = await peekyService.getAll();
      res.status(200).json(peekySettingsSchema.array().parse(all));
    } catch (error) {
      res.status(500).json({ message: "Error fetching settings", error });
    }
  },

  getById: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    try {
      const settings = await peekyService.getById(deviceId);
      res.status(200).json(peekySettingsSchema.parse(settings));
    } catch (error) {
      if (error instanceof PeekyNotFoundException) {
        res.status(404).json({ message: "Settings not found" });
        return;
      }
      res.status(500).json({ message: "Error fetching settings", error });
    }
  },

  create: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const data: CreatePeekySettings = req.body;
    try {
      const created = await peekyService.create(deviceId, data);
      res.status(201).json(peekySettingsSchema.parse(created));
    } catch (error) {
      res.status(500).json({ message: "Error creating settings", error });
    }
  },

  update: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const data: UpdatePeekySettings = req.body;
    try {
      const updated = await peekyService.update(deviceId, data);
      res.status(200).json(peekySettingsSchema.parse(updated));
    } catch (error) {
      if (error instanceof PeekyNotFoundException) {
        res.status(404).json({ message: "Settings not found" });
        return;
      }
      res.status(500).json({ message: "Error updating settings", error });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    try {
      const deleted = await peekyService.delete(deviceId);
      res.status(200).json({ message: "Settings deleted", data: deleted });
    } catch (error) {
      if (error instanceof PeekyNotFoundException) {
        res.status(404).json({ message: "Settings not found" });
        return;
      }
      res.status(500).json({ message: "Error deleting settings", error });
    }
  },
};

export default peekyController;
