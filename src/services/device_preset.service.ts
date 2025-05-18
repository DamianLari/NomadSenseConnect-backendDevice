import DevicePreset, { IDevicePreset } from "../models/device_preset";
import {
  CreateDevicePreset,
  UpdateDevicePreset,
  createDevicePresetSchema,
  updateDevicePresetSchema
} from "../dto/device_preset.dto";

import {
  DeviceCreationException,
  DeviceDeletionException,
  DeviceNotFoundException,
  DeviceUpdateException,
  DeviceServiceException,
} from "../types/exceptionsDevice";

import { logger } from "../utils";

const devicePresetService = {
  getAll: async (): Promise<IDevicePreset[]> => {
    try {
      return await DevicePreset.find();
    } catch (error) {
      logger.error(`Error fetching presets: ${error}`);
      throw new DeviceServiceException();
    }
  },

  getById: async (id: string): Promise<IDevicePreset> => {
    try {
      const preset = await DevicePreset.findById(id);
      if (!preset) throw new DeviceNotFoundException(id);
      return preset;
    } catch (error) {
      logger.error(`Error fetching preset: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceServiceException();
    }
  },

  create: async (data: CreateDevicePreset): Promise<IDevicePreset> => {
    try {
      logger.info(`Creating preset: ${JSON.stringify(data)}`);
      const validated = createDevicePresetSchema.parse(data);
      const preset = new DevicePreset(validated);
      await preset.save();
      return preset;
    } catch (error) {
      logger.error(`Error creating preset: ${error}`);
      throw new DeviceCreationException();
    }
  },

  update: async (id: string, data: UpdateDevicePreset): Promise<IDevicePreset> => {
    try {
      const validated = updateDevicePresetSchema.parse(data);
      const updated = await DevicePreset.findByIdAndUpdate(id, validated, {
        new: true,
        runValidators: true,
      });
      if (!updated) throw new DeviceNotFoundException(id);
      return updated;
    } catch (error) {
      logger.error(`Error updating preset: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceUpdateException();
    }
  },

  delete: async (id: string): Promise<IDevicePreset> => {
    try {
      const deleted = await DevicePreset.findByIdAndDelete(id);
      if (!deleted) throw new DeviceNotFoundException(id);
      return deleted;
    } catch (error) {
      logger.error(`Error deleting preset: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceDeletionException();
    }
  },
};

export default devicePresetService;
