import { Router } from "express";

import { authLimiter } from "../../middlewares";
import { authController } from "./auth.controller";

export const authRouter: Router = Router();

authRouter.use(authLimiter);
authRouter.post("/login", authController.login);
