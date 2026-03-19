import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType, type infer as zInfer } from "zod";
import { ApiError } from "../lib";

const sourceMap = {
  body: "validatedBody",
  query: "validatedQuery",
  params: "validatedParams",
} as const;

export const validateRequest = <T extends ZodType>(
  schema: T,
  source: keyof typeof sourceMap = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[source];
      if (!dataToValidate) {
        next(
          ApiError.badRequest(`The req ${source} is either empty or not sent.`),
        );
        return;
      }
      const parsedData = schema.parse(dataToValidate);
      const targetKey = sourceMap[source];
      (req as Request & { [K in typeof targetKey]: zInfer<T> })[targetKey] =
        parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues.map((err) => err.message).join(", ");
        next(ApiError.badRequest(errorMessage));
      } else {
        next(ApiError.internal("An unexpected validation error occurred."));
      }
    }
  };
};
