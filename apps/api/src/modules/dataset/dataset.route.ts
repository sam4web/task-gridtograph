import { Router } from "express";
import { authenticate, datasetFileMiddleware } from "../../middlewares";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { datasetController } from "./dataset.controller";
import {
  addRowsSchema,
  fileIdParamsSchema,
  rowParamsSchema,
  updateMetadataSchema,
  updateRowSchema,
} from "./dataset.schema";

const router: Router = Router();

router.use(authenticate);

router.get("/", datasetController.getAll);
router.post("/upload", datasetFileMiddleware, datasetController.upload);
router.get(
  "/:fileId",
  validateRequest(fileIdParamsSchema, "params"),
  datasetController.getById,
);
router.post(
  "/:fileId",
  validateRequest(fileIdParamsSchema, "params"),
  validateRequest(addRowsSchema, "body"),
  datasetController.addRows,
);
router.patch(
  "/:fileId",
  validateRequest(fileIdParamsSchema, "params"),
  validateRequest(updateMetadataSchema, "body"),
  datasetController.updateMetadata,
);
router.delete(
  "/:fileId",
  validateRequest(fileIdParamsSchema, "params"),
  datasetController.deleteById,
);
router.put(
  "/:fileId/rows/:rowId",
  validateRequest(rowParamsSchema, "params"),
  validateRequest(updateRowSchema, "body"),
  datasetController.updateRow,
);
router.delete(
  "/:fileId/rows/:rowId",
  validateRequest(rowParamsSchema, "params"),
  datasetController.deleteRow,
);

export default router;
