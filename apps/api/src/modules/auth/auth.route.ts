import { loginSchema, registerSchema } from "@repo/shared";
import { Router } from "express";

import { authenticate, authLimiter } from "../../middlewares";
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
authRouter.post("/refresh", authController.refresh);
authRouter.get("/me", authenticate, authController.me);
authRouter.post("/logout", authController.logout);
