import {
  CreateIot,
  UpdateIot,
  createIotSchema,
  updateIotSchema,
} from "../dto/device.dto";
import Device, { IDevice } from "../models/device";

import {
  DeviceCreationException,
  DeviceDeletionException,
  DeviceNotFoundException,
  DeviceUpdateException,
  DeviceServiceException,
} from "../types/exceptionsDevice";

import { logger } from "../utils";

const deviceService = {
  getAll: async (): Promise<IDevice[]> => {
    try {
      const devices = await Device.find();
      return devices;
    } catch (error) {
      logger.error(`Error fetching devices: ${error}`);
      throw new DeviceServiceException();
    }
  },

  getById: async (deviceId: string): Promise<IDevice> => {
    try {
      const device = await Device.findOne({ id: deviceId });
      if (!device) {
        throw new DeviceNotFoundException(deviceId);
      }
      return device;
    } catch (error) {
      logger.error(`Error fetching device: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceServiceException();
    }
  },

  create: async (deviceData: CreateIot): Promise<IDevice> => {
    try {
      logger.info(`Creating device: ${JSON.stringify(deviceData)}`);
      const validatedData = createIotSchema.parse(deviceData);
      const device = new Device(validatedData);
      await device.save();
      return device;
    } catch (error) {
      logger.error(`Error creating device: ${error}`);
      throw new DeviceCreationException();
    }
  },

  update: async (
    deviceId: string,
    deviceData: UpdateIot
  ): Promise<IDevice> => {
    try {
      const validatedData = updateIotSchema.parse(deviceData);
      const updated = await Device.findOneAndUpdate(
        { id: deviceId },
        validatedData,
        { new: true, runValidators: true }
      );
      if (!updated) {
        throw new DeviceNotFoundException(deviceId);
      }
      return updated;
    } catch (error) {
      logger.error(`Error updating device: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceUpdateException();
    }
  },

  delete: async (deviceId: string): Promise<IDevice> => {
    try {
      const deleted = await Device.findOneAndDelete({ id: deviceId });
      if (!deleted) {
        throw new DeviceNotFoundException(deviceId);
      }
      return deleted;
    } catch (error) {
      logger.error(`Error deleting device: ${error}`);
      if (error instanceof DeviceNotFoundException) {
        throw error;
      }
      throw new DeviceDeletionException();
    }
  },
};

export default deviceService;
