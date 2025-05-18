class PeekyException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PeekyException";
  }
}

class PeekyNotFoundException extends PeekyException {
  constructor(deviceId: string) {
    super(`Peeky settings for device ID ${deviceId} not found`);
    this.name = "PeekyNotFoundException";
  }
}

class PeekyCreationException extends PeekyException {
  constructor() {
    super("Error creating Peeky settings");
    this.name = "PeekyCreationException";
  }
}

class PeekyUpdateException extends PeekyException {
  constructor() {
    super("Error updating Peeky settings");
    this.name = "PeekyUpdateException";
  }
}

class PeekyDeletionException extends PeekyException {
  constructor() {
    super("Error deleting Peeky settings");
    this.name = "PeekyDeletionException";
  }
}

class PeekyServiceException extends PeekyException {
  constructor() {
    super("Error in Peeky service");
    this.name = "PeekyServiceException";
  }
}

export {
  PeekyException,
  PeekyNotFoundException,
  PeekyCreationException,
  PeekyUpdateException,
  PeekyDeletionException,
  PeekyServiceException
};
