import { HTTP_STATUS } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import ms from "ms";

import { env } from "../../config";
import { ApiResponse } from "../../lib";
import { authService } from "./auth.service";
import type { LoginUserReq, RegisterUserReq } from "./auth.types";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const credentials = (req as LoginUserReq).validatedBody;
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
    const credentials = (req as RegisterUserReq).validatedBody;
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
}

export const authController = new AuthController();
