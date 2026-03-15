import fs from "node:fs";
import path from "node:path";
import winston from "winston";

import { env } from "./env";

const logDir = path.join(__dirname, "..", "..", "logs");

const properFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    const formattedLevel = level.toUpperCase().padEnd(8);
    return `${timestamp} ${formattedLevel}: ${message}${stack ? `\n${stack}` : ""}`;
  },
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "MM/DD HH:mm:ss" }),
  properFormat,
);

export const logger = winston.createLogger({
  level: env.NODE_ENV === "development" ? "debug" : "info",
  defaultMeta: { service: "gridtograph-api" },
  transports: [
    new winston.transports.Console({
      level: env.NODE_ENV === "production" ? "error" : "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MM/DD HH:mm:ss" }),
        properFormat,
      ),
    }),
    // file transport (combined log)
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
      format: fileFormat,
      maxsize: 3 * 1024 * 1024, // 3 MB
      maxFiles: 5,
    }),
    // file transport (error log)
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: fileFormat,
      maxsize: 3 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
      format: fileFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "logs/rejections.log",
      format: fileFormat,
    }),
  ],
  exitOnError: env.NODE_ENV === "production",
});

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
