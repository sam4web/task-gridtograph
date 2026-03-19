import { RecordNotFoundError } from "@repo/database/error";
import { HTTP_STATUS } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../config";
import { ApiError, ApiResponse } from "../lib";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    logger.warn(`API Error: ${error.message}`, {
      path: req.path,
      status: error.statusCode,
    });
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message, {}));
  }

  if (error instanceof RecordNotFoundError) {
    logger.warn(`Database Error: ${error.message}`, {
      path: req.path,
      status: HTTP_STATUS.NOT_FOUND,
    });
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json(new ApiResponse(HTTP_STATUS.NOT_FOUND, error.message, {}));
  }

  logger.error(`Internal Server Error: ${error.message}`, {
    path: req.path,
    method: req.method,
    stack: error.stack,
  });

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(
      new ApiResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred. Please try again later.",
        {},
      ),
    );
};
