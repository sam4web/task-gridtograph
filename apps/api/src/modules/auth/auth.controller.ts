import {
  HTTP_STATUS,
  type LoginUserDTO,
  type RegisterUserDTO,
} from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import ms from "ms";

import { env } from "../../config";
import { ApiError, ApiResponse } from "../../lib";
import { authService } from "./auth.service";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const credentials = req.validatedBody as LoginUserDTO;
    try {
      const { accessToken, refreshToken } =
        await authService.login(credentials);
      res.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: env.NODE_ENV === "development" ? "strict" : "none",
        secure: env.NODE_ENV === "production",
      });
      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(HTTP_STATUS.OK, "User logged in successfully.", {
          token: accessToken,
        }),
      );
    } catch (err) {
      next(err);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const credentials = req.validatedBody as RegisterUserDTO;
    try {
      const { accessToken, refreshToken } =
        await authService.register(credentials);
      res.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: env.NODE_ENV === "development" ? "strict" : "none",
        secure: env.NODE_ENV === "production",
      });
      return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(HTTP_STATUS.CREATED, "User registerd successfully.", {
          token: accessToken,
        }),
      );
    } catch (err) {
      next(err);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? "strict" : "none",
        secure: env.NODE_ENV === "production",
      });
      return res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.cookies?.token;
      if (!token) {
        throw ApiError.unauthorized(
          "Authentication failed: Refresh token not provided.",
        );
      }
      const { accessToken, refreshToken } = await authService.refresh(token);
      res.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: env.NODE_ENV === "development" ? "strict" : "none",
        secure: env.NODE_ENV === "production",
      });
      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(HTTP_STATUS.OK, "Session refreshed successfully", {
          token: accessToken,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        throw ApiError.unauthorized(
          "Authentication required. Please log in to continue.",
        );
      }
      const user = await authService.me(req.userId);
      return res
        .status(200)
        .json(
          new ApiResponse(200, "User profile retrieved successfully", user),
        );
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
