import { loginSchema, registerSchema } from "@repo/shared";
import { Router } from "express";

import { authLimiter } from "../../middlewares";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { authController } from "./auth.controller";

export const authRouter: Router = Router();

authRouter.use(authLimiter);
authRouter.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.login,
);
authRouter.post(
  "/register",
  validateRequest(registerSchema, "body"),
  authController.register,
);
authRouter.post("/logout", authController.logout);
