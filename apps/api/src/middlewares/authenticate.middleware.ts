import type { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { ApiError, verifyToken } from "../lib";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  try {
    if (!token || !token.startsWith("Bearer ")) {
      throw ApiError.unauthorized(
        "Unauthorized: Access is denied due to invalid credentials.",
      );
    }
    const authToken = token.replace("Bearer ", "");
    const { id: decodedId } = verifyToken(authToken, env.ACCESS_TOKEN_SECRET);
    if (!decodedId) {
      throw ApiError.unauthorized(
        "Unauthorized: Access is denied due to invalid credentials.",
      );
    }
    req.userId = decodedId;

    next();
  } catch (error) {
    next(error);
  }
};
