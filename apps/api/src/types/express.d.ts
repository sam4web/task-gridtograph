import * as express from "express";
import type { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      validatedBody?: unknown;
      validatedQuery?: unknown;
      validatedParams?: unknown;
      files?: {
        [key: string]: UploadedFile | UploadedFile[];
      };
    }
  }
}
