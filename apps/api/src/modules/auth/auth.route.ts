import { loginSchema, registerSchema } from "@repo/shared";
import { Router } from "express";

import { authenticate, authLimiter } from "../../middlewares";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { authController } from "./auth.controller";

const router: Router = Router();

router.use(authLimiter);
router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.login,
);
router.post(
  "/register",
  validateRequest(registerSchema, "body"),
  authController.register,
);
router.post("/refresh", authController.refresh);
router.get("/me", authenticate, authController.me);
router.post("/logout", authController.logout);

export default router;
