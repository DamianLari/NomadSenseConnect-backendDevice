class DeviceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeviceException";
  }
}

class DeviceNotFoundException extends DeviceException {
  constructor(deviceId: string) {
    super(`Device with ID ${deviceId} not found`);
    this.name = "DeviceNotFoundException";
  }
}

class DeviceCreationException extends DeviceException {
  constructor() {
    super("Error creating Device");
    this.name = "DeviceCreationException";
  }
}

class DeviceUpdateException extends DeviceException {
  constructor() {
    super("Error updating Device");
    this.name = "DeviceUpdateException";
  }
}

class DeviceDeletionException extends DeviceException {
  constructor() {
    super("Error deleting Device");
    this.name = "DeviceDeletionException";
  }
}

class DeviceServiceException extends DeviceException {
  constructor() {
    super("Error in Device service");
    this.name = "DeviceServiceException";
  }
}

export {
  DeviceException,
  DeviceNotFoundException,
  DeviceCreationException,
  DeviceUpdateException,
  DeviceDeletionException,
  DeviceServiceException
};
