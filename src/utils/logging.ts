import { green, red, yellow } from "colorette";

import { Environment } from "../config/environment";

const formatEnvLog = (env: Environment): Environment => {
  return Object.fromEntries(
    Object.entries(env).map(([key, value]) =>
      key.toLowerCase().includes("password") ? [key, "******"] : [key, value]
    )
  ) as Environment;
};

const logger = {
  info: (message: string, ...optionalParam: any[]) => {
    console.log(message, ...optionalParam);
  },
  error: (message: string, ...optionalParam: any[]) => {
    console.error(message, ...optionalParam);
  },
  warn: (message: string, ...optionalParam: any[]) => {
    console.warn(message, ...optionalParam);
  },
  debug: (message: string, ...optionalParam: any[]) => {
    console.debug(message, ...optionalParam);
  },
  logRoute: (
    start: number,
    statusCode: number,
    method: string,
    originalUrl: string
  ) => {
    const duration = Date.now() - start; // Calculate duration
    const logFormat = `[${new Date().toISOString()}] [${method}] ${originalUrl} [${statusCode}] (${duration}ms)`;

    // Select color based on status code
    // 2xx -> Vert
    // 3xx -> Jaune
    // 4xx/5xx -> Rouge
    let coloredLog;
    if (statusCode >= 200 && statusCode < 300) {
      coloredLog = green(logFormat);
    } else if (statusCode >= 300 && statusCode < 400) {
      coloredLog = yellow(logFormat);
    } else {
      coloredLog = red(logFormat);
    }

    console.log(coloredLog);
  },
};

export { formatEnvLog, logger };
