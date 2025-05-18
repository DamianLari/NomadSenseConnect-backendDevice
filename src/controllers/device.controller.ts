import {
  CreateIot,
  UpdateIot,
  iotListSchema,
  iotSchema,
} from "../dto/device.dto";
import { Request, Response } from "express";

import { DeviceNotFoundException } from "../types/exceptionsDevice";
import deviceService from "../services/device.service";

const deviceController = {
  getAll: async (_: Request, res: Response) => {
    try {
      const devices = await deviceService.getAll();
      res.status(200).json(iotListSchema.parse(devices));
    } catch (error) {
      res.status(500).json({ message: "Error fetching devices", error });
    }
  },

  getById: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    try {
      const device = await deviceService.getById(deviceId);
      res.status(200).json(iotSchema.parse(device));
    } catch (error) {
      if (error instanceof DeviceNotFoundException) {
        res.status(404).json({ message: "Device not found" });
        return;
      }
      res.status(500).json({ message: "Error fetching device", error });
    }
  },

  create: async (req: Request, res: Response) => {
    const deviceData: CreateIot = req.body;
    try {
      const device = await deviceService.create(deviceData);
      res.status(201).json(iotSchema.parse(device));
    } catch (error) {
      res.status(500).json({ message: "Error creating device", error });
    }
  },

  update: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const deviceData: UpdateIot = req.body;
    try {
      const device = await deviceService.update(deviceId, deviceData);
      res.status(200).json(iotSchema.parse(device));
    } catch (error) {
      if (error instanceof DeviceNotFoundException) {
        res.status(404).json({ message: "Device not found" });
        return;
      }
      res.status(500).json({ message: "Error updating device", error });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    try {
      const device = await deviceService.delete(deviceId);
      res.status(200).json(iotSchema.parse(device));
    } catch (error) {
      if (error instanceof DeviceNotFoundException) {
        res.status(404).json({ message: "Device not found" });
        return;
      }
      res.status(500).json({ message: "Error deleting device", error });
    }
  },
};

export default deviceController;
