import { HTTP_STATUS } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import ms from "ms";

import { env } from "../../config";
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
      res.status(HTTP_STATUS.OK).json(accessToken);
      return;
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
      res.status(HTTP_STATUS.OK).json(accessToken);
      return;
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
      res.status(HTTP_STATUS.NO_CONTENT);
      res.end();
      return;
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
