import { RequestHandler, Request } from "express";

// Étend l'objet Request pour inclure `user.deviceId`
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      role: string;
      deviceId: string;
    };
  }
}

export function authorizeAccess(): RequestHandler {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const { role, deviceId: userDeviceId } = user;
    const targetDeviceId = req.params.deviceId;

    if (role === "admin" || userDeviceId === targetDeviceId) {
      next();
      return;
    }

    res.status(403).json({ message: "Forbidden: insufficient rights" });
  };
}
