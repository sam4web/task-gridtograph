import { FILE_UPLOAD_CONSTANTS } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import fileUpload, { type UploadedFile } from "express-fileupload";
import { ApiError } from "../lib/api-error";

export const checkFileExists = (fieldname: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files[fieldname]) {
      return next(
        ApiError.badRequest(
          `Expected '${fieldname}' file in req payload, but none was received.`,
        ),
      );
    }
    if (Array.isArray(req.files[fieldname])) {
      return next(
        ApiError.badRequest(
          "Expected a single file, but multiple were received.",
        ),
      );
    }
    next();
  };
};

export const validateFileType = (
  fieldname: string,
  allowedMimes: readonly string[],
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const file = req.files?.[fieldname] as UploadedFile | undefined;
    if (!file || Array.isArray(file)) {
      return next();
    }
    if (!allowedMimes.includes(file.mimetype)) {
      const friendlyExtensions = allowedMimes.map(
        (mime) =>
          FILE_UPLOAD_CONSTANTS.MIME_TO_EXTENSION[mime] || mime.split("/")[1],
      );
      const uniqueExts = [...new Set(friendlyExtensions)];
      return next(
        ApiError.badRequest(
          `Only ${uniqueExts.join(", ")} formats are supported.`,
        ),
      );
    }
    next();
  };
};

export const validateFileSize = (
  fieldname: string,
  maxFileSizeBytes: number,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const file = req.files?.[fieldname] as UploadedFile | undefined;
    if (!file || Array.isArray(file)) return next();
    if (file.size > maxFileSizeBytes) {
      return next(
        ApiError.badRequest(
          `File size exceeds limit. Maximum allowed size is ${maxFileSizeBytes / 1024 / 1024}MB.`,
        ),
      );
    }
    next();
  };
};

export const datasetFileMiddleware = [
  fileUpload({ createParentPath: true }),
  checkFileExists("dataset"),
  validateFileType("dataset", FILE_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES),
  validateFileSize("dataset", FILE_UPLOAD_CONSTANTS.MAX_SIZE_BYTES),
];
