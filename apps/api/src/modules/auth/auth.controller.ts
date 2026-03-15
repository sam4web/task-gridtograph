import type { NextFunction, Request, Response } from "express";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.status(200);
  }
}

export const authController = new AuthController();
