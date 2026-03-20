import { type Request, type Response, Router } from "express";
import type { UploadedFile } from "express-fileupload";
import { authenticate, datasetFileMiddleware } from "../../middlewares";

const router: Router = Router();

router.use(authenticate);

// router.get("/");
// router.post("/upload");
// router.get("/:fileId");
// router.post("/:fileId");
// router.patch("/:fileId");
// router.delete("/:fileId");
// router.put("/:fileId/rows/:rowId");
// router.delete("/:fileId/rows/:rowId");

export default router;
