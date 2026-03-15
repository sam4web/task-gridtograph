import type { NextFunction, Request, Response } from "express";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      res.status(200).json({ success: true, message: "yes" });
      return;
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
