import {
  CreatePeekySettings,
  UpdatePeekySettings,
  createPeekySettingsSchema,
  updatePeekySettingsSchema,
} from "../dto/peeky.dto";
import PeekySettings, { IPeekySettings } from "../models/peeky";

import {
  PeekyCreationException,
  PeekyDeletionException,
  PeekyNotFoundException,
  PeekyUpdateException,
  PeekyServiceException,
} from "../types/exceptionsPeeky";

import { logger } from "../utils";

const peekyService = {
  getById: async (deviceId: string): Promise<IPeekySettings> => {
    try {
      const settings = await PeekySettings.findOne({ id: deviceId });
      if (!settings) {
        throw new PeekyNotFoundException(deviceId);
      }
      return settings;
    } catch (error) {
      logger.error(`Error fetching peeky settings: ${error}`);
      if (error instanceof PeekyNotFoundException) {
        throw error;
      }
      throw new PeekyServiceException();
    }
  },
  getAll: async (): Promise<IPeekySettings[]> => {
    try {
      const settings = await PeekySettings.find();
      return settings;
    } catch (error) {
      logger.error(`Error fetching all peeky settings: ${error}`);
      throw new PeekyServiceException();
    }
  },
  create: async (deviceId: string, data: CreatePeekySettings): Promise<IPeekySettings> => {
    try {
      logger.info(`Creating peeky settings for ${deviceId}: ${JSON.stringify(data)}`);
      const validated = createPeekySettingsSchema.parse(data);
      
      const settings = new PeekySettings({ id: deviceId, ...validated });
      await settings.save();
      return settings;
    } catch (error) {
      logger.error(`Error creating peeky settings: ${error}`);
      throw new PeekyCreationException();
    }
  },

  update: async (deviceId: string, data: UpdatePeekySettings): Promise<IPeekySettings> => {
    try {
      const validated = updatePeekySettingsSchema.parse(data);
      const updated = await PeekySettings.findOneAndUpdate(
        { id: deviceId },
        validated,
        { new: true, runValidators: true }
      );
      if (!updated) {
        throw new PeekyNotFoundException(deviceId);
      }
      return updated;
    } catch (error) {
      logger.error(`Error updating peeky settings: ${error}`);
      if (error instanceof PeekyNotFoundException) {
        throw error;
      }
      throw new PeekyUpdateException();
    }
  },

  delete: async (deviceId: string): Promise<IPeekySettings> => {
    try {
      const deleted = await PeekySettings.findOneAndDelete({ id: deviceId });
      if (!deleted) {
        throw new PeekyNotFoundException(deviceId);
      }
      return deleted;
    } catch (error) {
      logger.error(`Error deleting peeky settings: ${error}`);
      if (error instanceof PeekyNotFoundException) {
        throw error;
      }
      throw new PeekyDeletionException();
    }
  },
};

export default peekyService;
