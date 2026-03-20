import { type Request, type Response, Router } from "express";
import type { UploadedFile } from "express-fileupload";
import { authenticate, datasetFileMiddleware } from "../../middlewares";

const router: Router = Router();

router.use(authenticate);

router.post("/upload", datasetFileMiddleware, (req: Request, res: Response) => {
  const file = req.files!.dataset as UploadedFile;
  return res.status(200).json({
    success: true,
    message: "File uploaded and validated successfully",
    data: {
      fileName: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      mimetype: file.mimetype,
      encoding: file.encoding,
      tempFilePath: file.tempFilePath,
    },
  });
});

// router.get("/");
// router.post("/upload");
// router.get("/:fileId");
// router.post("/:fileId");
// router.patch("/:fileId");
// router.delete("/:fileId");
// router.put("/:fileId/rows/:rowId");
// router.delete("/:fileId/rows/:rowId");

export default router;
