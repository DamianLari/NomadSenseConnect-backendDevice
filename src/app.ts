import "reflect-metadata";
import { env, setupSwagger } from "./config";
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routeLogger } from "./middlewares";
import router from "./routes"; // Routeur global (peut contenir /health, etc.)
import deviceRoutes from "./routes/device.routes";
import presetRoutes from "./routes/device_preset.routes";
import peekyRouter from "./routes/peeky.routes";

dotenv.config({ path: __dirname + "/.env" });

export const app: Application = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);
app.use(routeLogger);

app.use("/devices", deviceRoutes);
app.use("/devicepresets", presetRoutes);
app.use("/modules/peeky", peekyRouter);



// Router global monté sur ENDPOINT_PREFIX
app.use(env.ENDPOINT_PREFIX, router);
